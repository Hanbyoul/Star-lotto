"use client";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import handleAlertError from "../utils/handleAlertError";

export interface UserInput {
  userId: string;
  email: string;
}

interface ResponseMessage {
  message: string;
}

export default function Page() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<UserInput>();

  const onSubmit = async (data: UserInput) => {
    console.log("data", data);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/pw_Inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result: ResponseMessage = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "서버 오류가 발생했습니다.");
      }

      alert(result.message);
      router.push("/login");
    } catch (error) {
      handleAlertError(error);
    }
  };

  const { errors } = formState;

  return (
    <Container>
      <Title>가입시 입력한 아이디와 이메일을 입력해주세요.</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputArea>
          <InputBox
            {...register("userId", {
              required: "아이디를 입력해주세요.",
              minLength: {
                value: 4,
                message: "아이디가 너무 짧습니다. 4글자 이상 입력해주세요",
              },
            })}
            name="userId"
            placeholder="아이디"
            type="text"
            autoComplete="off"
          />
          <ErrorMessage>
            {errors.userId ? errors.userId?.message : null}
          </ErrorMessage>
          <InputBox
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "올바른 이메일 주소를 입력해주세요.",
              },
            })}
            placeholder="이메일"
            type="text"
            autoComplete="off"
          />
          <ErrorMessage>
            {errors.email ? errors.email?.message : null}
          </ErrorMessage>
        </InputArea>
        <SubmitBtn type="submit">다음</SubmitBtn>
      </LoginForm>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
  border: 1px solid #dcdde1;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  padding: 10px;
  text-align: center;
  font-size: large;
  font-weight: 500;
  width: 100%;
  border-bottom: 1px solid #dcdde1;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 250px;

  @media screen and (max-width: 705px) {
    width: 360px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const InputBox = styled.input`
  outline: none;
  border: 1px solid #dcdde1;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding: 20px;
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-color: #5f94f6;
  color: white;
  font-size: large;
  &:hover {
    transition: 0.2s;
    background-color: #4380f3;
  }
`;

const ErrorMessage = styled.p`
  height: 20px;
  font-size: small;
  color: red;
  align-self: self-start;
`;
