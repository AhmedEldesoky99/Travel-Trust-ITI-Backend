const axios = require("axios");

exports.RecommendToursForUser = async (tourData) => {
  try {
    const { data } = await axios({
      method: "POST",
      "Content-type": "application/json",
      accept: "application/json",
      url: "http://recommendersystem.somee.com/api/v2.0/Recommend/PredictMulti",
      data: tourData,
    });

    return data;
  } catch (err) {
    console.log("RecommendToursForUser", err);
  }
};
