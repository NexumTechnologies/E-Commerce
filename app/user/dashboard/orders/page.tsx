import UserDashboardLayout from "@/components/user-dashboard/UserDashboardLayout";
import OrdersContent from "@/components/user-dashboard/OrdersContent";

export default function OrdersPage() {
  return (
    <UserDashboardLayout>
      <OrdersContent />
    </UserDashboardLayout>
  );
}
