import React, { useEffect, useState } from 'react';

const Header = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve user ID and username from sessionStorage
    const storedUserId = sessionStorage.getItem('userId');
    const storedUsername = sessionStorage.getItem('username');

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear session storage on logout
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    // You can also add redirect logic here if needed
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="text-xl font-semibold">Student Dashboard</div>
      <div className="flex items-center space-x-4">
     
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405C18.828 14.839 18 13.445 18 12V5a3 3 0 00-3-3H9a3 3 0 00-3 3v7c0 1.445-.828 2.839-1.595 3.595L3 17h5"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
           
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">Your Id, {username}</p>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
