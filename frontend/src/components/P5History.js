import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserList.css"; // Reuse styles if needed

const P5History = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({ p5_balance: 0 });
  const [p5History, setP5History] = useState([]);

  useEffect(() => {
    const fetchP5History = async () => {
      const response = await fetch(`http://localhost:8000/api/p5_history/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }), // Send user ID in request body
      });
      const data = await response.json();
      setP5History(data.p5_history); // Adjust based on response structure
    };

    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8000/api/users/${id}/`);
      const data = await response.json();
      setUser(data);
    };

    fetchP5History();
    fetchUser();
  }, [id]);

  const handleDelete = async (rewardId) => {
    await fetch(`http://localhost:8000/api/rewards/${rewardId}/delete/`, {
      method: "DELETE",
    });
    setP5History(p5History.filter((item) => item.id !== rewardId));
  };

  return (
    <div className="new-user-container">
      <h1 className="new-user-header">P5 History of {user.name}</h1>
      <h3>P5 Balance: {user.p5_balance}</h3>
      <Link to={`/${id}/rewards/new`} className="new-user-button">
        Create New Reward
      </Link>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {p5History.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{new Date(item.datetime_stamp).toLocaleString()}</td>
              <td>{item.points}</td>
              <td>{item.given_to_name}</td> {/* User to whom P5 was given */}
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5History;
