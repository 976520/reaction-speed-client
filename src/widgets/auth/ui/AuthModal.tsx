import { Button, ErrorMessage, Form, Input, Modal, ModalContent, ToggleButton } from "./styled";

import { authApi } from "@/features/auth/api/authApi";
import { setUser } from "@/entities/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (isLogin) {
        const data = await authApi.login(formData.get("username") as string, formData.get("password") as string);
        if (data.user) {
          dispatch(setUser(data.user));
          onClose();
        } else {
          setError(data.message || "로그인 실패");
        }
      } else {
        const data = await authApi.register(formData.get("username") as string, formData.get("password") as string);
        if (data.user) {
          dispatch(setUser(data.user));
          onClose();
        } else {
          setError(data.message || "회원가입 실패");
        }
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClick={handleModalClick}>
      <ModalContent>
        <h2>{isLogin ? "로그인" : "회원가입"}</h2>
        <Form onSubmit={handleSubmit}>
          <Input name="username" placeholder="아이디" required />
          <Input name="password" type="password" placeholder="비밀번호" required />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">{isLogin ? "로그인" : "회원가입"}</Button>
        </Form>
        <ToggleButton onClick={() => setIsLogin(!isLogin)}>{isLogin ? "회원가입하기" : "로그인하기"}</ToggleButton>
      </ModalContent>
    </Modal>
  );
};
