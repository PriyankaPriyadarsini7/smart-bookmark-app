# Smart Bookmark App - Complete Project Documentation

## Overview

This document describes the Smart Bookmark App, including its architecture, folder structure, Supabase integration, component flow, responsive design, real-time updates, and deployment. It provides a clear step-by-step explanation for easy understanding.
A simple bookmark manager app built with Next.js, Supabase, and Tailwind CSS.


smart-bookmark-app/
├── app/
|   ├── pages.tsx  # Redirects to Home
|   |
│   └──Component
|      ├── Home.tsx       # Login & main app Logic 
│      ├── dashboard.tsx    # Dashboard UI
│      └── Bookmarks.tsx   # Bookmark input/list  
├── lib/
│   └── supabaseClient.ts # Supabase configuration
├── public/
├── styles/
│   └── globals.css
├── tailwind.config.js
├── package.json
└── README.md


## Features

- Google OAuth login only – No email/password, just secure Google login

- Add bookmarks – Title + URL input form

- Real-time updates – Add/delete bookmarks and see changes instantly across multiple tabs

- User-specific bookmarks – Each user can only see their own bookmarks

- Delete bookmarks – Remove bookmarks individually

## Tech Stack

- Next.js (App Router) – Frontend framework
- Supabase – Backend, database, authentication, and realtime
- Tailwind CSS – Styling and responsive layout

## Problems Faced

- Setting up Supabase: Initially unsure how to install, connect, and structure tables.

- Google OAuth login: Confusion with redirect URLs and configuration.

- Real-time updates: Bookmarks didn’t update across multiple tabs initially.

- Ensuring user privacy: Needed User A to not see User B’s bookmarks.

- Next.js App Router & Supabase integration: Initially confusing to handle auth and realtime subscriptions together.

## Solution

- Followed Supabase docs carefully, created a bookmarks table with required fields, and connected the frontend using supabase-js.

- Enabled Google provider in Supabase, ensured redirect URLs matched exactly, and tested login flow.

-  Used supabase.channel() with postgres_changes subscription to automatically update the bookmarks list in real-time.

- Added .eq('user_id', user.id) in all queries.

- Structured code with Home.tsx for login, Dashboard.tsx for main view, and Bookmarks.tsx for bookmark operations.

## How to Run Locally

```bash
git clone https://github.com/username/smart-bookmark-app.git
cd smart-bookmark-app
npm install
# Ensure you have Supabase keys in .env.local
npm run dev
