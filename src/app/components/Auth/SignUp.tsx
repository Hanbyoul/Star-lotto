"use client";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import handleAlertError from "../../utils/handleAlertError";
import validateUserID from "@/app/utils/validateUserID";

export interface SignUser {
  userId: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

interface ResponseMessage {
  message: string;
}

const SignUp = () => {
  const { register, watch, handleSubmit, formState, setError } =
    useForm<SignUser>();
  const router = useRouter();
  const [idChk, setIdChk] = useState(false);

  const PageBack = () => {
    router.back();
  };

  const UserDuplicateChk = async () => {
    const userId = watch("userId");

    if (!validateUserID(userId)) {
      alert("영문 또는 영문+숫자를 조합하여 4~16글자로 입력해주세요.");
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userId),
          }
        );

        const result: ResponseMessage = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "서버 오류가 발생했습니다.");
        }
        setIdChk(true);
        alert(result.message);
      } catch (error) {
        handleAlertError(error);
      }
    }
  };

  const onSubmit = async (data: SignUser) => {
    if (!idChk) {
      alert("아이디 중복확인을 해주세요");
    } else {
      if (data.password !== data.passwordConfirm) {
        setError(
          "passwordConfirm",
          {
            message: "비밀번호가 일치하지 않습니다.",
          },
          { shouldFocus: true }
        );
      } else {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
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
      }
    }
  };

  const { errors } = formState;

  return (
    <Container>
      <Title>회원가입</Title>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <IdArea>
          <InputIDBox
            {...register("userId", {
              required: "아이디를 입력해주세요.",
              pattern: {
                value: /^[A-Za-z0-9]{4,16}$/,
                message:
                  "영문 또는 영문+숫자를 조합하여 4~16글자로 입력해주세요.",
              },
            })}
            name="userId"
            placeholder="아이디"
            type="text"
            autoComplete="off"
          />
          <ChkBtn type="button" onClick={UserDuplicateChk}>
            중복확인
          </ChkBtn>
        </IdArea>
        <ErrorMessage>
          {errors.userId ? errors.userId?.message : null}
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
          autoComplete="off"
        />
        <ErrorMessage>
          {errors.password ? errors.password?.message : null}
        </ErrorMessage>

        <InputBox
          {...register("passwordConfirm", {
            required: "비밀번호를 확인 해주세요",
          })}
          placeholder="비밀번호 확인"
          type="password"
          autoComplete="off"
        />
        <ErrorMessage>
          {errors.passwordConfirm ? errors.passwordConfirm?.message : null}
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

        <BtnArea>
          <BackBtn type="button" onClick={PageBack}>
            뒤로가기
          </BackBtn>
          <SubmitBtn type="submit">가입하기</SubmitBtn>
        </BtnArea>
      </SignUpForm>
    </Container>
  );
};

export default SignUp;

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
  font-size: x-large;
  font-weight: 500;
  width: 100%;
  border-bottom: 1px solid #dcdde1;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  height: 450px;
  @media screen and (max-width: 705px) {
    width: 360px;
  }
`;

const IdArea = styled.div`
  width: 300px;
  height: 40px;
`;

const InputIDBox = styled.input`
  outline: none;
  border: 1px solid #dcdde1;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  padding: 20px;
`;
const InputBox = styled.input`
  outline: none;
  border: 1px solid #dcdde1;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding: 20px;
`;

const ChkBtn = styled.button`
  margin-left: 20px;
  border: 1px solid #dcdde1;
  font-size: small;
  color: red;
  width: 60px;
  height: 30px;
  border-radius: 10px;
  padding: 0 5px;
  &:hover {
    transition: 0.2s;
    background-color: #ebeaea;
  }
`;

const ErrorMessage = styled.p`
  height: 20px;
  font-size: small;
  color: red;
  align-self: self-start;
  margin-left: 60px;
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  margin-right: 100px;
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

const BackBtn = styled.button`
  margin-top: 30px;
  margin-right: 40px;
  width: 80px;
  height: 40px;
  border-radius: 12px;
  background-color: #747d8c;
  color: white;
  font-size: medium;
  &:hover {
    transition: 0.2s;
    background-color: #57606f;
  }
`;

const BtnArea = styled.div`
  padding-top: 30px;
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: space-around;
`;
