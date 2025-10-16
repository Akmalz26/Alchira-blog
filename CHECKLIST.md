# Alchira Blog - Setup Checklist

Use this checklist to ensure your blog is properly set up and ready to use.

## ✅ Initial Setup

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed (for version control)
- [ ] Code editor installed (VS Code recommended)

## ✅ Dependencies

- [ ] Run `npm install` successfully
- [ ] All dependencies installed without errors
- [ ] No critical vulnerabilities reported

## ✅ Supabase Setup

### Project Creation
- [ ] Created Supabase account
- [ ] Created new Supabase project
- [ ] Project is active and ready

### Database Schema
- [ ] Opened SQL Editor in Supabase
- [ ] Copied `supabase.sql` content
- [ ] Executed SQL successfully
- [ ] Verified tables exist:
  - [ ] profiles
  - [ ] posts
  - [ ] categories
  - [ ] tags
  - [ ] post_tags
  - [ ] comments
  - [ ] contact_messages
- [ ] Verified sample categories exist
- [ ] Verified sample tags exist

### Storage Buckets
- [ ] Created `avatars` bucket (public)
- [ ] Created `post-images` bucket (public)
- [ ] Set up storage policies

### Authentication
- [ ] Enabled Email provider
- [ ] (Optional) Enabled Google OAuth
- [ ] (Optional) Configured email templates

## ✅ Environment Configuration

- [ ] Created `.env.local` file
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Verified values are correct from Supabase > Settings > API

## ✅ Development Server

- [ ] Run `npm run dev` successfully
- [ ] Server started on port 3000
- [ ] No compilation errors
- [ ] Homepage loads correctly at `http://localhost:3000`

## ✅ User Registration & Admin

- [ ] Registered first user account
- [ ] Received confirmation email (if email verification enabled)
- [ ] Verified user exists in Supabase Auth
- [ ] Updated user role to 'admin' via SQL query
- [ ] Confirmed admin access to profile features

## ✅ Features Testing

### Public Features
- [ ] Homepage displays correctly
- [ ] Hero section visible
- [ ] Categories section works
- [ ] Can navigate to Blog page
- [ ] Blog listing shows posts (or empty state)
- [ ] Pagination works (if posts exist)
- [ ] Category filter works
- [ ] Sort options work
- [ ] About page loads
- [ ] Contact page loads
- [ ] Contact form submits successfully
- [ ] Footer links work
- [ ] Header navigation works
- [ ] Mobile menu works

### Authentication
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Can register new account
- [ ] (Optional) OAuth Google works
- [ ] Auth state persists on refresh
- [ ] Protected routes redirect when not logged in

### Profile & Admin
- [ ] Profile page displays user info
- [ ] Can edit profile
- [ ] Can upload avatar
- [ ] Avatar displays correctly
- [ ] Admin panel visible for admin users
- [ ] Can access Create Post page
- [ ] Can access Manage Posts page

### Content Management
- [ ] Can create new post
- [ ] Title generates slug automatically
- [ ] Can write markdown content
- [ ] Can upload featured image
- [ ] Can select category
- [ ] Can select tags
- [ ] Can save as draft
- [ ] Can publish post
- [ ] Published post appears on blog
- [ ] Can view published post
- [ ] Markdown renders correctly
- [ ] Syntax highlighting works for code blocks
- [ ] Can edit existing post
- [ ] Can delete post
- [ ] Can change post status

### Post Features
- [ ] View counter increments
- [ ] Comments display correctly
- [ ] Related posts show up
- [ ] Category links work
- [ ] Tag links work (if tag pages exist)
- [ ] Share buttons work
- [ ] Author info displays

## ✅ Design & Responsiveness

- [ ] Design looks elegant and minimalist
- [ ] Pink gradient colors display correctly
- [ ] Fonts load properly (Inter & Playfair Display)
- [ ] Responsive on desktop
- [ ] Responsive on tablet
- [ ] Responsive on mobile (phone)
- [ ] Images load and display correctly
- [ ] Hover effects work
- [ ] Transitions are smooth
- [ ] Custom scrollbar appears
- [ ] Loading states show correctly
- [ ] Toast notifications work

## ✅ Customization (Optional)

- [ ] Updated About page with personal info
- [ ] Updated Contact page with contact details
- [ ] Changed site title in layout.tsx
- [ ] (Optional) Customized colors in globals.css
- [ ] (Optional) Changed fonts
- [ ] (Optional) Updated social media links in footer

## ✅ Content Population

- [ ] Created at least 1 test post
- [ ] Uploaded test images
- [ ] Added custom categories (optional)
- [ ] Added custom tags (optional)
- [ ] Tested post visibility
- [ ] Verified post metadata

## ✅ Deployment Preparation

- [ ] Initialized git repository
- [ ] Made initial commit
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Prepared environment variables for production
- [ ] Tested build locally (`npm run build`)
- [ ] Build completed without errors

## ✅ Production Deployment (Vercel)

- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Added environment variables in Vercel
- [ ] Deployed successfully
- [ ] Production site is live
- [ ] Tested production site
- [ ] SSL certificate is active
- [ ] Custom domain configured (optional)

## ✅ Post-Deployment

- [ ] Verified Supabase connection from production
- [ ] Can login on production site
- [ ] Can create posts on production
- [ ] Images upload correctly on production
- [ ] Email notifications work (if configured)
- [ ] OAuth works on production (if configured)
- [ ] Analytics set up (optional)

## 🐛 Troubleshooting Checklist

If something doesn't work, check:

- [ ] Browser console for JavaScript errors
- [ ] Network tab for failed requests
- [ ] Supabase logs for database errors
- [ ] Environment variables are correct
- [ ] Storage buckets are public
- [ ] RLS policies are set correctly
- [ ] User has correct role (admin/user)
- [ ] Build output for compilation errors

## 📝 Maintenance Checklist (Regular)

- [ ] Backup Supabase database regularly
- [ ] Monitor storage usage
- [ ] Check for dependency updates
- [ ] Review and respond to comments
- [ ] Create new content regularly
- [ ] Monitor site performance
- [ ] Check analytics (if enabled)

## 🎉 Ready to Go?

If you've checked all the items above, congratulations! Your Alchira blog is fully set up and ready to use.

### Next Steps:
1. Create your first real blog post
2. Share your blog with friends
3. Customize the design to match your personality
4. Set up a posting schedule
5. Engage with your readers

---

**Happy Blogging!** 💕✨

Need help? Check:
- README.md - Full documentation
- SETUP.md - Detailed setup guide
- PANDUAN_CEPAT.md - Quick guide in Indonesian
- PROJECT_SUMMARY.md - Project overview


