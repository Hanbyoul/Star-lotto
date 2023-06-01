"use client";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import React from "react";

interface IForm {
  id: string;
  password: string;
  passwordConfirm: string;
}

const LoginFrom = () => {
  const { register, watch, handleSubmit, formState, setError } =
    useForm<IForm>();

  const onSubmit = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        {
          message: "비밀번호가 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
    } else {
      console.log("data?", data);
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.redirected) {
            window.location.href = res.url;
          }
        })
        .catch((error) => {
          console.error("에러발생", error);
        });

      console.log("정상 요청");
    }
  };

  const { errors } = formState;

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage>{errors.id ? errors.id?.message : null}</ErrorMessage>
        <InputBox
          {...register("id", {
            required: "아이디를 입력해주세요.",
            minLength: {
              value: 4,
              message: "아이디가 너무 짧습니다. 4글자 이상 입력해 주세요",
            },
            maxLength: {
              value: 16,
              message: "최대 16글자로 입력해 주세요",
            },
          })}
          name="id"
          placeholder="아이디"
          type="text"
        />
        <ErrorMessage>
          {errors.password ? errors.password?.message : null}
        </ErrorMessage>

        <InputBox
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
              message: "문자,특수문자,숫자를 조합하여 8~20 글자로 입력해주세요",
            },
          })}
          name="password"
          placeholder="비밀번호"
          type="password"
        />

        <ErrorMessage>
          {errors.passwordConfirm ? errors.passwordConfirm?.message : null}
        </ErrorMessage>
        <InputBox
          {...register("passwordConfirm", {
            required: true,
          })}
          placeholder="비밀번호 확인"
          type="password"
        />
        <SubmitBtn type="submit">가입하기</SubmitBtn>
      </LoginForm>
    </Wrapper>
  );
};

export default LoginFrom;

const Wrapper = styled.div`
  /* border: 2px solid black; */
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

const InputBox = styled.input`
  outline: none;
  border: 1px solid #dcdde1;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  height: 20px;
  font-size: small;
  color: red;
  align-self: self-start;
  margin-left: 52px;
`;

const SubmitBtn = styled.button`
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
