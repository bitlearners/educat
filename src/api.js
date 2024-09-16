const API_BASE_URL = "http://localhost/edukotaapi/";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getQuestions = async (examId) => {
  const response = await fetch(
    `${API_BASE_URL}getQuestions.php?exam_id=${examId}`
  );
  return response.json();
};

export const submitAnswer = async (answerData) => {
  const response = await fetch(`${API_BASE_URL}submitAnswer.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answerData),
  });
  return response.json();
};

export const getReport = async (examId, userId) => {
  const response = await fetch(
    `${API_BASE_URL}getReport.php?exam_id=${examId}&user_id=${userId}`
  );
  return response.json();
};

export const updateStatus = async (statusData) => {
  const response = await fetch(`${API_BASE_URL}updateStatus.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statusData),
  });
  return response.json();
};

export const getStatus = async (examId, userId) => {
  const response = await fetch(
    `${API_BASE_URL}getStatus.php?exam_id=${examId}&user_id=${userId}`
  );
  return response.json();
};

// starting of quegrp

export const createGroup = async (group) => {
  const response = await fetch(`${API_BASE_URL}quegrp/create.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });
  return response.json();
};

export const getGroups = async () => {
  const response = await fetch(`${API_BASE_URL}quegrp/read.php`, {
    method: "GET",
  });
  return response.json();
};

export const updateGroup = async (group) => {
  const response = await fetch(`${API_BASE_URL}quegrp/update.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });
  return response.json();
};

export const deleteGroup = async (gid) => {
  const response = await fetch(`${API_BASE_URL}quegrp/delete.php`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gid }),
  });
  return response.json();
};

// ending of quegrp

// starting of queans

export const createQuestion = async (questionData) => {
  const response = await fetch(`${API_BASE_URL}question/question.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData),
  });
  if (!response.ok) throw new Error("Failed to create question");
  return response.json();
};

export const getQuestion = async () => {
  const response = await fetch(`${API_BASE_URL}question/question.php`);
  if (!response.ok) throw new Error("Failed to fetch questions");
  return response.json();
};

export const updateQuestion = async (questionData) => {
  const response = await fetch(`${API_BASE_URL}question/question.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData),
  });
  if (!response.ok) throw new Error("Failed to update question");
  return response.json();
};

export const deleteQuestion = async (qid) => {
  const response = await fetch(`${API_BASE_URL}question/question.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ qid }),
  });
  if (!response.ok) throw new Error("Failed to delete question");
  return response.json();
};

//   ending of queans
