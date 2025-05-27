import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GetUser, DeleteUserById } from "@/services/task-by-admin";
import { useQuery, useMutation } from "@tanstack/react-query";

const UserManage = () => {
  const [users, setUsers] = useState([]);

  const { data: usersData, isLoading, refetch } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: GetUser,
    refetchInterval: 10000, // Auto refetch every 10 seconds
    refetchOnWindowFocus: true, // Also refetch on window focus
  });

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
      console.log(usersData);
    }
  }, [usersData]);

  const { mutate: deleteUser } = useMutation({
    mutationFn: (userId) => DeleteUserById(userId),
    onSuccess: () => {

      // Refresh the user list after successful deletion
      refetch();

    },
  });

  if (isLoading) {
    return <div className="text-white p-8">Loading users...</div>;
  }

  return (
    <div className="bg-zinc-900 text-white p-8 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center">👥 Manage Users</h2>
      <table className="w-full table-auto border-collapse border border-zinc-700">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-zinc-700">User ID</th>
            <th className="px-4 py-2 border border-zinc-700">Name</th>
            <th className="px-4 py-2 border border-zinc-700">Email</th>
            <th className="px-4 py-2 border border-zinc-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-center py-4 text-zinc-400 border border-zinc-700"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border border-zinc-700 px-4 py-2">{user._id}</td>
                <td className="border border-zinc-700 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-zinc-700 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-zinc-700 px-4 py-2 space-x-2">
                  <Button onClick={() => deleteUser(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;