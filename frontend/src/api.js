const API_URL = "http://localhost:8000/api";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users/`);
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Other API functions can be added here...
