import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Dashbaord from "./components/Dashboard/Dashboard";


export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/" element={<Signup /> } />
        <Route path="/SignIn" element={<Signin /> } />
        <Route path="/Test" element={<HomePage /> } />
        <Route path="/Dashboard/" element={<Dashbaord /> } >
          
        </Route>
      
      </Routes>
    </BrowserRouter>
  )
}