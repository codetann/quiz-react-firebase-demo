import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./Firebase/FirebaseContext";

export default function SaveScoreForm({ score, scoreSaved }) {
  const [username, setUsername] = useState("");
  const firebase = useFirebase();

  const saveHighScore = (e) => {
    e.preventDefault();
    const record = {
      name: username,
      score,
    };

    firebase.scores().push(record, () => {
      scoreSaved();
    });
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn" disabled={!username}>
          Save
        </button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
}
