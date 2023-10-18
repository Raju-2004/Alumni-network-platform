import React,{useState,useEffect,useContext} from 'react'
import NewsCard from './NewsCard';
import { useMyContext } from "../../MyContext";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function News() {
  const userEmail = localStorage.getItem("UserEmail");
  console.log(userEmail);
  const { userType, setUserType } = useMyContext();

  console.log(userType);
  const [NewsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/dashboard/News")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        console.error("Error fetching News data:", error);
      });
  }, []);



  return (
    <div className={'News'}>
      <div className="news">
        {NewsData.map((News) => (
          <NewsCard key={News._id} NewsData={News} />
        ))}
      </div>
      {userType === "alumni" && (
        <div className={'add'}>
          <Link to="/dashboard/create/News">
            <FaPlusCircle />
          </Link>
        </div>
      )}
    </div>
  );
}

export default News