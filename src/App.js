import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import VisitorList from "./pages/list/VisitorList";
import StaffData from "./pages/list/StaffData";
import ApprovalList from "./pages/list/ApprovalList";
import ViewOne from "./components/table/ViewOne";
import AllLogs from "./pages/logs/AllLogs";
import Verifieds from "./pages/Emails/Verifieds";
import Vfailed from "./pages/Emails/Vfailed";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/admin/Profile";
import Contactus from "../src/pages/ContactUS/Contactuslist";
import Cdeveloperlist from "./pages/contactDeveloper/Cdeveloperlist";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logs" element={<AllLogs />} />
            <Route path="/verified" element={<Verifieds />} />
            <Route path="/failed" element={<Vfailed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/faq" element={<Cdeveloperlist />} />

            <Route path="users">
              <Route index element={<VisitorList />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="staff">
              <Route index element={<StaffData />} />
              <Route path=":staffId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="approval">
              <Route index element={<ApprovalList />} />
              <Route path=":staffId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
