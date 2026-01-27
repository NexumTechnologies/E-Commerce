import Link from "next/link";

export default function AdminUsersAdminsPage() {
  const admins = [
    { id: 1, name: "Site Admin", email: "admin@example.com", role: "super" },
  ];

  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform administrators and roles.</p>
        </div>
        <div>
          <Link href="#" className="text-sm text-[#7c3aed]">Add Admin</Link>
        </div>
      </header>

      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-600">Name</th>
              <th className="px-4 py-3 text-sm text-gray-600">Email</th>
              <th className="px-4 py-3 text-sm text-gray-600">Role</th>
              <th className="px-4 py-3 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-3">{a.name}</td>
                <td className="px-4 py-3">{a.email}</td>
                <td className="px-4 py-3">{a.role}</td>
                <td className="px-4 py-3"> <Link href="#" className="text-sm text-[#7c3aed]">Edit</Link> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
