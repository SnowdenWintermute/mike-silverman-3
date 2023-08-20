"use client";
import "./styles/globals.scss";
import type { Metadata } from "next";
import store, { wrapper } from "./redux/store";
import { Providers } from "./redux/provider";
import ReduxControlledUIElements from "./layouts/ReduxControlledUIElements";

// export const metadata: Metadata = {
//   title: "Mike Silverman",
//   description: "Developer Portfolio",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="default">
      <body>
        <Providers>
          <ReduxControlledUIElements>{children}</ReduxControlledUIElements>
        </Providers>
      </body>
    </html>
  );
}
