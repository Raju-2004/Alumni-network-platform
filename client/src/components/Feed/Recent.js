import React,{useState,useEffect} from 'react'
import EventCard from './Events/EventCard';
import {MdStarRate} from 'react-icons/md';
import Events from '../../Assets/Events.jpeg'
import alumni from '../../Assets/Alumni.jpg'
import job from '../../Assets/Jobs.jpg'
import news from '../../Assets/News.jpeg'
import { Link } from 'react-router-dom';

function Recent() {

  // const [lastTwoEvents, setLastTwoEvents] = useState([]);
  // const [lastTwoJobs, setLastTwoJobs] = useState([]);
  // const [lastTwoAlumni, setLastTwoAlumni] = useState([]);
  // const [lastTwoNews, setLastTwoNews] = useState([]);

  // useEffect(() => {
  //   // Fetch data from your backend API
  //   fetch('http://localhost:4000/dashboard') // Replace with the actual API endpoint
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLastTwoEvents(data.lastTwoEvents);
  //       setLastTwoJobs(data.lastTwoJobs);
  //       setLastTwoAlumni(data.lastTwoAlumni);
  //       setLastTwoNews(data.lastTwoNews);
  //     }).catch((error) => {
  //       console.error("Error fetching event data:", error);
  //     });;
  // }, []);
  return (
    <div className='Recent'>
      <div className="card">
        <div className="details">
          <h2>Events</h2>
          <ul>
            <li>All of our events are completely free and open for everyone. Fun-filled events with no compromise on quality.</li>
            <li>Events conducted will help develop various skills of students in co-curricular activities and to expose them to the current trends in the technical and professional fields.</li>
            <li>Explore the plethora of events & have the opportunity to connect with alumni</li>
          </ul>
          <Link className="Links" to="/dashboard/events">
             explore Events
            </Link>
        </div>
        <div className="image">
          <img src={Events} alt="" />
        </div>
      </div>
      <div className="card">
        <div className="details">
          <h2>Alumni</h2>
          <ul>
            <li>Connect with alumni to stay informed about the latest trends and developments in your field.Our alumni are always at the forefront of innovation.</li>
            <li>Our alumni community comprises industry leaders, experts, and visionaries. Engage with them to tap into their vast knowledge and experience.</li>
            <li>Explore and grab the opportunity to connect with alumni</li>
          </ul>
          <Link className="Links" to="/dashboard/alumni">
             connect with alumni
            </Link>
        </div>
        <div className="image">
          <img src={alumni} alt="" />
        </div>
      </div>
      <div className="card">
        <div className="details">
          <h2>Jobs</h2>
          <ul>
            <li>Gain access to job listings posted by our esteemed alumni. These positions are tailored for individuals like you, with a shared academic background and connection</li>
            <li>These job postings aren't just about employment; they come with a built-in support system. Our alumni understand your potential and are ready to mentor, guide, and uplift you</li>
            <li>Explore and grab the opportunity to connect with alumni</li>
          </ul>
          <Link className="Links" to="/dashboard/jobs">
             explore jobs
          </Link>
        </div>
        <div className="image">
          <img src={job} alt="" />
        </div>
      </div>
      <div className="card">
        <div className="details">
          <h2>News</h2>
          <ul>
            <li>Our alumni are at the forefront of the latest developments. Keep yourself informed about industry trends and relevant news with their contributions.</li>
            <li>Immerse yourself in a world of knowledge and inspiration with news and articles crafted by our alumni. Benefit from their unique insights and experiences.</li>
            <li>Become part of a community that thrives on sharing knowledge and insights</li>
          </ul>
          <Link className="Links" to="/dashboard/news">
             explore News
          </Link>
        </div>
        <div className="image">
          <img src={news} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Recent