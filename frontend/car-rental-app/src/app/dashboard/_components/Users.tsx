import { useState, useEffect } from "react";
import { columns } from "./UserColumn";
import { UserResponse } from "@/types/dashboard";
import { DataTable } from "./DataTable";
import { getAllUsers } from "@/api/resource/dashboard";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-muted-foreground text-lg">Loading users...</p>;

  return (
    <div className="px-7">
      <h2 className="text-xl font-semibold mb-10">Manage Users</h2>

      <DataTable
        columns={columns}
        data={users}
      />
    </div>
  );
};

export default Users;
