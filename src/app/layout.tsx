import type { Metadata } from "next";
import { Fira_Code } from "next/font/google"
import "./globals.css";

const firaCode = Fira_Code({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Taskman - A Task Management App",
  description: "Created by RobeeDS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen ${firaCode.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
