"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/themeprovider";

export default function ProfilePage() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/user");
        setUser(res.data.data);
        setUpdatedUsername(res.data.data.username);
        setUpdatedEmail(res.data.data.email);
        setPreviewImage(res.data.data.profileImage || null);
      } catch {
        toast.error("Unauthorized. Redirecting...");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.patch("/api/users/updatedetails", {
        username: updatedUsername,
        email: updatedEmail,
        profileImage: previewImage || user?.profileImage,
      });
      setUser(res.data.data);
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmNewPassword) return toast.error("Passwords do not match");
    if (!oldPassword || !newPassword || !confirmNewPassword) return toast.error("All fields required");
    if (oldPassword === newPassword) return toast.error("New password cannot match old password");

    try {
      toast.loading("Updating password...");
      await axios.patch("/api/users/resetpassword", { oldPassword, newPassword });
      toast.dismiss();
      toast.success("Password updated!");
      setOldPassword(""); setNewPassword(""); setConfirmNewPassword("");
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.response?.data?.error || "Update failed");
    }
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const CLOUD_NAME = "dp46e5w7r";
    const UPLOAD_PRESET = "profilepicture";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      toast.loading("Uploading...");
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      setPreviewImage(res.data.secure_url);
      toast.dismiss();
      toast.success("Image updated!");
    } catch {
      toast.dismiss();
      toast.error("Upload failed");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out!");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-50 dark:bg-gray-900`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-orange-600 dark:bg-orange-700 shadow sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-white">Foody | Profile</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleDarkMode(!darkMode)}
            className="text-white text-xl"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl md:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-orange-100 dark:bg-gray-800 shadow-md p-6 space-y-4 text-center">
          <Link href="/orders" className="block text-orange-700 font-semibold hover:underline">Orders</Link>
          <Link href="/favorites" className="block text-orange-700 font-semibold hover:underline">Favorites</Link>
          <button
            onClick={() => { setEditMode(true); setMenuOpen(false); }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => { setMenuOpen(false); document.getElementById("password-section")?.scrollIntoView({ behavior: "smooth" }); }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition"
          >
            Change Password
          </button>
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      )}

      <main className="flex flex-col items-center px-4 py-10">
        {/* Profile Card */}
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              {/* Profile Image */}
              <div className="flex justify-center">
                <img
                  src={previewImage || user?.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover shadow-md"
                />
              </div>

              {/* Info Section */}
              {editMode ? (
                <div className="space-y-4 text-gray-900 dark:text-white">
                  <div>
                    <label>Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full mt-2 text-sm file:cursor-pointer file:rounded file:border-0 file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 dark:file:bg-gray-700 dark:file:text-white"
                    />
                  </div>
                  <div>
                    <label>Username</label>
                    <input
                      type="text"
                      value={updatedUsername}
                      onChange={(e) => setUpdatedUsername(e.target.value)}
                      className="w-full p-2 rounded border dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      className="w-full p-2 rounded border dark:bg-gray-700"
                    />
                  </div>
                  <button
                    onClick={handleUpdateProfile}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-gray-900 dark:text-white space-y-2">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition"
                  >
                    Edit Profile
                  </button>
                </div>
              )}

              {/* Password Section */}
              <div id="password-section" className="mt-6">
                <h3 className="text-lg font-semibold text-orange-600 mb-2">Change Password</h3>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mb-2 p-2 rounded border dark:bg-gray-700"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mb-2 p-2 rounded border dark:bg-gray-700"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full mb-2 p-2 rounded border dark:bg-gray-700"
                />
                <button
                  onClick={handlePasswordReset}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                >
                  Update Password
                </button>
              </div>

              {/* Logout for desktop */}
              <button
                onClick={logout}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition hidden md:block"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-orange-600 text-white mt-10">
        &copy; {new Date().getFullYear()} Foody. All rights reserved.
      </footer>
    </div>
  );
}
