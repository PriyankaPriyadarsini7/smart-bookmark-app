'use client'

import { User } from '@supabase/supabase-js'
import Bookmarks from './Bookmarks'

type DashboardProps = {
  user: User
  logout: () => void
}
export default function Dashboard({ user, logout }: DashboardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-[60%] max-w-2xl h-[70vh] bg-white rounded-2xl shadow-xl p-8 flex flex-col">

      
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome
            </h1>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          <button onClick={logout} title="Logout"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Bookmarks user={user} />
        </div>

      </div>

    </div>
  )
}
