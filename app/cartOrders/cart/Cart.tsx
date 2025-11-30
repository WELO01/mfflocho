"use client";

import { useState } from "react";

interface CartItem {
  id: number;
  cartId: number;
  type: string;
  referenceId?: number;
  title: string;
  description?: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  details?: unknown;
  createdAt: string;
  updatedAt: string;
}

// 🧾 Datos temporales de prueba
const mockCart: CartItem[] = [
  {
    id: 1,
    cartId: 1,
    type: "PHOTO_PRINT",
    referenceId: 101,
    title: "Photo Print 8x10",
    description: "Premium matte paper finish",
    image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=400&q=60",
    quantity: 2,
    unitPrice: 4.0,
    subtotal: 8.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    cartId: 1,
    type: "T_SHIRT",
    referenceId: 102,
    title: "Custom T-Shirt",
    description: "Black cotton tee with your design",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=60",
    quantity: 1,
    unitPrice: 15.0,
    subtotal: 15.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCart);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 🧮 Calcular total del carrito
  const total = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.subtotal, 0);

  // 🔹 Incrementar cantidad
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.unitPrice,
            }
          : item
      )
    );
  };

  // 🔹 Disminuir cantidad
  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.unitPrice,
            }
          : item
      )
    );
  };

  // 🗑️ Eliminar artículo
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((sid) => sid !== id));
  };

  // ✅ Seleccionar/deseleccionar artículo
  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // 💳 Simular pago
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to pay.");
      return;
    }
    alert(`Proceeding to pay $${total.toFixed(2)} for ${selectedItems.length} item(s).`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white py-10 px-6">
     {/* <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center flex items-center justify-center gap-2">
          <ShoppingCart className="w-8 h-8 text-cyan-300" /> Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col md:flex-row items-center justify-between gap-6 bg-white/10 rounded-2xl p-4 shadow-md hover:shadow-cyan-600/10 transition ${
                  selectedItems.includes(item.id)
                    ? "ring-2 ring-cyan-400"
                    : "ring-1 ring-cyan-900/40"
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="accent-cyan-400 w-5 h-5 cursor-pointer"
                  />

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl border border-cyan-800/40"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-300">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                    <p className="text-sm mt-1">
                      Unit Price:{" "}
                      <span className="text-cyan-400 font-semibold">
                        ${item.unitPrice.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-cyan-900/40 rounded-md px-3 py-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-1 hover:text-cyan-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-1 hover:text-cyan-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-cyan-300 font-semibold text-lg">
                    ${item.subtotal.toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* TOTAL Y BOTÓN DE PAGO */}
        {/*    <div className="flex flex-col md:flex-row justify-between items-center bg-cyan-900/20 rounded-2xl p-5 mt-10 border border-cyan-800/40">
              <div className="text-lg font-semibold text-white">
                Total:{" "}
                <span className="text-cyan-400 text-2xl">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className={`mt-4 md:mt-0 flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white text-lg transition shadow-lg ${
                  selectedItems.length > 0
                    ? "bg-cyan-500 hover:bg-cyan-400 hover:shadow-cyan-500/30"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                <CreditCard className="w-5 h-5" /> Pay Now
              </button>
            </div>
          </div>
        )}
      </div> */}
    </section>
  );
}
