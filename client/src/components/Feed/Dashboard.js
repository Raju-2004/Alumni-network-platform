import React, { useEffect, useState } from 'react'
import { Link,Outlet } from 'react-router-dom'

function Dashboard() {

  const [events,setEvents]  = useState([]);
  const [jobs,setJobs] = useState([]);
  const [alumni,setAlumni] = useState([]);
  const [news,setNews] = useState([]);


  useEffect(()=>{

  },[])

  return (
    <div className="Dashboard">
      <div className="Navbar">
        <ul>
          <li>
            {/* onClick={onPostclick} */}
            <Link className="Links" to="/dashboard/events">
              Events
            </Link>
          </li>
          <li>
            <Link className="Links" to="/dashboard/alumni">
              Alumni's
            </Link>
          </li>
          <li>
            <Link className="Links" to="/dashboard/jobs">
              Jobs/Internships
            </Link>
          </li>
          <li>
            <Link className="Links" to="/dashboard/news">
                News and Articles
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard