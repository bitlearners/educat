import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api"; // Make sure to import your API call function
import Modal from "../elements/Modal"; // Assuming you have a Modal component for showing user info

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "EdukotaNagpur@9860", // Default password
    parentNumber: "",
    contactNo: "",
    address: "",
    userClass: "",
    schoolName: "",
    course: "",
    dateOfExam: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // For showing success in modal
  const [userInfo, setUserInfo] = useState({ userId: "", username: "" }); // Store user info for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const navigate = useNavigate();

  // Input validation function
  const validateForm = () => {
    const {
      username,
      parentNumber,
      contactNo,
      address,
      userClass,
      schoolName,
      course,
      dateOfExam,
    } = formData;

    if (!username) {
      setError("Username is required");
      return false;
    }
    if (!parentNumber.match(/^\d{10}$/)) {
      setError("Parent number must be a valid 10-digit number");
      return false;
    }
    if (!contactNo.match(/^\d{10}$/)) {
      setError("Contact number must be a valid 10-digit number");
      return false;
    }
    if (!address) {
      setError("Address is required");
      return false;
    }
    if (!userClass) {
      setError("Class is required");
      return false;
    }
    if (!schoolName) {
      setError("School name is required");
      return false;
    }
    if (!course) {
      setError("Course selection is required");
      return false;
    }
    if (!dateOfExam) {
      setError("Date of exam is required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await registerUser(formData); // Call the API function
      if (response.message === "User registered successfully") {
        setSuccess(true);
        setError("");
        setUserInfo({ userId: response.user_id, username: response.username }); // Store the user ID and username
        setIsModalOpen(true); // Open the modal on success
      } else {
        setError(response.message);
        setSuccess(false);
      }
    } catch (error) {
      setError("Failed to register user");
      setSuccess(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Close the modal and navigate to login
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login"); // Redirect to login page after closing modal
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Register</h1>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {/* Parent Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Parent Number</span>
            </label>
            <input
              type="text"
              name="parentNumber"
              className="input input-bordered w-full"
              value={formData.parentNumber}
              onChange={handleChange}
            />
          </div>
          {/* Contact Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input
              type="text"
              name="contactNo"
              className="input input-bordered w-full"
              value={formData.contactNo}
              onChange={handleChange}
            />
          </div>
          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              className="input input-bordered w-full"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          {/* Class */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class</span>
            </label>
            <input
              type="text"
              name="userClass"
              className="input input-bordered w-full"
              value={formData.userClass}
              onChange={handleChange}
            />
          </div>
          {/* School Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">School Name</span>
            </label>
            <input
              type="text"
              name="schoolName"
              className="input input-bordered w-full"
              value={formData.schoolName}
              onChange={handleChange}
            />
          </div>
          {/* Course */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <select
              name="course"
              className="select select-bordered w-full"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="NDA">NDA</option>
              <option value="MHT-CET">MHT-CET</option>
              <option value="11th & 12th Boards">11th & 12th Boards</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {/* Date of Exam */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Exam</span>
            </label>
            <input
              type="date"
              name="dateOfExam"
              className="input input-bordered w-full"
              value={formData.dateOfExam}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-6 w-full">
          Register
        </button>
      </form>

      {/* Modal to display user information */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold text-center mb-4">
            Registration Successful
          </h2>
          <p className="text-center">
            Your User ID is <strong>{userInfo.userId}</strong>
          </p>
          <p className="text-center">
            Username: <strong>{userInfo.username}</strong>
          </p>
          <button onClick={closeModal} className="btn btn-primary mt-4">
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Register;
