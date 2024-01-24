import "./styles/globals.css";
import StyledComponentsRegistry from "./styles/registry";
import Navigation from "./components/Navigation";
import NextAuthProviders from "./UserAuth/NextAuthProviders";
import Recoil from "./GlobalState/Recoil";

export const metadata = {
  title: "로또번호 뽑기",
  description: "로또번호 생성사이트입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <NextAuthProviders>
            <Navigation />
            <div className="container">
              <Recoil>{children}</Recoil>
            </div>
          </NextAuthProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
