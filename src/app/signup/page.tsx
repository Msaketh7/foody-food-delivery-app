"use client"
import React, {useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function SignUp()  {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      toast.success("Signup successful");
      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "An error occurred during signup");

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }

  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-6 bg-white drop-shadow-xl/30 opacity-75">
      <h1 className="text-gray-900 bg-gray-300 px-10 py-2 rounded font-serif font-bold tracking-wider mb-5 outline outline-offset-2">{loading ? "Processing" : "Signup"}</h1>
      <hr/>
      <label className='text-gray-900 font-mono' htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
         className="p-2 border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
      />
      <label className='text-gray-900 font-mono' htmlFor="email">email</label>
      <input
        id="email"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
      />
      <label className='text-gray-900 font-mono' htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border border-gray-300 rounded-md mb-4 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
      />
      <button
  disabled={buttonDisabled || loading}
  className={`bg-gray-700 text-white p-2 rounded-md mb-4 cursor-pointer w-full font-mono transition delay-50 duration-200 ease-in-out ${
    loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
  }`}
  onClick={onSignup}
>
  {loading ? "Processing..." : buttonDisabled ? "No signup" : "Signup"}
</button>
         <p className='text-gray-500 font-mono'>Already have account?</p>
      <Link className='text-gray-900 font-mono underline underline-offset-2' href = "/login"> Login Here</Link>
      </div>
    </div>
  )
}