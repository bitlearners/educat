import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Instructions from './components/Exam/Instructions';
import Exam from './components/Exam/Exam';
import Report from './components/Exam/Report';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/exam" element={<Exam />} />
                    <Route path="/report" element={<Report />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
