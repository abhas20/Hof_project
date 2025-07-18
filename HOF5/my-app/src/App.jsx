import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from './components/chatbot'
import Home from "./Pages/Home";
import LodgeGrievance from "./Pages/LodgeGrievance";
import TrackGrievance from "./Pages/Track";
import FAQ from "./Pages/FAQ";
import FeedbackPage from "./Pages/Feedback";
import Login from "./Pages/LoginPage";
import Signup from "./Pages/SignUpPage";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lodgeg" element={<LodgeGrievance />} />
            <Route path="/track" element={<TrackGrievance />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;