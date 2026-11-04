# Bachat Khata website

A responsive, sky-blue and white community website with:
- Home page with a leadership / CEO introduction section
- About, Members and Contact pages
- Member directory (photo, name, role, phone, email and short bio)
- Private admin dashboard at `/admin` to add, edit and delete members and upload profile photos
- Supabase database, authentication and image storage

## 1. Requirements
- Node.js 20 or newer
- A Supabase project
- A GitHub account and Vercel account for publishing

## 2. Run locally
1. Extract this ZIP.
2. Open the folder in VS Code.
3. Open the terminal in that folder and run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase Project URL and anon/public key to `.env.local`.
6. Run `npm run dev` and open `http://localhost:3000`.

Do not put a Supabase `service_role` key in this project or in browser code.

## 3. Set up Supabase
1. Open your Supabase project.
2. Go to SQL Editor.
3. Open `supabase/schema.sql`, copy all SQL and run it.
4. Go to Authentication > Users and create an admin user with an email and strong password.
5. Copy that user's UUID.
6. In SQL Editor, run this query after replacing the UUID:

   `insert into public.site_admins (user_id) values ('YOUR-ADMIN-USER-UUID');`

Only users added to `site_admins` can add, edit or delete members. Creating an Auth user alone does not grant admin permissions.

## 4. Add the 13 member profiles
1. Open your website locally and visit `/admin`.
2. Sign in with the admin email and password.
3. Add each member's name, phone, email, role, short introduction and photo.
4. Use Display order 1 to 13 to control the order shown on the public Members page.

## 5. Replace demo content
Search the project for:
- `Client Full Name` — replace with the client's actual name.
- `hello@bachatkhata.com` — replace with the official email.
- `+9779800000000` — replace with the official contact number.
- `Nepal` — replace with the actual location if the client wants it shown.
- `Client / CEO photo` — add the client's photo as `public/ceo.jpg`, then replace the placeholder in `app/page.tsx` with an Image element or regular `<img>`.

To use the supplied logo, place it at `public/logo.png` and update the brand area in `components/site-header.tsx`. The current mark is a clean icon placeholder.

## 6. Publish a public link with Vercel
1. Push the project folder to a new GitHub repository.
2. In Vercel, choose Add New > Project and import that repository.
3. Add the same two environment variables from `.env.local` in Vercel Project Settings > Environment Variables.
4. Deploy. Vercel will provide a public URL that your client can open.
5. Whenever you push updated code to GitHub, Vercel will redeploy automatically.

You can connect the client's own domain later in Vercel > Project Settings > Domains.

## 7. Important privacy note
Only publish member phone numbers and email addresses after the client has confirmed that all 13 members consent to displaying them publicly. The public member directory is intentionally readable by anyone who visits the website.

## 8. Pages
- `/` — Home
- `/about` — About
- `/members` — Member directory
- `/contact` — Contact details
- `/admin` — Private sign-in and member management

The admin dashboard is not linked in the public navigation. Keep the admin password private and use a unique, strong password.
