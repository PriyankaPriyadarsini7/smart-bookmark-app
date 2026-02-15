'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Dashboard from './dashboard'
import { User, Session } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
        queryParams: { prompt: 'select_account' },
      }as any,
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Smart Bookmark App
        </h1>

        <button onClick={loginWithGoogle}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-md transition duration-300 text-base"
        >
          Login with Google
        </button>

      </div>
    </div>
  )
}
  return <Dashboard user={user} logout={logout} />
}
