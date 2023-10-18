const express  = require('express')
const router = express.Router();
const News = require('./models/NewsSchema')
const Message = require('./models/MessageSchema');
const Event = require("./models/EventSchema");
const Conversation  =require('./models/Conversation')
const Job = require("./models/JobSchema");
const Alumni = require("./models/AlumniSchema");
const Conversation  =require('./models/Conversation')

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

router.get("/events", (req, res) => {
    Event.find()
      .populate("creator")
      .then((data) => {
        // console.log(data);
        if (data.length > 0) {
          res.status(200).json(data); // Send a 200 OK response with JSON data
        } else {
          res.status(404).json({ error: "No data found" }); // Send a 404 JSON response if no data is found
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send a 500 JSON response for database errors
      });
  });

  router.post("/create/event",upload.single('file'), async (req, res) => {
    try {
      // Get event data from the request body
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const { title,
      description,
      date,
      time,
      isOnline, // Default to an online event
      location,
      creator}= req.body;
      
      const newEvent = new Event({title: title,
      description: description,
      Image:req.file.path,
      date: date,
      time:time,
      isOnline: isOnline,
      location: location,
      creator:creator});
      await newEvent.save();
      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/create/job", upload.single("file"), async (req, res) => {
    try {
      console.log(req.body);
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      // Get event data from the request body
      const {
        title,
        company,
        location,
        description,
        qualifications,
        applicationDeadline,
        postedBy
      } = req.body;
     
      // console.log(eventData);
      const newJob = new Job({
        title:title,
        company:company,
        companyImage: req.file.path,
        location: location,
        description: description,
        qualifications: qualifications,
        applicationDeadline:applicationDeadline,
        postedBy:  postedBy,
      });
      await newJob.save();
  
      res.status(201).json({ message: "Job created successfully" });
    } catch (error) {
      console.error("Error creating Job:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/jobs", (req, res) => {
    Job.find()
      .populate("postedBy")
      .then((data) => {
        // console.log(data);
        if (data.length > 0) {
          res.status(200).json(data); // Send a 200 OK response with JSON data
        } else {
          res.status(404).json({ error: "No data found" }); // Send a 404 JSON response if no data is found
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send a 500 JSON response for database errors
      });
  });


  router.post("/chat/messages", async (req, res) => {
    const newMessage = new Message(req.body);
    // console.log(newMessage);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
      console.log(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get
  
  router.get("/chat/messages/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
      // console.log(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  
  router.get("/News", (req, res) => {
    News.find()
      .populate("creator")
      .then((data) => {
        // console.log(data);
        if (data.length > 0) {
          res.status(200).json(data); // Send a 200 OK response with JSON data
        } else {
          res.status(404).json({ error: "No News found" }); // Send a 404 JSON response if no data is found
        }
      })
      .catch((error) => {
        console.error("Error retrieving News:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send a 500 JSON response for database errors
      });
  });
  
  router.post("/create/News",upload.single('file'), async (req, res) => {
    try {
      // Get event data from the request body
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const { title,
      description,
      creator}= req.body;
      
      const newNews = new News({title: title,
      description: description,
      Image:req.file.path,
      creator:creator});
      await newNews.save();
      res.status(201).json({ message: "News created successfully" });
    } catch (error) {
      console.error("Error creating News:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  module.exports = router;