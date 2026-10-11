# Article Hub

## Overview

Article Hub is a responsive article publishing application built as part of the Noroff Frontend Development course. It allows users to browse community articles, create an account, log in, and publish their own articles.

## Motivation

I chose this project because I wanted to improve my understanding of how frontend and backend technologies work together. I was particularly interested in connecting a user interface to a real database and implementing authentication rather than relying on static content.

I enjoyed working on both the frontend and backend aspects of the application. It was rewarding to build the interface, manage articles with Supabase, and implement authentication and security policies. This combination is also closely related to the kind of projects I would like to develop in the future, where UX design and frontend development work together.

One of the biggest challenges was troubleshooting issues between VS Code, GitHub, and the deployed application. I also spent a considerable amount of time understanding parts of the code and checking that each feature worked correctly. These challenges could be frustrating, but they helped me understand the importance of testing regularly and debugging problems step by step.

If I were to do this project again, I would spend more time planning the implementation before coding and make sure each feature is fully tested before moving on to the next one. I would also improve my workflow to make debugging and deployment more efficient. Overall, this assignment helped me become more organised, more confident in solving problems, and more comfortable working with both frontend and backend technologies.

## Features

- User registration and login with Supabase Authentication.
- Email confirmation for new accounts.
- Browse articles retrieved from Supabase.
- Open and read individual articles.
- Create articles when authenticated.
- Protected article creation page.
- Row Level Security (RLS) policies to protect article creation and user-owned content.
- Responsive interface built with Tailwind CSS.
- Loading states and error messages for key operations.

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

4. Configure the Supabase client in js/supabase.js using your Supabase project URL and public publishable/anon key.

5. Start the Tailwind CSS watcher in one terminal:

   npm run dev


6. Start the Vite development server in a second terminal:

   
   npm run vite


7. Open the local URL provided by Vite, usually http://localhost:5173.

## Supabase Configuration

The application uses Supabase for authentication and article storage.

The posts table contains article information such as:

- 'id'
- created_at
- title
- content
- category
- user_id

Row Level Security (RLS) policies allow public reading of articles while restricting article creation to authenticated users. User ownership is checked using the authenticated user's ID.

Email confirmation should be enabled in the Supabase Authentication settings.

## Security Notes

- Never commit Supabase secret or service-role keys.
- Only use the appropriate public client key in the frontend.
- Database access is controlled by Row Level Security policies.
- Article creation must be restricted to authenticated users, and each article must be associated with its owner.

## Author

Developed as part of the Noroff Frontend Development programme.
