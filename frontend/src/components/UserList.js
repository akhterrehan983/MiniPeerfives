import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.css"; // Make sure to import the CSS

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/users/");
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>User List</h1>
        <Link to="/new" className="create-user-button">
          Create New User
        </Link>
      </div>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Rewards Balance</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.p5_balance}</td>
              <td>{user.rewards_balance}</td>
              <td>
                <Link to={`/${user.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
