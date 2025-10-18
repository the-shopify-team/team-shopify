import DashboardWrapper from "../_components/DashboardWrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardWrapper role="admin">{children}</DashboardWrapper>
  );
}