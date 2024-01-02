import Recoil from "@/store/Recoil";
import "./styles/globals.css";
import StyledComponentsRegistry from "./styles/registry";
import Navigation from "./components/Navigation";
import { SessionContext, SessionProvider } from "next-auth/react";
import Providers from "./components/Providers";

export const metadata = {
  title: "로또번호 뽑기",
  description: "로또번호 생성사이트입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          <Navigation />
          <div className="container">
            <Recoil>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </Recoil>
          </div>
        </Providers>
      </body>
    </html>
  );
}
