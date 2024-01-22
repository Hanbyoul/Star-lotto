"use client";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { Session } from "../Navigation";
import handleAlertError from "@/app/utils/handleAlertError";

export interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface ResponseMessage {
  message: string;
}

export default function AccountSettings() {
  const { data } = useSession();
  const session = data as Session;
  const { register, handleSubmit, formState, setError } =
    useForm<PasswordForm>();
  const { errors } = formState;
  const PasswordChange = async (data: PasswordForm) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      setError(
        "newPasswordConfirm",
        {
          message: "새 비밀번호와 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
    } else if (data.oldPassword === data.newPassword) {
      setError(
        "newPassword",
        {
          message: "현재 비밀번호와 동일한 비밀번호입니다.",
        },
        { shouldFocus: true }
      );
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/pw_change`,
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
          throw new Error(
            result.message || "비밀번호 변경중 문제가 발생했습니다."
          );
        }

        if (res.status === 200) {
          alert(result.message);
          signOut();
        }
      } catch (error) {
        handleAlertError(error);
      }
    }
  };

  const AccountDelete = async () => {
    try {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        const res = await fetch(`${process.env.BASE_URL}/auth/delete`, {
          method: "DELETE",
        });
        const result: ResponseMessage = await res.json();

        if (!res.ok) {
          throw new Error(
            result.message || "탈퇴 처리 중 문제가 발생했습니다."
          );
        }

        if (res.status === 200) {
          alert(result.message);
          signOut();
        }
      }
    } catch (error) {
      handleAlertError(error);
    }
  };

  return (
    <Container>
      <UserInfoArea>
        <h1 className="font-bold">{session.user?.userId}</h1>
        <span className="mt-2 text-gray-400">
          가입일 : {session.user?.createAt.toString().substring(0, 10)}
        </span>
      </UserInfoArea>
      <PasswordArea>
        <div className="font-bold mb-6">비밀번호 변경</div>
        <PasswordForm onSubmit={handleSubmit(PasswordChange)}>
          <InputArea>
            <TextArea>현재 비밀번호</TextArea>
            <InputBox
              {...register("oldPassword", {
                required: "비밀번호를 입력해주세요",
              })}
              name="oldPassword"
              type="password"
              autoComplete="off"
            />
          </InputArea>
          <ErrorMessage>{errors.oldPassword?.message}</ErrorMessage>
          <InputArea>
            <TextArea>새 비밀번호</TextArea>
            <InputBox
              {...register("newPassword", {
                required: "비밀번호를 입력해주세요",
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                  message:
                    "문자,특수문자,숫자를 조합하여 8~20 글자로 입력해주세요",
                },
              })}
              name="newPassword"
              type="password"
              autoComplete="off"
            />
          </InputArea>
          <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
          <InputArea>
            <TextArea>비밀번호 확인</TextArea>
            <InputBox
              {...register("newPasswordConfirm", {
                required: "비밀번호를 입력해주세요",
              })}
              name="newPasswordConfirm"
              type="password"
              autoComplete="off"
            />
          </InputArea>
          <ErrorMessage>{errors.newPasswordConfirm?.message}</ErrorMessage>
          <SubmitBtn type="submit">저장하기</SubmitBtn>
        </PasswordForm>
      </PasswordArea>
      <FooterArea>
        <AccountDeletion onClick={AccountDelete}>회원탈퇴</AccountDeletion>
      </FooterArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const PasswordArea = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: solid 1px #e5e7eb;
  border-bottom: solid 1px #e5e7eb;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextArea = styled.div`
  color: rgb(107 114 128);
  width: 110px;
`;
const InputBox = styled.input`
  outline: none;
  border: 1px solid #dcdde1;
  width: 200px;
  height: 20px;
  border-radius: 10px;
  padding: 15px;
`;

const ErrorMessage = styled.p`
  margin-left: 220px;
  width: 310px;
  height: 22px;
  font-size: small;
  color: red;
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 40px;
  border-radius: 12px;
  background-color: #5f94f6;
  color: white;
  font-size: large;
  align-self: center;
  &:hover {
    transition: 0.2s;
    background-color: #4380f3;
  }
`;

const FooterArea = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 50px;
`;
const AccountDeletion = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 40px;
  border-radius: 12px;
  background-color: #747d8c;
  color: white;
  font-size: large;
  align-self: center;
  &:hover {
    transition: 0.2s;
    background-color: #57606f;
  }
`;
