import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Dashbaord from "./components/Dashboard/Dashboard";
import Home from "./pages/Dashboard/Home";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Students from "./pages/Students/Students";
import Hostels from "./pages/Hostels/Hostels";
import Rooms from "./pages/Room/Rooms";
import StudentView from "./pages/Students/StudentView";
import ViewHostel from "./pages/Hostels/ViewHostel";
import ViewRoom from "./pages/Room/ViewRoom";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import SignUpInfoStd from "./pages/Auth/SignUpInfoStd";
import EmailVerifyStd from "./pages/Auth/EmailVerifyStd";
import Forgetpass from "./pages/Auth/Forgetpass";
import VerifyOPTPass from "./pages/Auth/VerifyOPTPass";


export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/" element={<Signin /> } />
        <Route path="/Test" element={<HomePage /> } />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/signupInfo" element={<SignUpInfoStd /> } />
        <Route path="/StudentEmailVerify" element={<EmailVerifyStd /> } />
        <Route path="/Forgetpass" element={<Forgetpass /> } />
        <Route path="/VerifyOPTPass" element={<VerifyOPTPass /> } />


        <Route path="/Dashboard/" element={<PrivateRoute element={<Dashbaord /> } /> } >
          <Route path="Home" element={<PrivateRoute element={<Home /> } /> } />
          <Route path="Students" element={<PrivateRoute element={<Students /> } /> } />
          <Route path="Hostels" element={<PrivateRoute element={<Hostels /> } /> } />
          <Route path="Rooms" element={<PrivateRoute element={<Rooms /> } /> } />
          <Route path="StudentView/:id" element={<PrivateRoute element={<StudentView /> } /> } />
          <Route path="ViewHostel/:id" element={<PrivateRoute element={<ViewHostel /> } /> } />
          <Route path="ViewRoom/:id" element={<PrivateRoute element={<ViewRoom /> } /> } />
          <Route path="Profile" element={<PrivateRoute element={<Profile /> } /> } /> 
          <Route path="Users" element={<PrivateRoute element={<Users /> } /> } /> 
        </Route>
      
      </Routes>
    </BrowserRouter>
  )
}