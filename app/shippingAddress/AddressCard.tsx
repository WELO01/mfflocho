"use client";

import { motion } from "framer-motion";
import { Home, Pencil, Star, Trash2 } from "lucide-react";

interface AddressCardProps {
  address: {
    id: string;
    fullName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    primary?: boolean;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

export function AddressCard({ address, onEdit, onDelete, onSetPrimary }: AddressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 border border-cyan-700/30 p-5 rounded-xl shadow-md flex justify-between items-start hover:border-cyan-500/50 transition"
    >
      <div className="flex items-start gap-3">
        <div className="bg-cyan-500/20 p-2 rounded-lg">
          <Home className="text-cyan-400 w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white flex items-center gap-1">
            {address.fullName}
            {address.primary && (
              <span className="ml-2 text-sm text-green-400 font-medium">(Default)</span>
            )}
          </h3>
          <p className="text-gray-300 text-sm">
            {address.address}, {address.city}, {address.state} {address.zip}
          </p>
          <p className="text-gray-400 text-sm">{address.country}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(address.id)}
          className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {!address.primary && (
          <button
            onClick={() => onSetPrimary(address.id)}
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition"
          >
            <Star className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
