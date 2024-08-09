var express = require("express");
var router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
const userController = require("../mongo/user.controller");
//http://localhost:3000/users
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "_" + uniqueSuffix + "_" + file.originalname);
//   },
// });
// const upload = multer({ storage }).single("image");

router.get("/", async (req, res) => {
  try {
    const users = await userController.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.log("eror:", error);
    res.status(404).json({ error: "Error Proccessing Product" });
  }
});
router.post("/register", async (req, res, next) => {
  try {
    let body = req.body;
    const result = await userController.addUser(body);
    if (result) {
      res.status(200).json({
        newUser: result,
        messages: `Account Created Succesfully`,
        status: "OK",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("Lỗi: " + error.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    let body = req.body;
    const result = await userController.userLogIn(body);
    if (result) {
      res
        .status(200)
        .json({ result, messages: `You have logged in`, status: "OK" });
    } else {
      res.json({ message: " Your e-mail are password isn't correct " });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("Lỗi: " + error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error:", error.message);
  }
});

// Update user by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const user = await userController.updateUser(req.params.id, req.body);
    res.status(200).json({
      updatedUser: user,
      message: "User updated successfully",
      status: "OK",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error:", error.message);
  }
});

// Delete user by ID
router.delete("/remove/:id", async (req, res) => {
  try {
    const user = await userController.deleteUser(req.params.id);
    res.status(200).json({
      deletedUser: user,
      message: "User deleted successfully",
      status: "OK",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error:", error.message);
  }
});
module.exports = router;
