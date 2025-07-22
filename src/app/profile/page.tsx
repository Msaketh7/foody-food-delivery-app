"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Check authentication on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/users/user');
                setUser(res.data.data);
                setUpdatedUsername(res.data.data.username);
                setUpdatedEmail(res.data.data.email);
            } catch (error) {
                toast.error("Unauthorized. Redirecting to login...");
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out');
            router.push('/login');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await axios.patch('/api/users/updatedetails', {
                username: updatedUsername,
                email: updatedEmail,
            });
            setUser(res.data.data);
            setEditMode(false);
            toast.success("Profile updated!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Update failed");
        }
    };

    const handlePasswordReset = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      toast.loading("Updating password...");
      const res = await axios.patch("/api/users/resetpassword", {
        oldPassword,
        newPassword,
      });

      toast.dismiss();
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Password update failed.");
    }
  };


    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const CLOUD_NAME = 'dp46e5w7r'; 
    const UPLOAD_PRESET = 'profilepicture';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset',  UPLOAD_PRESET);

    try {
        toast.loading("Uploading...");
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);   
        const imageUrl = res.data.secure_url;
        setPreviewImage(imageUrl);

        toast.dismiss();
        toast.success("Image updated!");
    } catch (error: any) {
        toast.dismiss();
        toast.error(error?.response?.data?.message || "Upload failed");
    }
};


    return (
        <div className={`${darkMode ? 'dark'  : ''}`}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition px-4">
                <button
                            onClick={() => setDarkMode(!darkMode)}
                            className= {` ${darkMode ? 'text-white-700 bg-gray-700' : 'text-white-700 bg-gray-700'} text-sm px-2 py-1   rounded align-items-top-right absolute top-6 right-10 transition-colors duration-300`}>
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 pt-4 w-full max-w-md text-gray-800 dark:text-gray-200">
                    {/* Header */}
                    <div className="flex items-center  justify-center mb-4">
                        <h1 className={` ${!darkMode ? 'text-white bg-gray-700' : ''} text-2xl font-bold bg-gray-700 p-2 rounded-lg font-mono`}>Profile</h1>
                    </div>

                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        </div>
                    ) : (
                        <>
                            {/* Profile Image */}
                            <div className="flex flex-col items-center mb-4">
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-2 text-sm"
                                />
                            </div>

                            {/* Profile Info or Edit Mode */}
                            {editMode ? (
                                <div >
                                    <div>
                                        <label className="text-sm font-medium font-mono ">Username</label>
                                        <input
                                            type="text"
                                            value={updatedUsername}
                                            onChange={(e) => setUpdatedUsername(e.target.value)}
                                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium font-mono">Email</label>
                                        <input
                                            type="email"
                                            value={updatedEmail}
                                            onChange={(e) => setUpdatedEmail(e.target.value)}
                                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 font-mono"
                                        />
                                    </div>
                                    <div className='text-sm font-mono flex flex-col'>
                                        <h2 className="font-semibold text-xl m-2 text-center">Reset Password</h2>
                                        <input
                                        type="password"
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="input border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
                                        />
                                        <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="nput border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
                                        />
                                        <input
                                        type="text"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className="nput border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
                                        />
                                        <button onClick={handlePasswordReset} className="btn btn-primary mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded">
                                            Update Password
                                            </button>
                                            </div>
                                    <button
                                        onClick={handleUpdateProfile}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded mt-2 ">
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded mt-2">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3 text-sm font-mono">
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                            )}

                            {/* Buttons */}
                            {!editMode && (
                                <div className="flex flex-col space-y-3 mt-6">
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-mono">
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmLogout(true)}
                                        className="bg-gray-700 hover:bg-gray-500 text-white py-2 rounded font-mono">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showConfirmLogout && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm text-center space-y-4">
                        <h2 className= {`${!darkMode ? 'text-gray-700 bg-white-700' : ''}text-lg font-semibold`} >Are you sure you want to logout?</h2>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowConfirmLogout(false)}
                                className="px-4 py-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-400 rounded font-medium">
                                Cancel
                            </button>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-blue-500 hover:bg-red-600 text-white rounded font-medium">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
