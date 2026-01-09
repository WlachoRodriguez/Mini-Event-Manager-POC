import "antd/dist/reset.css";

export const metadata = {
  title: "Mini Event Manager POC",
  description: "Mini Event Manager POC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
