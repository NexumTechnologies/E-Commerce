import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome, Admin</div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value="1,234" />
        <Card title="Pending Approvals" value="12" highlight />
        <Card title="Active Sellers" value="321" />
        <Card title="Total Orders" value="4,567" />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>Seller <strong>ABC Traders</strong> submitted a new product for approval.</li>
            <li>Buyer <strong>john@example.com</strong> registered.</li>
            <li>Order <strong>#10234</strong> was placed by <em>mary</em>.</li>
          </ul>
        </section>

        <aside className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Quick Links</h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/approvals/sellers" className="text-sm text-[#7c3aed]">Seller Approvals</Link>
            <Link href="/admin/products" className="text-sm text-[#7c3aed]">All Products</Link>
            <Link href="/admin/orders/pending" className="text-sm text-[#7c3aed]">Pending Orders</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Card({ title, value, highlight }: { title: string; value: string; highlight?: boolean }) {
  return (
    <div className={`bg-white rounded-lg shadow p-5 ${highlight ? "border-l-4 border-amber-400" : ""}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
