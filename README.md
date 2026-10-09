# Article Hub

## Overview

Article Hub is a responsive article publishing application built as part of the Noroff Frontend Development course. It allows users to browse community articles, create an account, log in, and publish their own articles.

## Features

- User registration and login with Supabase Authentication.
- Email confirmation for new accounts.
- Browse articles retrieved from Supabase.
- Create articles when authenticated.
- Protected article creation page.
- Row Level Security (RLS) policies to protect article creation and user-owned content.
- Responsive interface built with Tailwind CSS.

## Technologies

- HTML5
- JavaScript (ES Modules)
- Tailwind CSS
- Vite
- Supabase (Authentication and PostgreSQL database)
- Git and GitHub

## Installation

### Prerequisites

- Node.js and npm
- A Supabase project

### Setup

1. Clone the repository:

   git clone https://github.com/anthonyapitchou/supabase-frontend-assignment.git
   

2. Navigate to the project folder:

   cd supabase-frontend-assignment
  

3. Install the dependencies:

   npm install
   

4. Configure the Supabase client in js/supabase.js using your Supabase project URL and publishable/anon key.

5. Start the Tailwind CSS watcher in one terminal:

   
   npm run dev
  

6. Start the Vite development server in a second terminal:

   npm run vite
   

7. Open the local URL provided by Vite, usually `http://localhost:5173`.

## Supabase Configuration

The application uses Supabase for authentication and article storage.

The `posts` table contains article information such as:

- id
- created_at
- title
- content
- category
- user_id

Row Level Security (RLS) policies restrict authenticated users to creating and managing their own articles, while allowing articles to be read publicly.

Email confirmation should be enabled in the Supabase Authentication settings.

## Project Structure

supabase-frontend-assignment/
├── components/
│   ├── header.html
│   └── footer.html
├── js/
│   ├── components.js
│   ├── supabase.js
│   ├── auth.js
│   ├── login.js
│   ├── register.js
│   └── post.js
├── src/
│   ├── input.css
│   └── output.css
├── index.html
├── articles.html
├── login.html
├── register.html
├── create-post.html
├── package.json
└── README.md

## Security Notes

- Never commit Supabase secret or service-role keys.
- Only use the appropriate public client key in the frontend.
- Database access is controlled by Row Level Security policies.

## Author

Developed as part of the Noroff Frontend Development programme.
