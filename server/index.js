const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { convertMT940toObject } = require("./utils/parser.utils");

const app = express();
const port = 1337;

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/validate", upload.single("recordFile"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  const multerText = Buffer.from(file.buffer).toString("utf-8");
  const jsonReponse = convertMT940toObject(file.originalname, multerText);
  const result = {
    fileText: jsonReponse,
  };

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
