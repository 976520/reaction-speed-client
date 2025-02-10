import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api";

export const authApi = {
  register: async (username: string, password: string) => {
    try {
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
        toast.success("회원가입이 완료되었습니다!");
      } else {
        toast.error(data.message || "회원가입에 실패했습니다.");
      }
      return data;
    } catch (error) {
      toast.error("서버 오류가 발생했습니다.");
      throw error;
    }
  },

  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("로그인되었습니다!");
      } else {
        toast.error(data.message || "로그인에 실패했습니다.");
      }

      return data;
    } catch (error) {
      toast.error("서버 오류가 발생했습니다.");
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
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        return null;
      }
      return response.json();
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("서버 오류가 발생했습니다.");
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    toast.info("로그아웃되었습니다.");
  },
};
