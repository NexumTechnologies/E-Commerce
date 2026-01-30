export interface AdminOrder {
  id: number;
  status: string;
  total_amount: number;
  quantity?: number;
  base_unit_price?: number | null;
  admin_earning?: number;
  admin_earning_amount?: number;
  address: string;
  createdAt: string;
  updatedAt?: string;
  User?: { id: number; name: string; email: string } | null; // buyer
  Seller?: { id: number; name: string; email: string } | null; // seller
  Product?: { id: number; name: string; price: number; image_url?: string | null } | null;
}
