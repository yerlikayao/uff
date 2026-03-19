import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UFF — US Form Filling | IRS Form Filling Made Simple",
  description:
    "Fill and generate IRS tax forms for your US company. Built for international founders and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
