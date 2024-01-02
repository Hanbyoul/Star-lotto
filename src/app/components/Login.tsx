"use client";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import React from "react";
import { useRouter } from "next/navigation";
import { IForm, UserResponse } from "./SignUp";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState } = useForm<IForm>();
  const { errors } = formState;

  const LogIn = async (data: IForm) => {
    console.log(data);

    const { userId, password } = data;

    const result = await signIn("credentials", {
      userId,
      password,
      redirect: false,
    });

    if (result?.error === "") {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    } else {
      router.replace("/");
    }

    console.log(result);
    // try {
    //   const res = await fetch("http://localhost:3000/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const ok: UserResponse = await res.json();

    //   if (!ok.success) {
    //     alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    //   } else {
    //     router.replace("/");
    //   }

    //   // 리액트 핫도그? 메세지 알려주는 라이브러리 확인해보기.
    // } catch (error) {
    //   console.error("로그인 오류!!!");
    // }
  };

  const SignPage = () => {
    router.push("/sign");
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <LoginForm onSubmit={handleSubmit(LogIn)}>
        <InputArea>
          <InputBox
            {...register("userId", {
              required: "아이디를 입력해주세요.",
              minLength: {
                value: 4,
                message: "아디가 너무 짧습니다. 4글자 이상 입력해주세요",
              },
            })}
            name="userId"
            placeholder="아이디"
            type="text"
          />
          <ErrorMessage>{errors.userId?.message}</ErrorMessage>
          <InputBox
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            name="password"
            placeholder="비밀번호"
            type="password"
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputArea>
        <ButtonArea>
          <SubmitBtn type="submit">로그인</SubmitBtn>
          <SignBtn type="button" onClick={SignPage}>
            회원가입
          </SignBtn>
        </ButtonArea>
      </LoginForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  font-size: x-large;
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
  height: 300px;
`;

const InputArea = styled.div`
  margin-bottom: 25px;
`;

const InputBox = styled.input`
  outline: none;
  border: 1px solid #dcdde1;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  margin-left: 15px;
  height: 20px;
  font-size: small;
  color: red;
  align-self: self-start;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  height: 100px;
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

const SignBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-color: #747d8c;
  color: white;
  font-size: large;
  &:hover {
    transition: 0.2s;
    background-color: #57606f;
  }
`;
