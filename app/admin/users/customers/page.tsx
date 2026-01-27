import Link from "next/link";

export default function AdminCustomersPage() {
  const customers = [
    { id: 1, name: "Retail Co.", email: "cust1@example.com" },
    { id: 2, name: "Wholesale Hub", email: "cust2@example.com" },
  ];

  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer accounts.</p>
        </div>
      </header>

      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-600">Name</th>
              <th className="px-4 py-3 text-sm text-gray-600">Email</th>
              <th className="px-4 py-3 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3"> <Link href="#" className="text-sm text-[#7c3aed]">View</Link> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
