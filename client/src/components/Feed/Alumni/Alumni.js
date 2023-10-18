import React, { useEffect, useState } from "react";
import AlumniCard from "./AlumniCard";

function Alumni() {
  const [alumniData, setAlumniData] = useState(null);
  const [filteredData, SetfilteredData] = useState(null);
  const userEmail = localStorage.getItem("UserEmail");
  console.log(userEmail+"-------");

  useEffect(() => {
    fetch("http://localhost:4000/alumni")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAlumniData(data);
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });

  }, []);

  useEffect(() => {
    if (alumniData) {
      // Filter out alumni with the same email as the logged-in user
      const filteredAlumniData = alumniData.filter((alumni) => alumni.Email !== userEmail);
      SetfilteredData(filteredAlumniData);
    }
  }, [alumniData, userEmail]);

  // console.log(alumniData);

  console.log(filteredData);


  

  return filteredData !== null ? ( // Check if filteredData is not null
    <div className="Alumni">
      {filteredData.map((alumni) => (
        <AlumniCard
          key={alumni._id}
          id={alumni._id}
          name={alumni.Name}
          email={alumni.Email}
          current_role={alumni.current_role}
          image={alumni.file}
          graduation={alumni.Graduation_year}
          LinkedIn={alumni.LinkedIn}
          expertise={alumni.expertise}
          achievements={alumni.Achievements}
        />
      ))}
    </div>
  ) : (
    <p>Loading alumni data...</p>
  );
}

export default Alumni;
