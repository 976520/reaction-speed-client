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
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  login: async (username: string, password: string) => {
    try {
      console.log(username, "로그인");

      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("로그인 응답:", data);

      if (data.token) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
      } else {
        console.log("토큰 없음");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/leaderboard/`);
    return response.json();
  },

  validateToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/validate-token/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        localStorage.removeItem("token");
        return null;
      }
      return response.json();
    } catch (error) {
      localStorage.removeItem("token");
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
