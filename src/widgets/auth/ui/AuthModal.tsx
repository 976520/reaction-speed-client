import { Button, ErrorMessage, Form, Input, Modal, ModalContent, ToggleButton } from "./styled";
import { FC, FormEvent, useState } from "react";

import { LoginCredentials } from "@/features/auth/api/types";
import { authApi } from "@/features/auth/api/authApi";
import { setUser } from "@/entities/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const credentials: LoginCredentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = isLogin ? await authApi.login(credentials) : await authApi.register(credentials);

      if (response.success && response.data?.user) {
        dispatch(setUser(response.data.user));
        onClose();
      } else {
        setError(response.message || "로그인 또는 회원가입 실패");
      }
    } catch (err) {
      toast.error("서버 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClick={handleModalClick}>
      <ModalContent>
        <h2>{isLogin ? "로그인" : "회원가입"}</h2>
        <Form onSubmit={handleSubmit}>
          <Input name="username" placeholder="아이디" required minLength={4} maxLength={20} />
          <Input name="password" type="password" placeholder="비밀번호" required minLength={6} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">{isLogin ? "로그인" : "회원가입"}</Button>
        </Form>
        <ToggleButton onClick={() => setIsLogin(!isLogin)}>{isLogin ? "회원가입하기" : "로그인하기"}</ToggleButton>
      </ModalContent>
    </Modal>
  );
};
