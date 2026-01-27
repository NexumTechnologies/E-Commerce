import Link from "next/link";

export default function AdminSellersPage() {
  const sellers = [
    { id: 1, name: "Best Sellers Ltd.", email: "seller1@example.com", status: "Pending" },
    { id: 2, name: "Top Supplies", email: "seller2@example.com", status: "Approved" },
  ];

  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Sellers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage seller accounts, profiles and approvals.</p>
        </div>
        <div>
          <Link href="/admin/approvals/sellers" className="text-sm text-[#7c3aed]">View Approvals</Link>
        </div>
      </header>

      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-600">Name</th>
              <th className="px-4 py-3 text-sm text-gray-600">Email</th>
              <th className="px-4 py-3 text-sm text-gray-600">Status</th>
              <th className="px-4 py-3 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.status}</td>
                <td className="px-4 py-3"> <Link href="#" className="text-sm text-[#7c3aed]">View</Link> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
