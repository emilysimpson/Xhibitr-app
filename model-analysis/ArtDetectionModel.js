import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import jpeg from "jpeg-js";
import { base64DecToArr } from "../utils/Base64";
import { resizeImage } from "../utils/ImageResize";

let model = null;
let modelPromise = null;

const targetWidth = 100;
const targetHeight = 100;

export const triggerLoadModel = () => {
  if (!modelPromise) modelPromise = loadModel();
};

export const loadModel = async () => {
  if (!model) {
    console.log("starting tf");
    await tf.ready();
    console.log("tf ready");
    model = await tf.loadLayersModel(
      "https://teachablemachine.withgoogle.com/models/48ebYml4/model.json"
    );
    console.log("model loaded");
  }
};

const imageToTensor = rawImageData => {
  const TO_UINT8ARRAY = true;
  const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  // Drop the alpha channel info for mobilenet
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0; // offset into original data
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];

    offset += 4;
  }

  // error expects shape of 4 dimensions?
  // adding .expandDims(1) gives an error 'expected input_1
  // to have shape [null,224,224,3] but got array with shape
  // [2376,1,3898,3].'
  return tf.tensor3d(buffer, [height, width, 3]);
};

export const analyze = async image => {
  try {
    await loadModel();

    const response = await fetch(image.uri, {}, { isBinary: true });

    const rawImageData = await response.arrayBuffer();

    //prev decodeJpeg used here, but error decodeJpeg not a function?
    const imageTensor = imageToTensor(rawImageData);

    const prediction = await model.predict(imageTensor);

    return prediction;

    // let rawImageData = base64DecToArr(imageBase64);

    // const TO_UINT8ARRAY = true;
    // let { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);

    // rawImageData = null;

    // const actualHeight =
    //   targetHeight > 0
    //     ? targetHeight
    //     : Math.round((targetWidth * height) / width);

    // let targetBuffer = new Uint8Array(targetWidth * actualHeight * 3);

    // resizeImage(
    //   data,
    //   width,
    //   height,
    //   targetBuffer,
    //   targetWidth,
    //   actualHeight,
    //   4
    // );

    // data = null;

    // const tensor = tf.tensor3d(targetBuffer, [targetWidth, actualHeight, 3]);

    // targetBuffer = null;

    // const predictions = await model.predict(tensor);
    // console.log("PREDICTIONS : \n", predictions);
    // return predictions;
  } catch (error) {
    console.warn(error);
    return [];
  }
};
