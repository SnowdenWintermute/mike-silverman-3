import "./styles/globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mike Silverman",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="default">
      <body>{children}</body>
    </html>
  );
}
