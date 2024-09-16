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
    const response = await fetch(`${API_BASE_URL}getQuestions.php?exam_id=${examId}`);
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
    const response = await fetch(`${API_BASE_URL}getReport.php?exam_id=${examId}&user_id=${userId}`);
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
    const response = await fetch(`${API_BASE_URL}getStatus.php?exam_id=${examId}&user_id=${userId}`);
    return response.json();
};
