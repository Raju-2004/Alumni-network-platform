import React, { useEffect, useState } from "react";
import AlumniCard from "./AlumniCard";
function Achievements() {
  const [Achievements, setAchievements] = useState([]);

  useEffect(() => {
    const getAlumni = async () => {
      try {
        const res = await fetch("http://localhost:4000/alumni");
        const data = await res.json();
        console.log(data);
       /*  const alumniWithAchievements = data.filter(
          (alumni) => alumni.achievements
        ); */
        setAchievements(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAlumni();
  }, []);
  console.log(Achievements);
  return (
    <div className="Achievements">
      <h1>Achievements of Alumni</h1>
      <div className="alumni">
        {Achievements &&
          Achievements.map((a) => a.Achievements && <AlumniCard key={a._id} alumni={a} />)}
      </div>
    </div>
  );
}

export default Achievements;
