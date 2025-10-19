const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white p-6 rounded-lg border">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-semibold text-gray-900">{value}</p>
  </div>
);

const Dashboard = () => {
  return <div className="py-5">Dashboard</div>;
};

export default Dashboard;
