import Recoil from "@/store/Recoil";
import "./styles/globals.css";
import StyledComponentsRegistry from "./styles/registry";

export const metadata = {
  title: "Lotto 번호 뽑기",
  description: "로또 번호 추출기입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="container">
          <div className="flex justify-center" style={{ margin: "10px auto" }}>
            <img src="/logo.png" alt="logo" width={"270px"} />
          </div>
          <Recoil>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </Recoil>
        </div>
      </body>
    </html>
  );
}
