
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/auth/LoginPage";
import AfterLanding from "./components/customer/afterlanding";
import Contact from "./components/customer/contact";
import HomePage from "./components/customer/landingpage";
import Service from "./components/customer/service";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/customer" element={<AfterLanding />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
