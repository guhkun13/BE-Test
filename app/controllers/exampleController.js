const db = require("../models");
const sequelize = require("sequelize");

const MINIMUM_VALUES = 5;

exports.refactoreMe1 = async (req, res) => {
  // function ini sebenarnya adalah hasil survey dri beberapa pertanyaan,
  // yang mana nilai dri jawaban tsb akan di store pada array seperti yang ada di dataset
  let index1 = [];
  let index2 = [];
  let index3 = [];
  let index4 = [];
  let index5 = [];

  let statusCode = 400;
  let totalIndex = [];
  let isSuccess = false;

  try {
    const rows = await db.sequelize.query(`select * from "surveys"`, {
      type: sequelize.QueryTypes.SELECT,
    });

    rows.map((row) => {
      let [values1, values2, values3, values4, values5] = row.values;

      index1.push(values1);
      index2.push(values2);
      index3.push(values3);
      index4.push(values4);
      index5.push(values5);
    });

    let totalIndex1 = getTotalIndex(index1);
    let totalIndex2 = getTotalIndex(index2);
    let totalIndex3 = getTotalIndex(index3);
    let totalIndex4 = getTotalIndex(index4);
    let totalIndex5 = getTotalIndex(index5);

    totalIndex = [
      totalIndex1,
      totalIndex2,
      totalIndex3,
      totalIndex4,
      totalIndex5,
    ];

    statusCode = 200;
    isSuccess = true;
  } catch (error) {
    totalIndex = error.message;
  }

  res.status(statusCode).send({
    statusCode: statusCode,
    success: isSuccess,
    data: totalIndex,
  });
};

function getSum(total, num) {
  return total + num;
}

function getTotalIndex(input) {
  return input.reduce(getSum, 0) / 10;
}

function responseError(res, statusCode, errorMessage) {
  let payload = {
    statusCode: statusCode,
    message: errorMessage,
    success: false,
  };
  res.status(statusCode).send(payload);
}

function isStringNumber(str) {
  return Number.isInteger(Number(str));
}

function validateBodyRequest(bodyRequest) {
  let isValid = true;

  // validate userId
  let userId = bodyRequest.userId;
  if (!isStringNumber(userId)) {
    isValid = false;
    return [isValid, []];
  }

  // validate values, must be
  // 1. typeof number
  // 2. consist of 5 items
  let strValues = bodyRequest.values.slice(1, -1);
  let strArray = strValues.split(",");
  let intArray = [];

  if (strArray.length != MINIMUM_VALUES) {
    isValid = false;
    return [isValid, []];
  }

  strArray.forEach((val) => {
    if (isStringNumber(val)) {
      intArray.push(parseInt(val));
    } else {
      isValid = false;
    }
  });

  return [isValid, intArray];
}

exports.refactoreMe2 = (req, res) => {
  // function ini untuk menjalakan query sql insert
  // dan mengupdate field "dosurvey" yang ada di table user menjadi true,
  // jika melihat data yang di berikan,
  // salah satu usernya memiliki dosurvey dengan data false

  if (req.body.userId == undefined || req.body.userId == "") {
    return responseError(
      res,
      400,
      "Bad Request. Please check your submitted data"
    );
  }

  // validate body.values
  const [isValid, values] = validateBodyRequest(req.body);
  if (!isValid) {
    return responseError(
      res,
      400,
      "Bad Request. Please check your submitted data"
    );
  }

  db.models.surveys
    .create({
      userId: req.body.userId,
      values: values,
    })
    .then((data) => {
      db.models.users
        .update(
          {
            dosurvey: true,
          },
          {
            where: { id: req.body.userId },
          }
        )
        .then(() => {
          console.log("success");
        })
        .catch((err) => console.log(err));

      res.status(201).send({
        statusCode: 201,
        message: "Survey sent successfully!",
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        statusCode: 500,
        message: "Cannot post survey.",
        success: false,
        error: err.message,
      });
    });
};

exports.callmeWebSocket = (req, res) => {
  // do something
};

exports.getData = (req, res) => {
  // do something
};
