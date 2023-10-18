import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../MyContext";
import { FaPlusCircle } from "react-icons/fa";
import JobCard from "./JobCard";

function Jobs() {
  const { userType, setUserType } = useMyContext();
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/dashboard/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Add the 'expanded' property to each job object
        const jobsWithExpanded = data.map((job) => ({ ...job, expanded: false }));
        setJobData(jobsWithExpanded);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  const handleToggle = (job) => {
    setJobData((prevData) => {
      return prevData.map((prevJob) => {
        if (prevJob === job) {
          return { ...prevJob, expanded: !prevJob.expanded };
        }
        return prevJob;
      });
    });
  };

  console.log(jobData);

  return (
    <div className="Jobs">
      <div className="jobs">
        {jobData.map((job) => (
          <JobCard key={job._id} job={job}  onToggle={handleToggle}/>
        ))}


      </div>
      {userType === "alumni" && (
        <div className="add">
          <Link to="/dashboard/create/job">
            <FaPlusCircle />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Jobs;
