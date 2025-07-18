"use client";
import axios from 'axios';
import Link from 'next/link';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';



export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("nothing");

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            console.log(response.data);
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/user');
        console.log(res.data);
        setData(res.data.data._id);
        toast.success('User details fetched successfully');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="text-gray-900 font-mono text-2xl mb-4 font-bold tracking-wider outline outline-offset-2">
                {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button 
            onClick={getUserDetails}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               getUserDetails</button>

            <button 
            onClick={logout}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold my-5 py-2 px-4 rounded">
                Logout</button>
        </div>
    )
}