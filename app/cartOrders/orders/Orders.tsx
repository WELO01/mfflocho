"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Package,
  Repeat
} from "lucide-react";
 // 👈 importa tu hook real
import { Order, useGetUserOrdersQuery } from "../CartOrders.api";

export default function OrdersPage() {
  // 🚀 Petición al backend
  const { data, isLoading, isError } = useGetUserOrdersQuery();

  // Estados de carga
  if (isLoading)
    return (
      <section className="min-h-screen flex items-center justify-center text-cyan-400 text-xl">
        🔄 Loading your orders...
      </section>
    );

  if (isError)
    return (
      <section className="min-h-screen flex items-center justify-center text-red-400 text-xl">
        ❌ Failed to load orders.
      </section>
    );

  const orders = data?.orders || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-400 bg-yellow-800/20";
      case "PROCESSING":
        return "text-blue-400 bg-blue-800/20";
      case "SHIPPED":
        return "text-cyan-400 bg-cyan-800/20";
      case "DELIVERED":
        return "text-green-400 bg-green-800/20";
      case "CANCELLED":
        return "text-red-400 bg-red-800/20";
      default:
        return "text-gray-300 bg-gray-700/20";
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center flex items-center justify-center gap-2">
          <Package className="w-8 h-8 text-cyan-300" /> My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400">No orders found.</p>
        ) : (
          <div className="grid gap-8">
            {orders.map((order:Order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-cyan-800/30 rounded-2xl shadow-lg hover:shadow-cyan-700/20 transition overflow-hidden"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-cyan-950/40 p-4 border-b border-cyan-800/40">
                  <div className="text-lg font-semibold">
                    Order{" "}
                    <span className="text-cyan-400">
                      #{order.orderNumber}
                    </span>
                  </div>
                  <span
                    className={`text-sm px-4 py-1 rounded-full font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                  <img
                    src={
                      
                      "https://imagoimpresiones.com/wp-content/uploads/2018/10/cuadros-personalizados-imago-impresiones-lima-san-isidro-miraflores-peru-60-1000x1000.jpg"
                    }
                    alt={order.serviceType || order.type}
                    className="w-40 h-40 object-cover rounded-xl border border-cyan-900/50"
                  />

                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-semibold text-cyan-300 mb-2">
                      {order.serviceType
                        ? order.serviceType.replace("_", " ")
                        : order.type.replace("_", " ")}
                    </h3>
                    

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                      {/* campos estras
                      <p className="text-gray-400">
                        <CreditCard className="inline-block w-4 h-4 mr-1 text-cyan-400" />
                        {order.paymentMethod || "N/A"}
                      </p>
                      <p className="text-gray-400">
                        <Truck className="inline-block w-4 h-4 mr-1 text-cyan-400" />
                        {order.shippingProvider || "N/A"}
                      </p>
                      <p className="text-gray-400">
                        <Clock className="inline-block w-4 h-4 mr-1 text-cyan-400" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>*/}
                    </div>

                    <p className="mt-3 text-lg font-semibold text-cyan-400">
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 border-t border-cyan-800/40 p-4 bg-cyan-950/30">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition">
                    <FileText className="w-4 h-4" /> View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white font-semibold transition">
                    <Repeat className="w-4 h-4" /> Reorder
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
