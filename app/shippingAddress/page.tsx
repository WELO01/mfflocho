/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import Closer from "../components/utils/Closer";
import { AddressCard } from "./AddressCard";
import ShippingAddressForm from "./ShippingAddressForm";
import { useCreateAddressMutation, useDeleteAddressMutation, useGetAddressesQuery, useSetPrimaryAddressMutation, useUpdateAddressMutation } from "./shippingAddress.Api";


export default function ShippingAddressesPage() {
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery();
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setPrimaryAddress] = useSetPrimaryAddressMutation();

  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState<any | null>(null);

  // Crear o actualizar dirección
  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (editAddress) {
        await updateAddress({ id: editAddress.id, data }).unwrap();
        setEditAddress(null);
      } else {
        await createAddress(data).unwrap();
      }
      await refetch();
      setShowForm(false);
    } catch (err) {
      console.error("❌ Error saving address:", err);
    }
  };

  // Eliminar dirección
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      await deleteAddress(id).unwrap();
      await refetch();
    }
  };

  // Editar dirección
  const handleEdit = (id: string) => {
    const addr = addresses?.find((a) => a.id === id);
    if (addr) {
      setEditAddress(addr);
      setShowForm(true);
    }
  };

  // Marcar como predeterminada
  const handleSetPrimary = async (id: string) => {
    await setPrimaryAddress({ id }).unwrap();
    await refetch();
  };

  return (
    <div>
      <Closer to="/" />
      <section className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center flex items-center justify-center gap-2">
            <MapPin className="w-8 h-8 text-cyan-300" /> Shipping Addresses
          </h1>

          {/* 📦 Lista de direcciones */}
          {isLoading ? (
            <p className="text-center text-gray-400">Loading addresses...</p>
          ) : (
            <div className="space-y-4 mb-8">
              {!addresses || addresses.length === 0 ? (
                <p className="text-gray-400 text-center">
                  You don’t have any addresses yet.
                </p>
              ) : (
                addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSetPrimary={handleSetPrimary}
                  />
                ))
              )}
            </div>
          )}

          {/* ➕ Botón agregar */}
          {!showForm && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold transition"
              >
                <Plus className="w-5 h-5" /> Add Address
              </button>
            </div>
          )}

          {/* 🧾 Formulario con animación */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <ShippingAddressForm
                  onSubmit={handleCreateOrUpdate}
                  defaultValues={editAddress || undefined}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
