import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Instructions from "./components/Exam/Instructions";
import Exam from "./components/Exam/Exam";
import Report from "./components/Exam/Report";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import QueGrp from "./components/QueGrp";
import QuestionManager from "./components/QuestionManager";
import Abhi from "./components/Abhi";


import { Toaster } from 'react-hot-toast';


import CreateQuestion from "../src/pages/question/CreateQuestion";

import UpdateQuestion from "../src/pages/question/EditQuestion";

import QuestionsTable  from "../src/pages/question/QuestionsTable";

import ViewOpp from "./components/ViewOpp";
import AllExams from "./pages/exam/AllExams";
import AddNewExam from "./pages/exam/AddExam";
import UpdateExam from "./pages/exam/UpdateExam";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
      
      <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/report" element={<Report />} />
          <Route path="/quegrp" element={<QueGrp />} />
          <Route path="/que" element={<QuestionManager />} />

          <Route path="/abhi" element={<Abhi />} />
          <Route path="/abhiview" element={<ViewOpp />} />

          
          <Route path="/admin/que/create-question" element={<CreateQuestion />} />
          <Route path="/admin/que/update-question/:qid" element={<UpdateQuestion />} />
          <Route path="/admin/que/" element={<QuestionsTable  />} />


          <Route path="/admin/exam/add" element={<AddNewExam />} />

          <Route path="/admin/exam/" element={<AllExams  />} />



          <Route path="/admin/exam/add/:eid" element={<UpdateExam />} />
          

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
