import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, submitAnswer } from '../../api';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [visitedQuestions, setVisitedQuestions] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const examId = 1; // Replace with the actual exam ID
            try {
                const response = await getQuestions(examId);
                setQuestions(response);
            } catch (err) {
                setError('Failed to fetch questions');
                console.error(err);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers({
            ...answers,
            [questionId]: selectedOption,
        });
        setVisitedQuestions({
            ...visitedQuestions,
            [questionId]: true,
        });
    };

    const handleMarkForReview = (questionId) => {
        setMarkedForReview({
            ...markedForReview,
            [questionId]: true,
        });
        setVisitedQuestions({
            ...visitedQuestions,
            [questionId]: true,
        });
    };

    const handleSubmit = async () => {
        const userId = 1; // Replace with the actual user ID
        try {
            for (const questionId in answers) {
                await submitAnswer({
                    user_id: userId,
                    question_id: questionId,
                    selected_option: answers[questionId],
                });
            }
            navigate('/report');
        } catch (err) {
            setError('Failed to submit answers');
            console.error(err);
        }
    };

    const countStatuses = () => {
        let notVisitedCount = 0;
        let markedForReviewCount = 0;
        let notAnsweredCount = 0;
        let answeredCount = 0;

        questions.forEach((question) => {
            const questionId = question.id;
            if (!visitedQuestions[questionId]) {
                notVisitedCount += 1;
            } else if (markedForReview[questionId]) {
                markedForReviewCount += 1;
            } else if (!answers[questionId]) {
                notAnsweredCount += 1;
            } else {
                answeredCount += 1;
            }
        });

        return { notVisitedCount, markedForReviewCount, notAnsweredCount, answeredCount };
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const { notVisitedCount, markedForReviewCount, notAnsweredCount, answeredCount } = countStatuses();

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-4 md:p-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="mb-4">
                <h1 className="text-lg font-semibold text-green-600">Test</h1>
            </div>

            <div className="md:flex md:space-x-6">
                <div className="md:w-3/4 mb-6 md:mb-0 p-4 border-r">
                    <h2 className="text-xl font-semibold mb-2">
                        Q{currentQuestionIndex + 1} of {questions.length} | {currentQuestion.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{currentQuestion.question_text}</p>
                    <div className="space-y-3">
                        {['option_a', 'option_b', 'option_c', 'option_d'].map((optionKey) => (
                            <label key={optionKey} className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                                <input
                                    type="radio"
                                    name="answer"
                                    className="mr-2"
                                    value={currentQuestion[optionKey]}
                                    checked={answers[currentQuestion.id] === currentQuestion[optionKey]}
                                    onChange={() => handleAnswerChange(currentQuestion.id, currentQuestion[optionKey])}
                                />
                                {currentQuestion[optionKey]}
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6 space-x-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-1/3"
                            onClick={() => handleAnswerChange(currentQuestion.id, '')}
                        >
                            Clear Answer
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-1/3"
                            onClick={() => handleMarkForReview(currentQuestion.id)}
                        >
                            Mark for Review
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-1/3"
                            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                        >
                            Save & Next
                        </button>
                    </div>
                </div>

                <div className="md:w-1/4 p-4">
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Saving Progress...</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-10 h-10 rounded-lg ${
                                        currentQuestionIndex === index
                                            ? 'bg-red-400 text-white'
                                            : markedForReview[questions[index].id]
                                            ? 'bg-yellow-500'
                                            : answers[questions[index].id]
                                            ? 'bg-green-500'
                                            : visitedQuestions[questions[index].id]
                                            ? 'bg-red-500'
                                            : 'bg-gray-200'
                                    }`}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Counters */}
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <span className="w-4 h-4 bg-gray-400 inline-block rounded-full mr-2"></span>
                            <span>Not Visited: {notVisitedCount}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="w-4 h-4 bg-yellow-500 inline-block rounded-full mr-2"></span>
                            <span>Marked for Review: {markedForReviewCount}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="w-4 h-4 bg-red-500 inline-block rounded-full mr-2"></span>
                            <span>Not Answered: {notAnsweredCount}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 bg-green-500 inline-block rounded-full mr-2"></span>
                            <span>Answered: {answeredCount}</span>
                        </div>
                    </div>

                    <div>
                        <button
                            className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700"
                            onClick={handleSubmit}
                        >
                            Finish Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exam;
