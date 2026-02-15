'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

type Bookmark = {
  id: string
  title: string
  url: string
  user_id: string
  created_at: string
}

type BookmarksProps = {
  user: User
}

export default function Bookmarks({ user }: BookmarksProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const fetchBookmarks = async () => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
    return
  }

  setBookmarks(data || [])
}


  const addBookmark = async () => {
    if (!title || !url) return alert('Enter Title & URL')

    let formattedUrl = url
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl
    }

    await supabase.from('bookmarks').insert([
      {
        title,
        url: formattedUrl,
        user_id: user.id,
      },
    ])

    setTitle('')
    setUrl('')
    fetchBookmarks()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    fetchBookmarks()
  }
  useEffect(() => {
     if (user) {
        fetchBookmarks()
    }
  }, [user]);

  useEffect(() => {
  if (!user) return

  const channel = supabase
    .channel('bookmarks-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookmarks',
      },
      () => {
        fetchBookmarks()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
  }, [user])
return (
  <div className="flex justify-center">

    <div className="w-full max-w-2xl bg-white rounded-2xl p-6 space-y-6 flex flex-col">

      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Smart Bookmark Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-4 items-end">

        <input type="text" placeholder="Bookmark Title" value={title}
          onChange={e => setTitle(e.target.value)}
          className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base w-full"
        />

        <input type="text" placeholder="https://example.com" value={url}
          onChange={e => setUrl(e.target.value)}
          className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base w-full"
        />

        <button onClick={addBookmark} title="Add new bookmark"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-base font-normal transition duration-200 shadow-md w-48 sm:w-auto"
        >
          Add Bookmark
        </button>

      </div>

      <div className="border-t pt-6">

        {bookmarks.length > 0 ? (
          <ul className="space-y-4">
            {bookmarks.map(b => (
              <li key={b.id}
                className="flex justify-between items-center px-6 py-3 rounded-xl hover:bg-gray-100 transition text-base shadow-sm"
              >
                <a href={b.url} target="_blank" rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline truncate max-w-[60%] font-medium"
                >
                  {b.title}
                </a>

                <button onClick={() => deleteBookmark(b.id)} title="Delete bookmark"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}

          </ul>
        ) : (
          <p className="text-center text-gray-400 text-base mt-10">
            No bookmarks yet
          </p>
        )}

      </div>

    </div>
  </div>
)
}