# Setup Instructions for Alchira Blog

Follow these steps to get your blog up and running.

## 1. Install Dependencies

```bash
npm install
```

## 2. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to finish setting up

## 3. Run Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Open the `supabase.sql` file from this project
3. Copy all the SQL code
4. Paste it into the SQL Editor
5. Click "Run" to execute

This will create:
- All necessary tables (profiles, posts, categories, tags, comments, contact_messages)
- Indexes for better performance
- Row Level Security policies
- Helper functions and triggers

## 4. Create Storage Buckets

### For Avatars:
1. Go to Storage in Supabase dashboard
2. Click "Create bucket"
3. Name it `avatars`
4. Make it **public**
5. Click "Create"

### For Post Images:
1. Click "Create bucket" again
2. Name it `post-images`
3. Make it **public**
4. Click "Create"

### Set Storage Policies:
After creating buckets, you may need to set storage policies. Run this in SQL Editor:

```sql
-- Allow public read access to avatars
CREATE POLICY "Public Access to Avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Allow public read access to post images
CREATE POLICY "Public Access to Post Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- Allow admins to upload post images
CREATE POLICY "Admins can upload post images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-images' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
```

## 5. Configure Environment Variables

1. Create a `.env.local` file in the root directory
2. Copy the following and replace with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

To find these values:
- Go to your Supabase project
- Click on "Settings" (gear icon)
- Go to "API"
- Copy the "Project URL" and "anon public" key

## 6. Enable Authentication Providers

### Email Authentication (Required):
1. Go to Authentication > Providers in Supabase
2. Enable "Email" provider
3. Configure email templates (optional but recommended)

### Google OAuth (Optional):
1. Create a Google OAuth app in Google Cloud Console
2. Get your Client ID and Client Secret
3. Go to Authentication > Providers in Supabase
4. Enable "Google" provider
5. Enter your Client ID and Client Secret
6. Add the callback URL to your Google OAuth app

## 7. Create Your Admin Account

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Click "Register" and create an account

4. After registering, go to Supabase > SQL Editor

5. Run this query to make your account an admin:
   ```sql
   -- Replace 'your-email@example.com' with your actual email
   UPDATE profiles 
   SET role = 'admin' 
   WHERE id = (
     SELECT id FROM auth.users 
     WHERE email = 'your-email@example.com'
   );
   ```

6. Refresh your browser and you should now see admin features!

## 8. Create Sample Data (Optional)

The database already includes some sample categories and tags. You can:
- Create your first blog post from the Profile page
- Add more categories from the admin panel
- Customize existing categories and tags

## 9. Customize Your Blog

### Update About Page:
Edit `app/about/page.tsx` to add your personal information.

### Update Contact Info:
Edit `app/contact/page.tsx` to change email and social media links.

### Change Colors:
Edit `app/globals.css` to customize the color scheme.

### Update Site Title:
Edit `app/layout.tsx` to change the site title and description.

## 10. Deploy to Production

### Vercel (Recommended):
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your environment variables
5. Deploy!

### Important for Production:
- Update CORS settings in Supabase if needed
- Set up proper email templates in Supabase
- Configure a custom domain
- Add analytics (optional)

## Troubleshooting

### "User not authenticated" error:
- Make sure you're logged in
- Check if your environment variables are correct
- Clear browser cache and cookies

### Images not uploading:
- Verify storage buckets are created and public
- Check storage policies are set correctly
- Ensure file size is under limits

### Can't create posts:
- Verify your user has 'admin' role in database
- Check Row Level Security policies
- Look at browser console for errors

### Database errors:
- Make sure all SQL from `supabase.sql` was executed
- Check if tables and policies exist in Supabase

## Need Help?

- Check the main README.md for more details
- Review the Supabase documentation
- Check browser console for errors
- Look at Supabase logs in the dashboard

---

Enjoy your new blog! 💕


