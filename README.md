# Alchira - Personal Blog

A modern, elegant, and minimalist personal blog built with Next.js, TypeScript, and Supabase. Features a beautiful pink gradient design with a girly touch, perfect for sharing thoughts, tutorials, and experiences.

## ✨ Features

### Public Features
- 🏠 **Homepage** - Hero section, category browsing, and latest posts
- 📝 **Blog Listing** - Pagination, filtering by category, and sorting options
- 📖 **Post Details** - Full markdown support, comments, related posts, and social sharing
- 🏷️ **Category & Tag Pages** - Browse posts by topics
- 👤 **About Page** - Learn about the blog and its author
- 📧 **Contact Page** - Get in touch via contact form

### Authentication
- 📧 **Email/Password Authentication**
- 🔐 **OAuth (Google) Support**
- 👥 **User Profiles** with avatar, bio, and website

### Admin/CMS Features (Admin Only)
- ✍️ **Create & Edit Posts** - Full markdown editor
- 🖼️ **Image Upload** - Integrated with Supabase Storage
- 📂 **Category Management**
- 🏷️ **Tag Management**
- 📊 **Post Analytics** - View counts and engagement
- 🔒 **Row Level Security** - Secure data access

## 🎨 Design

- **Style**: Modern, Elegant, Minimalist with a soft girly touch
- **Color Scheme**: Dominant white/light with pink gradient accents
- **Typography**: 
  - Inter - Clean sans-serif for body text
  - Playfair Display - Elegant serif for headings
- **Responsive**: Fully responsive for desktop, tablet, and mobile

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Markdown**: react-markdown, remark-gfm, react-syntax-highlighter
- **Utilities**: date-fns, react-hot-toast

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd alchira-blog
   ```

2. **Install dependencies**
```bash
   npm install
   ```

3. **Set up Supabase**

   a. Create a new Supabase project at [https://supabase.com](https://supabase.com)
   
   b. Run the SQL schema in the Supabase SQL Editor:
      - Open the SQL Editor in your Supabase dashboard
      - Copy the contents of `supabase.sql`
      - Execute the SQL to create tables, policies, and functions
   
   c. Create Storage Buckets:
      - Go to Storage in Supabase dashboard
      - Create a bucket named `avatars` (public)
      - Create a bucket named `post-images` (public)
   
   d. Configure Authentication:
      - Go to Authentication > Providers
      - Enable Email provider
      - (Optional) Enable Google OAuth provider

4. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   Get these values from your Supabase project settings > API

5. **Create an admin user**
   
   After running the SQL schema and registering your first user:
   ```sql
   -- Run this in Supabase SQL Editor to make a user admin
   UPDATE profiles 
   SET role = 'admin' 
   WHERE id = 'your-user-id';
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
alchira-blog/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── blog/                # Blog listing and single post
│   ├── contact/             # Contact page
│   ├── kategori/            # Category pages
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── profile/             # Profile and admin pages
│   ├── auth/                # Auth callback
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── MarkdownRenderer.tsx
│   ├── Loading.tsx
│   └── Toast.tsx
├── lib/                     # Utilities and configurations
│   ├── supabase/            # Supabase clients
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── types/               # TypeScript types
│       └── database.types.ts
├── middleware.ts            # Next.js middleware
├── supabase.sql            # Database schema
└── package.json
```

## 🗄️ Database Schema

The blog uses the following main tables:
- **profiles** - User profiles (extends Supabase Auth)
- **posts** - Blog posts with markdown content
- **categories** - Post categories
- **tags** - Post tags
- **post_tags** - Many-to-many relationship
- **comments** - User comments on posts
- **contact_messages** - Contact form submissions

See `supabase.sql` for the complete schema with Row Level Security policies.

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for protected routes
- Admin role required for content management
- Secure file uploads with Supabase Storage

## 🎯 Usage

### For Visitors
1. Browse blog posts on the homepage or blog page
2. Read full articles with markdown formatting
3. Filter by categories or tags
4. Leave comments (requires login)
5. Contact the author via contact form

### For Admins
1. Register an account and set role to 'admin' in database
2. Login and access the profile page
3. Create, edit, and delete blog posts
4. Manage categories and tags
5. Upload images for posts
6. View post analytics

## 📝 Creating Your First Post

1. Login as an admin
2. Go to Profile > Create Post
3. Fill in the post details:
   - Title (auto-generates slug)
   - Content (Markdown supported)
   - Excerpt (optional)
   - Featured Image (upload from your computer)
   - Category and Tags
   - Status (Draft or Published)
4. Click "Create Post"

### Markdown Support
The blog supports full GitHub Flavored Markdown including:
- Headers, bold, italic
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Blockquotes
- Tables

## 🎨 Customization

### Colors
Edit the CSS variables in `app/globals.css`:
```css
:root {
  --pink-gradient-from: #ff6b9d;
  --pink-gradient-to: #ffc3e0;
  --pink-light: #fff0f5;
}
```

### Fonts
Change fonts in `app/globals.css`:
```css
@import url('your-font-url');

body {
  font-family: 'Your Font', sans-serif;
}
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## 📄 License

MIT License - feel free to use this project for your own personal blog!

## 🤝 Contributing

This is a personal blog template, but suggestions and improvements are welcome!

## 💖 Acknowledgments

Built with love using:
- Next.js
- Supabase
- Tailwind CSS
- React Markdown

---

Made with 💕 by Alchira
