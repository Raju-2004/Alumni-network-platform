import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { MyContext } from "./MyContext";
import { toast } from "react-toastify";

function SingleNews() {
  const [News, setNews] = useState([]);
  //   const { News, setNews } = useContext(MyContext);
  const userEmail = localStorage.getItem("UserEmail");
  const [users, setUsers] = useState([]);
  const [commenter, setCommenter] = useState({}); // State for commenter name
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [NewsId, setNewsId] = useState(null);
  const params = useParams();
  const [imagePath, setImagePath] = useState(
    "https://www.patterns.dev/img/reactjs/react-logo@3x.svg"
  );

  const navigate = useNavigate();
  const isUserLoggedIn = !!userEmail;
  useEffect(() => {
    fetch("http://localhost:4000/dashboard/News")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  }, [setNews]);

  console.log(News);
  
  useEffect(() => {
    if (Array.isArray(News)) {
      const filteredNews = News.find((p) => p._id === params.id);
      if (filteredNews) {
        setNews(filteredNews);
        setNewsId(filteredNews._id);
      }
    }
  }, [params, News]);
  
//   const image = News.Image
  useEffect(() => {
    if (News.Image) {
      const correctedImagePath = News.Image.replace(/\\/g, "/");
      setImagePath("http://localhost:4000/" + correctedImagePath);
    }
  }, [News.Image]);

  // Format the date
  const formattedDate =
    News && News.CreationDate
      ? new Date(News.CreationDate).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      : "Loading...";
  const onHandleClick = () => {
    if (!isUserLoggedIn) {
      toast.info(" You must be sign up or log in!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  };

  return (
    <div className="single-News">
      {News && News.title ? (
        <div className="News">
          <div className="News-title">
            <h1>{News.title}</h1>
          </div>
          <div className="News-details">
            <p className="News-info">
              by{" "}
              <Link to="#">
                {News.creator
                  ? News.creator.Name
                  : "kusaRaju"}
              </Link>
            </p>
            <p className="News-date">Posted on {formattedDate}</p>
            <div className="single-News-image">
              <img
                src={imagePath}
                alt={News.title}
                className="News-image"
                style={{ height: 250 }}
              />
            </div>
            <p className="News-description">{News.description}</p>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default SingleNews;
