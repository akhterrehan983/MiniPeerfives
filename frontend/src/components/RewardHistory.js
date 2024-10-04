import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserList.css"; // Reuse styles if needed

const RewardHistory = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [rewardsHistory, setRewardsHistory] = useState([]); // Initialize as empty array
  const [user, setUser] = useState({ rewards_balance: 0 });

  useEffect(() => {
    const fetchRewardsHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/reward_history/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: id }), // Send user ID in request body
          }
        );
        

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRewardsHistory(data.reward_history || []); // Use empty array if undefined
      } catch (error) {
        console.error("Failed to fetch reward history:", error);
        setRewardsHistory([]); // Set to empty array on error
      }
    };

    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8000/api/users/${id}/`);
      const data = await response.json();
      setUser(data);
    };

    fetchRewardsHistory();
    fetchUser();
  }, [id]);

  return (
    <div className="new-user-container">
      <h1 className="new-user-header">Reward History of {user.name}</h1>
      <h3>Rewards Balance: {user.rewards_balance}</h3>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {rewardsHistory.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{new Date(item.datetime_stamp).toLocaleString()}</td>
              <td>{item.points}</td>
              <td>{item.given_by_name}</td>{" "}
              {/* Name of the user who gave the reward */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
