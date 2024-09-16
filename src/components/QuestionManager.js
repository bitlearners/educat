import React, { useState, useEffect } from "react";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from "../api";

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [optionsCount, setOptionsCount] = useState(3);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const validateForm = () => {
    if (title.trim() === "") {
      setErrorMessage("Question cannot be empty");
      return false;
    }
    if (options.length === 0) {
      setErrorMessage("At least one option is required");
      return false;
    }
    if (correctOption === null) {
      setErrorMessage("You must select a correct option");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [key]: value };
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", img: "", is_correct: false }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctOption === index) {
      setCorrectOption(null);
    }
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    const newQuestion = { question: title, options };
    await createQuestion(newQuestion);
    setTitle("");
    setOptions([]);
    setCorrectOption(null);
    fetchQuestions();
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    const updatedQuestion = {
      qid: editingQuestion.qid,
      question: title,
      options,
      correct_option: correctOption,
    };
    await updateQuestion(updatedQuestion);
    setEditingQuestion(null);
    setTitle("");
    setOptions([]);
    setCorrectOption(null);
    fetchQuestions();
  };

  const handleDelete = async (qid) => {
    await deleteQuestion(qid);
    fetchQuestions();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Question Management
        </h1>

        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`input input-bordered w-full ${
              errorMessage ? "input-error" : ""
            }`}
            placeholder="Enter Question Title"
          />
          <select
            value={optionsCount}
            onChange={(e) => setOptionsCount(parseInt(e.target.value))}
            className="select select-bordered w-full"
          >
            {[3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>
                {count} Options
              </option>
            ))}
          </select>
          <div className="mt-4">
            {Array.from({ length: optionsCount }).map((_, index) => (
              <div
                key={index}
                className="mb-2 p-4 bg-base-200 rounded-lg shadow-md"
              >
                <input
                  type="text"
                  value={options[index]?.name || ""}
                  onChange={(e) =>
                    handleOptionChange(index, "name", e.target.value)
                  }
                  className="input input-bordered w-full mb-2"
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="text"
                  value={options[index]?.img || ""}
                  onChange={(e) =>
                    handleOptionChange(index, "img", e.target.value)
                  }
                  className="input input-bordered w-full mb-2"
                  placeholder="Image URL (optional)"
                />
                <label className="label cursor-pointer">
                  <span className="label-text">Correct Option</span>
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOption === index}
                    onChange={() => setCorrectOption(index)}
                    className="radio"
                  />
                </label>
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="btn btn-error btn-sm mt-2"
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button onClick={handleAddOption} className="btn btn-secondary">
              Add More Options
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          <div className="mt-4">
            {editingQuestion ? (
              <button onClick={handleUpdate} className="btn btn-primary">
                Update Question
              </button>
            ) : (
              <button onClick={handleCreate} className="btn btn-success">
                Create Question
              </button>
            )}
          </div>
        </div>

        <ul className="list-none space-y-4">
          {questions.map((question) => (
            <li
              key={question.qid}
              className="flex flex-col p-4 bg-base-200 rounded-lg shadow-md"
            >
              <span className="text-lg font-medium">{question.question}</span>
              <ul className="list-disc pl-5 mt-2">
                {question.options.map((option) => (
                  <li
                    key={option.oid}
                    className={`flex items-center ${
                      option.is_correct ? "font-bold" : ""
                    }`}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingQuestion(question);
                    setTitle(question.question);
                    setOptions(
                      question.options.map((opt) => ({
                        name: opt.name,
                        img: opt.img,
                        is_correct: opt.is_correct,
                      }))
                    );
                    setCorrectOption(
                      question.options.find((opt) => opt.is_correct)?.oid
                    );
                  }}
                  className="btn btn-info btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(question.qid)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionManager;
