const express = require("express");
const app = express();
const router = express.Router();
const Alumni = require('../models/AlumniSchema');

router.get('/alumni',(req,res)=>{
    Alumni.find()
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
})


module.exports = router;