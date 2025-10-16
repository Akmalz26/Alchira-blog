# Alchira Blog - File Structure

## 📁 Complete Directory Tree

```
alchira-blog/
│
├── 📄 Configuration Files
│   ├── .env.local.example          # Environment variables template
│   ├── .gitignore                  # Git ignore rules
│   ├── middleware.ts               # Next.js middleware for auth
│   ├── next-env.d.ts              # Next.js TypeScript definitions
│   ├── next.config.ts             # Next.js configuration
│   ├── package.json               # Dependencies and scripts
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── tsconfig.json              # TypeScript configuration
│
├── 📄 Documentation
│   ├── README.md                  # Main documentation (English)
│   ├── SETUP.md                   # Detailed setup guide (English)
│   ├── PANDUAN_CEPAT.md          # Quick guide (Indonesian)
│   ├── PROJECT_SUMMARY.md        # Project overview and features
│   ├── CHECKLIST.md              # Setup checklist
│   └── FILE_STRUCTURE.md         # This file
│
├── 📄 Database
│   └── supabase.sql              # Complete database schema with RLS
│
├── 📂 app/                       # Next.js App Router
│   │
│   ├── 📄 Root Files
│   │   ├── layout.tsx            # Root layout with Header/Footer
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Global styles and design system
│   │   └── favicon.ico           # Site favicon
│   │
│   ├── 📂 about/                 # About Page
│   │   └── page.tsx              # About content
│   │
│   ├── 📂 blog/                  # Blog Section
│   │   ├── page.tsx              # Blog listing with pagination
│   │   └── [slug]/               # Dynamic route for posts
│   │       └── page.tsx          # Single post page
│   │
│   ├── 📂 kategori/              # Categories Section
│   │   └── [slug]/               # Dynamic category pages
│   │       └── page.tsx          # Category post listing
│   │
│   ├── 📂 contact/               # Contact Page
│   │   └── page.tsx              # Contact form
│   │
│   ├── 📂 login/                 # Authentication
│   │   └── page.tsx              # Login page
│   │
│   ├── 📂 register/              # Registration
│   │   └── page.tsx              # Register page
│   │
│   ├── 📂 auth/                  # Auth Callbacks
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   │
│   └── 📂 profile/               # User Profile & Admin
│       ├── page.tsx              # Profile overview
│       ├── edit/                 # Edit Profile
│       │   └── page.tsx          # Profile edit form
│       ├── create-post/          # Create New Post
│       │   └── page.tsx          # Post creation form
│       └── manage-posts/         # Manage All Posts
│           └── page.tsx          # Post management interface
│
├── 📂 components/                # Reusable Components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Site footer
│   ├── PostCard.tsx              # Blog post preview card
│   ├── MarkdownRenderer.tsx      # Markdown to HTML renderer
│   ├── Loading.tsx               # Loading spinner
│   └── Toast.tsx                 # Toast notification wrapper
│
├── 📂 lib/                       # Utilities and Libraries
│   ├── supabase/                 # Supabase Integration
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Middleware helper
│   └── types/                    # TypeScript Types
│       └── database.types.ts     # Database type definitions
│
└── 📂 public/                    # Static Assets
    ├── file.svg                  # Icon files
    ├── globe.svg                 # (Next.js defaults)
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

## 🗂️ File Descriptions by Category

### 🏠 Pages (app/)

| File | Purpose | Type |
|------|---------|------|
| `app/page.tsx` | Homepage with hero, categories, recent posts | Server Component |
| `app/blog/page.tsx` | Blog listing with filters and pagination | Server Component |
| `app/blog/[slug]/page.tsx` | Individual blog post with comments | Server Component |
| `app/kategori/[slug]/page.tsx` | Posts filtered by category | Server Component |
| `app/about/page.tsx` | About the blog and author | Server Component |
| `app/contact/page.tsx` | Contact form | Client Component |
| `app/login/page.tsx` | Login form with OAuth | Client Component |
| `app/register/page.tsx` | Registration form | Client Component |
| `app/profile/page.tsx` | User profile and admin dashboard | Server Component |
| `app/profile/edit/page.tsx` | Edit profile form | Client Component |
| `app/profile/create-post/page.tsx` | Create new blog post | Client Component |
| `app/profile/manage-posts/page.tsx` | Manage all posts | Client Component |

### 🧩 Components (components/)

| Component | Purpose | Props |
|-----------|---------|-------|
| `Header` | Navigation with auth state | None |
| `Footer` | Site footer with links | None |
| `PostCard` | Post preview card | `post` object |
| `MarkdownRenderer` | Render markdown content | `content` string |
| `Loading` | Loading spinner | None |
| `Toast` | Toast notifications | None |

### 🔧 Utilities (lib/)

| File | Purpose | Exports |
|------|---------|---------|
| `lib/supabase/client.ts` | Browser Supabase client | `createClient()` |
| `lib/supabase/server.ts` | Server Supabase client | `createClient()` |
| `lib/supabase/middleware.ts` | Auth middleware helper | `updateSession()` |
| `lib/types/database.types.ts` | Database TypeScript types | Type definitions |

### 📝 Configuration Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Next.js middleware for auth refresh |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `package.json` | Dependencies and scripts |
| `.env.local` | Environment variables (create this) |
| `.gitignore` | Git ignore patterns |

### 📚 Documentation Files

| File | Purpose | Language |
|------|---------|----------|
| `README.md` | Complete documentation | English |
| `SETUP.md` | Step-by-step setup | English |
| `PANDUAN_CEPAT.md` | Quick start guide | Indonesian |
| `PROJECT_SUMMARY.md` | Feature overview | English |
| `CHECKLIST.md` | Setup checklist | English |
| `FILE_STRUCTURE.md` | This file | English |

## 🎨 Styling Structure

### Global Styles
- `app/globals.css` - Contains:
  - CSS reset and base styles
  - Custom CSS variables (colors, fonts)
  - Utility classes (btn-gradient, card-hover)
  - Markdown prose styling
  - Custom scrollbar styling
  - Animation keyframes

### Component Styles
- All components use Tailwind CSS utility classes
- No separate CSS files needed
- Responsive modifiers (sm:, md:, lg:)
- Custom gradient classes

## 🗄️ Database Structure (supabase.sql)

### Tables
1. **profiles** - User profiles extending Supabase Auth
2. **posts** - Blog posts with markdown content
3. **categories** - Post categories
4. **tags** - Post tags
5. **post_tags** - Many-to-many relationship
6. **comments** - User comments on posts
7. **contact_messages** - Contact form submissions

### Security
- Row Level Security (RLS) on all tables
- Admin-only policies for content management
- Public read, authenticated write model

### Storage
- **avatars** bucket - User profile pictures
- **post-images** bucket - Blog post images

## 🔄 Data Flow

### Reading Posts (Public)
```
Browser → app/blog/page.tsx → lib/supabase/server.ts 
→ Supabase (posts table) → PostCard component → Display
```

### Creating Posts (Admin)
```
Browser → app/profile/create-post/page.tsx → lib/supabase/client.ts 
→ Supabase (posts table + RLS check) → Success/Error toast
```

### Authentication
```
Browser → app/login/page.tsx → lib/supabase/client.ts 
→ Supabase Auth → middleware.ts → Protected routes
```

## 📦 Key Dependencies

### Production
- `next` - React framework
- `react` & `react-dom` - React library
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - SSR support
- `react-markdown` - Markdown rendering
- `date-fns` - Date formatting
- `react-hot-toast` - Notifications

### Development
- `typescript` - Type checking
- `tailwindcss` - Styling
- `@types/*` - TypeScript types

## 🎯 Entry Points

1. **Development**: `npm run dev` → `http://localhost:3000`
2. **Production Build**: `npm run build` → `.next/`
3. **Production Server**: `npm start`

## 🔐 Protected Routes

Routes requiring authentication:
- `/profile/*` - All profile pages
- Comment creation (on any post)

Routes requiring admin role:
- `/profile/create-post`
- `/profile/manage-posts`
- `/profile/edit-post/*`

## 📱 Responsive Breakpoints

Using Tailwind CSS breakpoints:
- `sm:` - 640px and up (tablet portrait)
- `md:` - 768px and up (tablet landscape)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (large desktop)

## 🎨 Design Tokens

Defined in `app/globals.css`:

```css
--pink-gradient-from: #ff6b9d
--pink-gradient-to: #ffc3e0
--pink-light: #fff0f5
--gray-light: #f8f9fa
--border-radius: 12px
```

## 🚀 Build Output

When you run `npm run build`:
```
.next/
├── cache/          # Build cache
├── server/         # Server bundles
├── static/         # Static assets
└── types/          # Generated types
```

---

This structure follows Next.js 15 App Router conventions and best practices for a production-ready application.


