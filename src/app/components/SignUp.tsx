"use client";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface IForm {
  userId: string;
  password: string;
  passwordConfirm: string;
}

export interface UserResponse {
  success: boolean;
  status: number;
}

const SignUp = () => {
  const { register, watch, handleSubmit, formState, setError } =
    useForm<IForm>();
  const router = useRouter();
  const [idChk, setIdChk] = useState(false);

  const PageBack = () => {
    router.back();
  };

  const UserDuplicateChk = async () => {
    const userId = watch("userId");

    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    const ok: UserResponse = await res.json();

    if (ok.success) {
      setIdChk(true);
      alert("사용 가능한 아이디입니다.");
    } else {
      alert("이미 사용중인 아이디입니다.");
    }
  };

  const onSubmit = async (data: IForm) => {
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
          const res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const ok: UserResponse = await res.json();
          if (ok.success) {
            router.push("/login");
          }
        } catch (error) {
          console.error("가입 오류!!!", error);
        }
      }
    }
  };

  const { errors } = formState;

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <IdArea>
          <InputIDBox
            {...register("userId", {
              required: "아이디를 입력해주세요.",
              minLength: {
                value: 4,
                message: "아이디가 너무 짧습니다. 4글자 이상 입력해주세요",
              },
              maxLength: {
                value: 16,
                message: "최대 16글자로 입력해 주세요",
              },
            })}
            name="userId"
            placeholder="아이디"
            type="text"
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
        />
        <ErrorMessage>
          {errors.passwordConfirm ? errors.passwordConfirm?.message : null}
        </ErrorMessage>
        <BtnArea>
          <BackBtn type="button" onClick={PageBack}>
            뒤로가기
          </BackBtn>
          <SubmitBtn type="submit">가입하기</SubmitBtn>
        </BtnArea>
      </SignUpForm>
    </Wrapper>
  );
};

export default SignUp;

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
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
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
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: space-around;
`;
