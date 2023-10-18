const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const Alumni = require("../models/AlumniSchema");
const Student = require("../models/StudentSchema");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

router.post("/alumni/signup", upload.single("file"), async (req, res) => {
  console.log(req.body);
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const existingUser = await Alumni.findOne({ Email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address is already in use. Try to login" });
    }
    /* console.log(req.body); */
    const {
      name,
      email,
      password,
      graduationYear,
      currentJobRole,
      expertise,
      linkedinProfile,
      achievements,
    } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const NewAlumni = new Alumni({
      Name: name,
      Email: email,
      password: hashedPassword,
      file: req.file.path,
      expertise: expertise,
      Graduation_year: graduationYear,
      current_role: currentJobRole,
      LinkedIn: linkedinProfile,
      Achievements: achievements,
    });
    const savedAlumni = await NewAlumni.save();
    console.log("Alumni saved:", savedAlumni);

    res.status(201).json(savedAlumni);
  } catch (error) {
    console.error("Error saving Alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/alumni/login", async (req, res) => {
  try {
    console.log(req.body);
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ error: "Email and password are required for login." });
    }

    const user = await Alumni.findOne({ Email: Email });
    /* req.session.user = user; */

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // At this point, the login is successful.
    // You can generate a JWT token here for authentication if needed.
    /* req.session.user = user; */

    console.log("user logged");
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/student/signup", async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await Student.findOne({ Email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address is already in use. Try to login" });
    }
    /* console.log(req.body); */
    const {
      name,
      email,
      password,
      currentYear,
    } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const NewStudent = new Student({
      Name: name,
      Email: email,
      password: hashedPassword,
      currentYear: currentYear,
    });
    const savedStudent = await NewStudent.save();
    console.log("Student saved:", savedStudent);

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error saving Student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/student/login", async (req, res) => {
  try {
    console.log(req.body);
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ error: "Email and password are required for login." });
    }

    const user = await Student.findOne({ Email: Email });
    /* req.session.user = user; */
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // At this point, the login is successful.
    // You can generate a JWT token here for authentication if needed.
    /* req.session.user = user; */

    console.log("student logged");
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
