# 🚀 Quick Reference - Alchira Blog

Referensi cepat untuk hal-hal yang sering dibutuhkan.

## 📝 Setup Google OAuth (Singkat)

### 1. Google Cloud Console
```
1. console.cloud.google.com → New Project
2. APIs & Services → Library → Enable "Google+ API"
3. OAuth consent screen → External → Fill form → Save
4. (TUNGGU - Get Callback URL dari Supabase dulu!)
```

### 2. Supabase
```
1. Authentication → Providers → Google
2. COPY Callback URL: https://xxx.supabase.co/auth/v1/callback
```

### 3. Kembali ke Google Cloud Console
```
1. Credentials → Create OAuth Client ID
2. Type: Web application
3. Authorized redirect URIs: PASTE Callback URL dari Supabase
4. Create → COPY Client ID & Client Secret
```

### 4. Kembali ke Supabase
```
1. Authentication → Providers → Google
2. Toggle ON
3. Paste Client ID & Client Secret
4. Save
```

✅ **Done! Google OAuth ready!**

---

## 🔐 Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Dapatkan dari: **Supabase → Settings → API**

---

## 🗄️ Setup Database

1. Copy semua isi `supabase.sql`
2. Supabase → SQL Editor → Paste → Run
3. Verify tables created

---

## 📦 Storage Buckets

```
1. Supabase → Storage → New bucket
2. Name: avatars → Public → Create
3. Name: post-images → Public → Create
```

---

## 👤 Buat Admin User

### Step 1: Register
```
1. npm run dev
2. Buka http://localhost:3000
3. Register akun pertama
```

### Step 2: Set Role Admin
Di Supabase SQL Editor:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'your-email@example.com'
);
```

---

## ✍️ Format Markdown

### Headers
```markdown
# H1
## H2
### H3
```

### Text Formatting
```markdown
**bold**
*italic*
~~strikethrough~~
```

### Lists
```markdown
- Item 1
- Item 2
  - Sub item

1. First
2. Second
```

### Links & Images
```markdown
[Text](https://url.com)
![Alt text](image-url.jpg)
```

### Code
```markdown
`inline code`

```javascript
// code block
const x = 10
```
```

### Quote
```markdown
> This is a quote
```

---

## 🎨 Custom Colors

Edit `app/globals.css`:

```css
:root {
  --pink-gradient-from: #ff6b9d;
  --pink-gradient-to: #ffc3e0;
  --pink-light: #fff0f5;
}
```

---

## 📱 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Install TinyMCE (already installed)
npm install tinymce @tinymce/tinymce-react

# Git
git add .
git commit -m "message"
git push
```

---

## 🔍 File Locations

```
app/
  ├── page.tsx                      # Homepage
  ├── blog/page.tsx                 # Blog listing
  ├── blog/[slug]/page.tsx          # Single post
  ├── profile/
  │   ├── page.tsx                  # Profile
  │   ├── create-post/page.tsx      # Create post (TinyMCE)
  │   ├── manage-posts/page.tsx     # Manage posts
  │   └── categories/page.tsx       # Category management ✨NEW
  ├── about/page.tsx                # About
  └── contact/page.tsx              # Contact

components/
  ├── Header.tsx                    # Navigation (active states) ✨UPDATED
  ├── Footer.tsx                    # Footer
  ├── PostCard.tsx                  # Post card
  └── TinyMCEEditor.tsx             # Rich text editor ✨NEW

lib/
  └── supabase/
      ├── client.ts                 # Browser client
      └── server.ts                 # Server client
```

---

## 🚨 Common Errors & Quick Fixes

### Error: "Email not confirmed"
```
✅ Disable email confirmation di Supabase
   Authentication → Providers → Email → Uncheck "Confirm email"
   
Atau confirm manual via SQL:
UPDATE auth.users 
SET email_confirmed_at = NOW(), confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

Panduan lengkap: DISABLE_EMAIL_CONFIRMATION.md
```

### Error: "Unsupported provider"
```
✅ Enable Google OAuth di Supabase
   Authentication → Providers → Google → ON
```

### Error: "redirect_uri_mismatch"
```
✅ Check Authorized redirect URIs di Google Console
   Harus sama persis dengan Callback URL dari Supabase
```

### Error: "User not authenticated"
```
✅ Login dulu
✅ Check .env.local sudah benar
✅ Clear browser cache
```

### Error: "hostname is not configured under images"
```
✅ Next.js Image hostname not configured
✅ Update next.config.ts (SUDAH FIXED!)
✅ Restart dev server: Ctrl+C lalu npm run dev
✅ Hard refresh browser: Ctrl+Shift+R

Panduan: FIX_IMAGE_UPLOAD_ERROR.md
```

### Image upload gagal
```
✅ Check storage buckets sudah dibuat
✅ Pastikan buckets bersifat PUBLIC
✅ Check ukuran file < 50MB
✅ Restart server setelah update next.config.ts
```

### Tidak bisa create post
```
✅ Check user role = 'admin' di database
✅ Run SQL: 
   UPDATE profiles SET role = 'admin' 
   WHERE id = 'user-id'
```

---

## 📊 Database Quick Queries

### Check Users
```sql
SELECT * FROM auth.users;
```

### Check Profiles
```sql
SELECT * FROM profiles;
```

### Set User as Admin
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'user@email.com';
```

### Check Posts
```sql
SELECT id, title, status, view_count 
FROM posts 
ORDER BY created_at DESC;
```

### Delete a Post
```sql
DELETE FROM posts WHERE id = 'post-id';
```

### Check Categories
```sql
SELECT * FROM categories;
```

---

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### Step 2: Deploy
```
1. vercel.com → New Project
2. Import GitHub repository
3. Add Environment Variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy
```

### Step 3: Update Google OAuth
```
Google Console → Credentials → Edit OAuth Client
→ Add production URL to Authorized JavaScript origins
```

---

## 📞 URLs untuk Reference

- **Supabase**: https://supabase.com
- **Google Cloud**: https://console.cloud.google.com
- **Vercel**: https://vercel.com
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 💡 Tips

1. **Backup database** secara berkala dari Supabase
2. **Compress images** sebelum upload (tinypng.com)
3. **Write consistently** untuk audience engagement
4. **Test di mobile** sebelum publish
5. **Monitor Supabase logs** untuk errors

---

## 🎯 Default Data

### Sample Categories (manage at /profile/categories)
- Teknologi
- Gaya Hidup
- Tutorial
- Personal

### Sample Tags (create inline in post form)
- Next.js
- React
- TypeScript
- Web Development
- Design
- Productivity

## ✨ New Features

### TinyMCE Editor
- Rich text editing
- Visual formatting
- No markdown needed
- Professional toolbar

### Tag Management
- Add tags inline in post form
- Create new tags on-the-fly
- Remove tags easily
- Pink gradient pills

### Category Management
- Full CRUD at /profile/categories
- Create, edit, delete categories
- Auto-generate slugs

### Active Navbar
- Highlight current page

### Edit Post Feature
- Edit existing posts at /profile/edit-post/[id]
- Load existing data
- Same TinyMCE editor
- Tag management
- Image management

### Fixed Share Button
- Fixed Server Component error
- Client Component for interactivity
- Fallback copy to clipboard
- Animated underline on hover
- Pink gradient effects
- Works on mobile too

---

## ⌨️ Keyboard Shortcuts (Development)

- `Ctrl + C` - Stop dev server
- `Ctrl + Shift + R` - Hard refresh browser
- `F12` - Open browser DevTools
- `Ctrl + Shift + I` - Open browser console

---

## 🔗 Important Links in Project

- **Main Docs**: `README.md`
- **Setup Guide**: `SETUP.md`
- **Quick Guide ID**: `PANDUAN_CEPAT.md`
- **Google OAuth**: `GOOGLE_OAUTH_SETUP.md`
- **Checklist**: `CHECKLIST.md`
- **This File**: `QUICK_REFERENCE.md`

---

**Keep this file open for quick reference!** 📌

