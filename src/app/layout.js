import "./globals.css";

export const metadata = {
  title: "Mahmoud and Lamis - Wedding Ceremony",
  description: "Invite Wedding's Day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
