import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ NewsData }) => {
  console.log(NewsData);
  const [imagePath, setImagePath] = useState("");
  const image = NewsData.Image;
  useEffect(() => {
    if (image) {
      const correctedImagePath = image.replace(/\\/g, "/");
      setImagePath("http://localhost:4000/" + correctedImagePath);
      console.log(imagePath);
    }
  }, [imagePath, image]);
  return (
    <div className="news-card">
      <img src={imagePath}  style={{ height: 250, width: 350 }} alt="news" className="news-card-image" />
      <div className="news-card-content">
        <h3 className="news-card-title">{NewsData.title}</h3>
        <p className="news-creator">
          {NewsData.creator && NewsData.creator.Email}
        </p>
      </div>
      <div className="news-card-actions">
        <Link to={"/dashboard/news/" + NewsData._id} className="news-card-button">
          Read more
        </Link>
      </div>
      {/* <p className="news-description">{NewsData.description}</p> */}

      {/* Add more fields to display additional news information */}
    </div>
  );
};

export default NewsCard;
