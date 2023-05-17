// import React, { useState, useEffect } from "react";
// import "./index.css";
// import axios from "axios";

// import Dashboard from "./Dashboard";
// import Login from "./Login";

// const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=6149eda588f347a0856c12deaaff09a3&response_type=code&redirect_uri=https://soundstream-q4fk.onrender.com&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read`;

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [code, setCode] = useState(null);
//   const handleSubmit = async (email, username, password) => {
//     try {
//       console.log(email, username, password);
//       const newUser = { username, password, email };

//       const response = await axios.post(
//         "https://soundstream-api.onrender.com/api/users",
//         newUser,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response.data);
//       let selectedUserId = response.data.selectedUser.id;

//       localStorage.setItem("selectedUserId", selectedUserId);

//       setCurrentUser(selectedUserId);
//       window.location.href = AUTH_URL;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     setCode(new URLSearchParams(window.location.search).get("code"));
//     let selectedUserId = localStorage.getItem("selectedUserId");
//     setCurrentUser(selectedUserId);
//   }, []);
//   console.log(currentUser);
//   if (currentUser && code) {
//     return <Dashboard code={code} />;
//   } else {
//     return <Login handleSubmit={handleSubmit} />;
//   }
// }

// export default App;
import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

import Dashboard from "./Dashboard";
import Login from "./Login";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=6149eda588f347a0856c12deaaff09a3&response_type=code&redirect_uri=https://soundstream-q4fk.onrender.com&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read`;

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const code = new URLSearchParams(window.location.search).get("code");

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

      // console.log(response.data);
      let selectedUserId = response.data.selectedUser.id;

      localStorage.setItem("selectedUserId", selectedUserId);

      setCurrentUser(selectedUserId);
      window.location.href = AUTH_URL;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let selectedUserId = localStorage.getItem("selectedUserId");
    setCurrentUser(selectedUserId);
  }, []);

  if (currentUser && code) {
    return <Dashboard code={code} />;
  } else {
    return <Login handleSubmit={handleSubmit} />;
  }
}

export default App;
