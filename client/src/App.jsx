import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Dashbaord from "./components/Dashboard/Dashboard";
import Home from "./pages/Dashboard/Home";
import PrivateRoute from "./components/Auth/PrivateRoute";


export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/" element={<Signup /> } />
        <Route path="/SignIn" element={<Signin /> } />
        <Route path="/Test" element={<HomePage /> } />
        <Route path="/Dashboard/" element={<PrivateRoute element={<Dashbaord /> } /> } >
          <Route path="Home" element={<PrivateRoute element={<Home /> } /> } />
        </Route>
      
      </Routes>
    </BrowserRouter>
  )
}