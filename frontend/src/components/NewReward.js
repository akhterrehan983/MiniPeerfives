import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./UserList.css"; // Reuse styles if needed

const NewReward = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [rewardPoints, setRewardPoints] = useState(""); // Set to empty string
  const [currentUser, setCurrentUser] = useState({ p5_balance: 0 });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8000/api/users/"); // Fetch all users
      const data = await response.json();
      setUsers(data.filter((user) => user.id !== parseInt(id))); // Filter out the current user
    };

    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8000/api/users/${id}/`);
      const data = await response.json();
      setCurrentUser(data);
    };

    fetchUsers();
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const points = Number(rewardPoints);
    if (points > currentUser.p5_balance) {
      alert("Insufficient balance.");
      return;
    }

    await fetch(`http://localhost:8000/api/rewards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points: points,
        given_by: id,
        given_to: selectedUser,
      }),
    });

    navigate(`/${id}/p5`); // Redirect back to the P5 history page
  };

  const handleCancel = () => {
    navigate(`/${id}/p5`); // Redirect back to the P5 history page
  };

  return (
    <div className="new-user-container">
      <h1 className="new-user-header">Create New Reward</h1>
      <form className="new-user-form" onSubmit={handleSubmit}>
        <label htmlFor="user-select">Select User:</label>
        <select
          id="user-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="reward-points">Enter Points:</label>
        <input
          type="number"
          id="reward-points"
          value={rewardPoints}
          onChange={(e) => setRewardPoints(e.target.value)} // No conversion here; keep as string until submission
          max="100"
          min="1"
          required
        />
        <div>P5 Balance: {currentUser.p5_balance}</div>

        <div className="button-container">
          <button type="submit" className="new-user-button">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewReward;
