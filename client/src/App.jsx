import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

export default function App() {
  const [showNavBar, setShowNavBar] = useState(true);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {

      setShowNavBar(false);
    } else {

      setShowNavBar(true);
    }
    setIsTopOfPage(currentScrollY === 0);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const shouldShowNavBar = !location.pathname.startsWith("/Dashboard");
  const shouldShowFooter = !location.pathname.startsWith("/Dashboard");

  return (
    <BrowserRouter>
        {shouldShowNavBar && (
          <div
          className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
            showNavBar ? "translate-y-0" : "-translate-y-full"
          } ${
            isTopOfPage
              ? "bg-transparent transition-colors duration-500 "
              : "bg-white/10 backdrop-blur-md shadow-md transition-colors duration-500"
          }`}
          >
            <Nav />
          </div>
        )}
      <Routes>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/" element={<HomePage /> } />
        <Route path="/signin" element={<Login /> } />
        <Route path="/AboutUs" element={<AboutUs /> } />
        <Route path="/Services" element={<Services /> } />
        <Route path="/Products" element={<Products /> } />
        <Route path="/Trainers" element={<Trainers /> } />

        <Route path="/Dashboard/" element={<PrivateRoute element={<Dashbaord /> } /> } >
          <Route path="Home" element={<PrivateRoute element={<DashHome />} /> } />
        </Route>
       
      </Routes>
      {shouldShowFooter && <Footer />}
    </BrowserRouter>
  )
}