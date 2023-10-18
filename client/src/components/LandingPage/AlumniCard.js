import React,{useEffect,useState} from 'react'
import anp from '../../Assets/photo.jpg'
function AlumniCard({alumni}) {
  const [imagePath, setImagePath] = useState(
    "https://www.patterns.dev/img/reactjs/react-logo@3x.svg"
  );
  // console.log(alumni);
  const image = alumni.file
  
  useEffect(() => {
    if (image) {
      const correctedImagePath = image.replace(/\\/g, "/");
      setImagePath("http://localhost:4000/" + correctedImagePath);
      // console.log(imagePath);
    }
  }, [imagePath, image]);
  console.log()
  return (
    <div className='AlumniCard'>
      <img width={320} height={290} src={imagePath} alt='alumni'/>
      <p><span>Name : </span> {alumni.Name}</p>
      <p><span>Graduation Year :</span>{alumni.Graduation_year} </p>
      <p><span>Achievement : </span>{alumni.Achievements}</p>
    </div>
  )
}

export default AlumniCard
