import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import VisitorList from "./pages/list/VisitorList";
import StaffData from "./pages/list/StaffData";
import ApprovalList from "./pages/list/ApprovalList";
import AllLogs from "./pages/logs/AllLogs";
import Verifieds from "./pages/Emails/Verifieds";
import Vfailed from "./pages/Emails/Vfailed";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/admin/Profile";
import Contactus from "../src/pages/ContactUS/Contactuslist";
import Cdeveloperlist from "./pages/contactDeveloper/Cdeveloperlist";
import Rejected from "./pages/Emails/Rejected";
import Test from "./pages/contactDeveloper/Test";
import NotFoundPage from "./pages/NotFound/PageNotFound";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/">
            <Route path="*" element={<NotFoundPage />} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logs" element={<AllLogs />} />
            <Route path="/verified" element={<Verifieds />} />
            <Route path="/failed" element={<Vfailed />} />
            <Route path="/reject" element={<Rejected />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/faq" element={<Cdeveloperlist />} />
            <Route path="/test" element={<Test />} />

            <Route path="users">
              <Route index element={<VisitorList />} />
              <Route path=":userId" element={<Single />} />
            </Route>
            <Route path="staff">
              <Route index element={<StaffData />} />
              <Route path=":staffId" element={<Single />} />
            </Route>
            <Route path="approval">
              <Route index element={<ApprovalList />} />
              <Route path=":staffId" element={<Single />} />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
