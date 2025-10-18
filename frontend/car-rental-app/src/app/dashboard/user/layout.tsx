import DashboardWrapper from "../_components/DashboardWrapper";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <DashboardWrapper role="user">{children}</DashboardWrapper>
    </div>
  );
}