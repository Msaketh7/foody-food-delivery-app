"use client";
export const dynamic = "force-dynamic";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-6 bg-white drop-shadow-xl/30 opacity-75 w-full max-w-md">
        <h1 className="text-gray-900 bg-gray-300 px-10 py-2 rounded-tl-3xl rounded-br-3xl rounded-bl-md rounded-tr-md font-serif font-bold tracking-wider mb-4">
          Verify Email
        </h1>

        {verified && (
          <div className="p-3 mb-2 rounded-md bg-green-500 text-white text-center font-medium">
            ✅ Email verified successfully! You can now{" "}
            <Link href="/login" className="underline font-semibold hover:text-gray-200">
              login
            </Link>
            .
          </div>
        )}

        {error && (
          <div className="p-3 mb-2 rounded-md bg-red-500 text-white text-center font-medium">
            ❌ Email verification failed! Please try again later.
          </div>
        )}

        {!verified && !error && (
          <div className="p-3 mt-2 text-gray-700 text-sm text-center font-mono">
            Verifying your email...
          </div>
        )}
      </div>
    </div>
  );
}
