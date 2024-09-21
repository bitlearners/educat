import React, { useState, useEffect } from "react";
import { getReport } from "../../api";

const Result = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const response = await getReport(1); // Replace 1 with the exam ID
      setReport(response);
    };
    fetchReport();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-4 md:p-6">
      <h1 className="text-lg font-semibold text-green-600">Exam Result</h1>
      {report && (
        <div>
          <p>Total Questions: {report.total_questions}</p>
          <p>Correct Answers: {report.correct_answers}</p>
          <p>Wrong Answers: {report.wrong_answers}</p>
          <p>Skipped Questions: {report.skipped_questions}</p>
        </div>
      )}
    </div>
  );
};

export default Result;
