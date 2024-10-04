import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./UserList.css"; // Reuse styles if needed

const ViewUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({
    name: "",
    p5_balance: 0,
    rewards_balance: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8000/api/users/${id}/`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/users/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    navigate("/"); // Redirect to user list after saving
  };

  return (
    <div className="new-user-container">
      <h1 className="new-user-header">View User</h1>
      <form className="new-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-user-input"
          value={user.name}
          onChange={handleChange}
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
      <div className="balance-info">
        <h3>P5 Balance: {user.p5_balance}</h3>
        <Link to={`/${id}/p5`} className="new-user-button">
          View P5 History
        </Link>
        <h3>Rewards Balance: {user.rewards_balance}</h3>
        <Link to={`/${id}/rewards`} className="new-user-button">
          View Rewards History
        </Link>
      </div>
    </div>
  );
};

export default ViewUser;
