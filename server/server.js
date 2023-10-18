const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoDbUrL, PORT } = require("./config/configuration");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Alumni = require("./models/AlumniSchema");
const SingupLoginroutes = require("./routes/SingupLoginroutes");
const Alumniroutes = require("./routes/Alumniroutes");
const Job = require("./models/JobSchema");
// const Chat = require('./models/ChatSchema')
const News = require('./models/NewsSchema')
const Message = require('./models/MessageSchema');
const Event = require("./models/EventSchema");
const Conversation  =require('./models/Conversation')

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

mongoose.connect(mongoDbUrL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

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

app.use("/", Alumniroutes);

app.use("/", SingupLoginroutes);

app.get("/dashboard/events", (req, res) => {
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

app.post("/dashboard/create/event",upload.single('file'), async (req, res) => {
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

app.post("/dashboard/create/job", upload.single("file"), async (req, res) => {
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

app.get("/dashboard/jobs", (req, res) => {
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

// app.post("/dashboard/chat/:email",async(req,res)=>{
//   try {
//     const { fromMail, toMail, message } = req.body;
//     const newChatMessage = new Chat({ fromMail, toMail, message });
//     await newChatMessage.save();
//     res.status(201).json(newChatMessage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// })

app.post('/conversation/createOrGetConversation', async (req, res) => {
  try {
    const { members } = req.body;
    // Find a conversation that includes the provided members
    const conversation = await Conversation.findOne({
      members: { $all: members }
    });
    if (conversation) {
      // Conversation already exists
      res.json({ conversation });
    } else {
      // Create a new conversation
      const newConversation = new Conversation({ members });
      await newConversation.save();
      res.json({ conversation: newConversation });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get("/conversation/:email", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.email] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get('/get-user-details', async (req, res) => {
  const { friendEmail } = req.query;

  try {
    const alumniUser = await Alumni.findOne({ Email: friendEmail });
    if (alumniUser) {
      return res.json(alumniUser);
    }

    const studentUser = await Student.findOne({ Email: friendEmail });
    if (studentUser) {
      return res.json(studentUser);
    }

    // Handle the case when the email doesn't match any user.
    res.json(null);
  } catch (err) {
    // Handle errors here.
  }
});


app.post("/dashboard/chat/messages", async (req, res) => {
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

app.get("/dashboard/chat/messages/:conversationId", async (req, res) => {
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



app.get("/dashboard/News", (req, res) => {
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

app.post("/dashboard/create/News",upload.single('file'), async (req, res) => {
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



app.get("/", (req, res) => {
  res.send("hii");
});

app.listen(PORT, () => {
  console.log("app is listening at " + `http://localhost:${PORT}`);
});
