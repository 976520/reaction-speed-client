const API_URL = "http://127.0.0.1:8000/api";

export const register = async (username: string, password: string) => {
  console.log(JSON.stringify({ username, password }));
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getLeaderboard = async () => {
  const response = await fetch(`${API_URL}/leaderboard/`);
  return response.json();
};
