import { useState } from "react";
import UserTable from "../components/users/UserTable";
import UserDetailModal from "../components/users/UserDetailModal";

export default function Users() {
  const users = [
    {
      id: "fd34848a",
      email: "nibm@gmail.com",
      role: "customer",
      is_active: true,
      date_joined: "2026-04-25",
    },
    {
      id: "fhg4848a",
      email: "nib@gmail.com",
      role: "customer",
      is_active: true,
      date_joined: "2026-04-25",
    },
    {
      id: "fdgh848a",
      email: "nibt@gmail.com",
      role: "admin",
      is_active: true,
      date_joined: "2026-04-12",
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <UserTable data={users} onView={handleView} />

      <UserDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}