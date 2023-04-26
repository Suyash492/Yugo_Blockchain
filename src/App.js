import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Screens/Signin";
import SignUp from "./Screens/Signup";
import Home from "./Screens/Home";
import Createride from "./Screens/Createride";
import AllRides from "./Screens/AllRides";
import Bookride from "./Screens/Bookride"

function App() {
  const email = localStorage.getItem("email");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route
            path="/Home"
            element={email ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/Createride" element={<Createride />} />
          <Route path="/all-rides" element={<AllRides />} />
          <Route path="/Bookride" element={<Bookride />} />
        </Routes>
      </BrowserRouter>
      {/* <Createride></Createride> */}
    </div>
  );
}

export default App;
