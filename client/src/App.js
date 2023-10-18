import {Outlet,createBrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from "./components/LandingPage/Header";
import Image from "./components/LandingPage/Image";
import Footer from "./components/LandingPage/Footer";
import SignUp from "./components/SignUpLogin/SignUp";
import Dashboard from "./components/Feed/Dashboard";
import Recent from "./components/Feed/Recent";
import Events from "./components/Feed/Events/Events";
import Jobs from "./components/Feed/Jobs/Jobs";
import News from "./components/Feed/News/News";
import Alumni from "./components/Feed/Alumni/Alumni";
import AlumniSignUp from "./components/SignUpLogin/AlumniSignUp";
import StudentSignUp from "./components/SignUpLogin/StudentSignUp";
import CreateEvent from "./components/Feed/Events/CreateEvent";

import { MyContextProvider } from './components/MyContext'; 
import { useState } from "react";
import CreateJob from "./components/Feed/Jobs/CreateJob";
import Chat from "./components/Feed/chat/Chat";
import CreateNews from "./components/Feed/News/CreateNews";
import SingleNews from "./components/Feed/News/SingleNews";
function App() {

  const isUserLoggedIn = localStorage.getItem("UserEmail");
  console.log(isUserLoggedIn+"-----");

  return (
    <div className="App">
       <MyContextProvider>
       <Header/>
      <Outlet/>
      <Footer/>
      <ToastContainer/>
       </MyContextProvider>
    </div>
  );
}
export const AppRouter = createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/",
          element:<Image/>
        },
        {
          path:"/access-account",
          element : <SignUp/>
        },
        {
          path:"/alumni/signup",
          element : <AlumniSignUp />
        },
        {
          path:"/alumni/login",
          element : <AlumniSignUp />
        },
        {
          path:"/student/signup",
          element : <StudentSignUp />
        },
        {
          path:"/student/login",
          element : <StudentSignUp />
        },
        {
          path:"/dashboard",
          // element:<Dashboard/>,
          children:[
            {
              path:"/dashboard",
              element:<Recent/>
            },
            {
              path:"/dashboard/events",
              element:<Events/>
            },
            {
              path:"/dashboard/News",
              element:<News/>
            },
            {
              path:"/dashboard/create/event",
              element:<CreateEvent/>
            },
            {
              path:"/dashboard/create/News",
              element:<CreateNews/>
            },
            {
              path:"/dashboard/jobs",
              element:<Jobs/>
            },
            {
              path:"/dashboard/create/job",
              element:<CreateJob/>
            },
            {
              path:"/dashboard/news",
              element:<News/>
            },
            {
              path:"/dashboard/news/:id",
              element:<SingleNews/>
            },
            {
              path:"/dashboard/alumni",
              element:<Alumni/>
            },
            {
              path:"/dashboard/chat/:email",
              element:<Chat/>
            }
          ]
        }
      ]
    },
    
    
  ]
)
export default App;
