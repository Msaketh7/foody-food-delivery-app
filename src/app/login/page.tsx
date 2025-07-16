"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {axios} from 'axios'


export default function Login()  {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })

  const onLogin = async () => {
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-6 bg-white drop-shadow-xl/30 opacity-75">
      <h1 className="text-gray-900 bg-gray-300 px-10 py-2 rounded font-serif font-bold tracking-wider mb-5 outline outline-offset-2">LOGIN</h1>
      <hr/>
      <label className='text-gray-900 font-mono' htmlFor="email">email</label>
      <input
        id="email"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border border-gray-300 rounded-md mb-4  text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent outline outline-offset-2"
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
      <button className="bg-gray-700 text-white p-2 rounded-md mb-4 cursor-pointer hover:bg-gray-600 w-full font-mono transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500" 
      onClick={onLogin}>
        Login</button>
        <p className='text-gray-500 font-mono'>No account?</p>
      <Link className='text-gray-900 font-mono underline underline-offset-2' href = "/signup">SignUp Here</Link>
      </div>
    </div>
  )
}