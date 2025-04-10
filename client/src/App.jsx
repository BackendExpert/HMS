import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";


export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/" element={<HomePage /> } />
      
      </Routes>
    </BrowserRouter>
  )
}