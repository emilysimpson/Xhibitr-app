const axios = require("axios");
import database from "../db";

const query = {
  resources: "artworks",
  fields: [
    "id",
    "title",
    "artist_title",
    "date_display",
    "image_id",
    "description",
    "department_id",
    "is_on_view",
    "gallery_title",
    "latitude",
    "longitude"
  ],
  limit: 45,
  query: {
    function_score: {
      query: {
        bool: {
          filter: [
            {
              term: {
                department_id: "PC-8"
              }
            },
            {
              term: {
                is_on_view: true
              }
            },
            {
              exists: {
                field: "description"
              }
            },
            {
              exists: {
                field: "gallery_title"
              }
            }
          ]
        }
      }
    }
  }
};

const getJson = async () => {
  try {
    const res = await axios.post(
      "https://aggregator-data.artic.edu/api/v1/search",
      query
    );
    // Using data from one post request for example.
    // await database
    //   .collection("artwork")
    //   .doc("fromAPI")
    //   .set(res.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getJson;
