const cron = require("node-cron");
const axios = require("axios");
const { HistoryModal: History } = require("../../models");

exports.trainModel = cron.schedule("0 8 * * *", async () => {
  try {
    await TrainModel();
  } catch (err) {
    console.log("schedule err", err);
  }
});

const TestMLPing = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      accept: "application/json",
      url: "http://recommendersystem.somee.com/api/v2.0/Ping",
    });

    return data;
  } catch (err) {
    console.log("TestMLPing", err);
  }
};

const PrepareUsersHistoryToML = (history) => {
  let result = [];
  history.map((item) => {
    result.push(
      ...item.tours.map((tour) => ({
        userId: parseInt(item.user),
        itemId: parseInt(tour),
        label: 1,
      }))
    );
  });
  console.log(result, "training data");
  return result;
};

const TrainModel = async () => {
  try {
    const pingResult = await TestMLPing();
    console.log(pingResult.message);
    if (pingResult.code === 200) {
      const history = await History.find();
      const { data } = await axios({
        method: "POST",
        "Content-type": "application/json",
        accept: "application/json",
        url: "http://recommendersystem.somee.com/api/v2.0/MLModel/Train",
        data: {
          usersHistory: PrepareUsersHistoryToML(history),
        },
      });

      if (data.code === 200) {
        console.log(data.message);
      }
      return data;
    }
  } catch (err) {
    console.log("TrainModel", err);
  }
};
