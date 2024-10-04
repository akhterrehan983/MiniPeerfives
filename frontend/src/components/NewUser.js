import React, { useState } from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./NewUser.css"; // Import the CSS file

const NewUser = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ name });
    navigate("/");
  };

  return (
    <div className="new-user-container">
      <h1 className="new-user-header">Create New User</h1>
      <form className="new-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-user-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <div className="button-container">
          <button type="submit" className="new-user-button">
            Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
