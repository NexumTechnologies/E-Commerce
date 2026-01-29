"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function AdminUsersAdminsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const size = 10;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", "admin", page, size, debouncedSearch],
    queryFn: async () => {
      const resp = await api.get(`/users`, {
        params: { role: "admin", page, size, search: debouncedSearch },
      });
      return resp.data;
    },
  });

  const users = data?.data?.items || [];
  const pagination = data?.data?.pagination || {};
  const total = pagination.totalItems || 0;
  const start = total === 0 ? 0 : (page - 1) * size + 1;
  const end = Math.min(page * size, total || 0);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform administrators and roles.</p>
        </div>
        <div>
          <Link href="#" className="text-sm text-[#7c3aed]">Add Admin</Link>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">Failed to load admins</div>
        ) : (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="text-sm text-gray-600">Showing {start}-{end} of {total}</div>
              <div className="flex items-center gap-2">
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search by name or email"
                  className="px-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>

            <div className="p-4">
              <ul className="divide-y">
                {users.map((u: any) => (
                  <li key={u.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
                        {u.profile_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={u.profile_image} alt={u.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          initials(u.name)
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-sm text-gray-500">{u.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">{u.role}</div>
                      <button
                        onClick={async () => {
                          setModalOpen(true);
                          setSelectedUser(null);
                          try {
                            const resp = await api.get(`/users/${u.id}`);
                            setSelectedUser(resp.data?.data || resp.data);
                          } catch (err) {
                            setSelectedUser({ error: true, message: 'Failed to load details' });
                          }
                        }}
                        className="inline-flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Total: {total}</div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1 border rounded bg-gray-50">Page {page}</span>
                <button
                  disabled={page >= Math.ceil((total || 0) / size)}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 z-10">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Admin details</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>

            <div className="mt-4">
              {!selectedUser ? (
                <div className="text-center py-6">Loading details...</div>
              ) : selectedUser.error ? (
                <div className="text-red-600">{selectedUser.message || 'Failed to load'}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{selectedUser.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{selectedUser.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Role</div>
                    <div className="font-medium">{selectedUser.role}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Verified</div>
                    <div className="font-medium">{selectedUser.is_varified ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
