const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.listen(4569, async () => {
  console.log("port number 4569");
});

app.post("/signup", upload.array("profilepic"), async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  try {
    const filePath = req.files.map((file) => file.path);
    let kumar = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      profile: filePath.join(" ,"),
    });
    console.log("successfully inserting data into DB");
    res.json({ status: "success", msg: "user created" });
    await Customer.insertMany([kumar]);
  } catch (error) {
    console.log("error in inserting data in db");
    res.json({ status: "fail", msg: "unable create user" });
  }
});
app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  let customerArr = await Customer.find().and({ email: req.body.email });
  if (customerArr.length > 0) {
    /**after navigate */
    /**install react react-redux */
    if (customerArr[0].password === req.body.password) {
      /**jwt step2 */
      let token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "urrr"
      );
      let dataToSend = {
        firstName: customerArr[0].firstName,
        lastName: customerArr[0].lastName,
        age: customerArr[0].age,
        email: customerArr[0].email,
        // password:customerArr[0].password,
        mobile: customerArr[0].mobile,
        profile: customerArr[0].profile,
        token: token,
      };
      res.json({
        status: "success",
        msg: "credentials are correct",
        data: dataToSend,
      });
    } else {
      res.json({ status: "fail", msg: "credentials are not correct" });
    }
  } else {
    res.json({ status: "fail", msg: "user does not exist" });
  }
});
app.post("/validatetoken", upload.none(), async (req, res) => {
  console.log(req.body);
  let decryptedCredentials = jwt.verify(req.body.token, "urrr");
  console.log(decryptedCredentials);
  let customerArr = await Customer.find().and({
    email: decryptedCredentials.email,
  });
  if (customerArr.length > 0) {
    /**after navigate */
    /**install react react-redux */
    if (customerArr[0].password === decryptedCredentials.password) {
      /**jwt step2 */

      let dataToSend = {
        firstName: customerArr[0].firstName,
        lastName: customerArr[0].lastName,
        age: customerArr[0].age,
        email: customerArr[0].email,
        // password:customerArr[0].password,
        mobile: customerArr[0].mobile,
        profile: customerArr[0].profile,
        token: token,
      };
      res.json({
        status: "success",
        msg: "credentials are correct",
        data: dataToSend,
      });
    } else {
      res.json({ status: "fail", msg: "credentials are not correct" });
    }
  } else {
    res.json({ status: "fail", msg: "user does not exist" });
  }
});
app.patch("/updateprofile", upload.single("profilepic"), async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.firstName.trim().length > 0) {
      await Customer.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }
    if (req.body.lastName.trim().length > 0) {
      await Customer.updateMany(
        { email: req.body.email },
        { lastName: req.body.lastName }
      );
    }
    if (req.body.age > 0) {
      await Customer.updateMany(
        { email: req.body.email },
        { age: req.body.age }
      );
    }
    if (req.body.password.length > 0) {
      await Customer.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }
    if (req.body.mobile.trim().length > 0) {
      await Customer.updateMany(
        { email: req.body.email },
        { mobile: req.body.mobile }
      );
    }
    if (req.file) {
      await Customer.updateMany(
        { email: req.body.email },
        { profile: req.file.path }
      );
    }
    res.json({ status: "success", msg: "updated profile" });
  } catch (err) {
    res.json({ status: "failure", msg: "unable to update profile" });
  }
});
app.delete("/deleteprofile", upload.none(), async (req, res) => {
  console.log(req.body.email);
  try {
    let deleteObj = await Customer.deleteMany({ email: req.body.email });

    if (deleteObj.deletedCount > 0) {
      res.json({ status: "success", msg: "account deleted succefully " });
    } else {
      res.json({ status: "success", msg: "delete " });
    }
  } catch (err) {
    res.json({ status: "fail", msg: "error in account delete " });
  }
});
let customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobile: String,
  profile: String,
});

let Customer = new mongoose.model(
  "customer",
  customerSchema,
  "CustomerDetails"
);

// let insertData = async () => {};

let connectToMDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://ukumar:ukumar@merndata.ajemg.mongodb.net/kumar?retryWrites=true&w=majority&appName=MernData"
    );
    //     insertData();
    console.log("successfully connected to MDB");
  } catch (error) {
    console.log("error in connecting MDB");
  }
};
connectToMDB();
