import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center relative">
      <Link href={"/"}>
        <img src="/logo.png" alt="logo" width={"270px"} />
      </Link>
      <div className="absolute right-20 top-5 ">
        <Link href={"/join"} className="mx-5">
          회원가입
        </Link>
        <Link href={"/info"} className="mx-5">
          내정보
        </Link>
      </div>
    </div>
  );
}
