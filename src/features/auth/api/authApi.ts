const API_URL = "http://127.0.0.1:8000/api";

export const authApi = {
  register: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/leaderboard/`);
    return response.json();
  },
};
