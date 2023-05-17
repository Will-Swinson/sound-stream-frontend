import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

// import Login from "./Login.jsx";

import Dashboard from "./Dashboard";
import Login from "./Login";
// Get code from the URL

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const selectedUserId = localStorage.getItem("selectedUserId");
    setCurrentUser(selectedUserId);
  }, []);

  const handleSubmit = async (email, username, password) => {
    try {
      console.log(email, username, password);
      const newUser = { username, password, email };

      const response = await axios.post(
        "https://soundstream-api.onrender.com/api/users",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      let selectedUserId = response.data.selectedUser.id;

      localStorage.setItem("selectedUserId", selectedUserId);

      setCurrentUser(selectedUserId);
    } catch (err) {
      console.error(err);
    }
  };

  if (currentUser && code) {
    return <Dashboard code={code} />;
  } else {
    return <Login handleSubmit={handleSubmit} />;
  }
}

export default App;
