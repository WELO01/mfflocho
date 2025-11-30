"use client";

import { motion } from "framer-motion";
import { Bell, Globe, Lock, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useChangePasswordMutation, useGetUserProfileQuery, useUpdateUserProfileMutation } from "./userSetings.api";


export default function UserSettingsPage() {
  // 🔹 RTK Query hooks
  const { data: user, isLoading, refetch } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // 🔹 Estados locales
  const [language, setLanguage] = useState("EN");
  const [theme, setTheme] = useState("DARK");
  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Actualizar estados al cargar usuario
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(user.userPreferences?.language || "EN");
    }
}, [user]);

// ⚙️ Guardar preferencias
const handleSavePreferences = async () => {
  try {
    await updateUserProfile({
      language: language as "EN" | "ES" | "FR" | "PT",
    }).unwrap();

    alert("✅ Preferences updated successfully!");
    refetch();
  } catch (error) {
    console.error(error);
    alert("❌ Failed to update preferences.");
  }
};

  // 🔐 Cambiar contraseña
  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    try {
      await changePassword({
        currentPassword: prompt("Enter your current password") || "",
        newPassword: password,
      }).unwrap();

      alert("✅ Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("❌ " + (error.data?.message || "Failed to change password."));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-300 text-lg">
        Loading your profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-lg">
        Failed to load user data.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between border-b border-cyan-800/50 pb-4"
        >
          <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
            <User className="w-7 h-7 text-cyan-300" /> User Settings
          </h1>
          <p className="text-sm text-gray-400">
            Email: <span className="text-cyan-300">{user.email}</span>
          </p>
        </motion.div>

        {/* PROFILE INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg border border-cyan-800/40"
        >
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">
            👤 Profile Information
          </h2>
          <div className="space-y-3">
            <p>
              <span className="text-gray-400">Name:</span>{" "}
              <span className="font-semibold">{user.name}</span>
            </p>
            <p>
              <span className="text-gray-400">Email:</span>{" "}
              <span className="font-semibold">{user.email}</span>
            </p>
            <p>
              <span className="text-gray-400">Phone:</span>{" "}
              <span className="font-semibold">
                {user.phoneNumber || "—"}
              </span>
            </p>
          </div>
        </motion.div>

        {/* PREFERENCES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg border border-cyan-800/40"
        >
          <h2 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" /> Preferences
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Preferred Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-cyan-950/50 border border-cyan-800/50 rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="EN">English</option>
                <option value="ES">Español</option>
                <option value="FR">Français</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Theme Preference
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-cyan-950/50 border border-cyan-800/50 rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="DARK">Dark</option>
                <option value="LIGHT">Light</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <input
              id="notifications"
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="accent-cyan-400 w-5 h-5 cursor-pointer"
            />
            <label
              htmlFor="notifications"
              className="text-gray-300 flex items-center gap-2"
            >
              <Bell className="w-4 h-4 text-cyan-400" /> Enable Notifications
            </label>
          </div>

          <div className="text-right mt-6">
            <button
              disabled={isUpdating}
              onClick={handleSavePreferences}
              className="bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-md font-semibold flex items-center gap-2 text-white mx-auto sm:ml-auto sm:mr-0 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isUpdating ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </motion.div>

        {/* PASSWORD SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg border border-cyan-800/40"
        >
          <h2 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" /> Change Password
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-cyan-950/50 border border-cyan-800/50 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-cyan-950/50 border border-cyan-800/50 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div className="text-right mt-6">
            <button
              disabled={isChangingPassword}
              onClick={handlePasswordChange}
              className="bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-md font-semibold flex items-center gap-2 text-white mx-auto sm:ml-auto sm:mr-0 transition disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              {isChangingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
