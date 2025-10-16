# Panduan Cepat - Alchira Blog

Panduan singkat dalam Bahasa Indonesia untuk memulai blog Alchira Anda.

## 🚀 Cara Memulai (5 Langkah Mudah)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

1. Buka [https://supabase.com](https://supabase.com) dan buat project baru
2. Tunggu sampai project selesai dibuat
3. Buka **SQL Editor** di dashboard Supabase
4. Copy semua isi file `supabase.sql` dari project ini
5. Paste dan jalankan di SQL Editor

### 3. Buat Storage Buckets

Di dashboard Supabase, buka **Storage** dan buat 2 bucket:
- `avatars` (public)
- `post-images` (public)

### 4. Setup Environment Variables

Buat file `.env.local` di root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=url_project_supabase_anda
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key_supabase_anda
```

Dapatkan nilai-nilai ini dari Supabase > Settings > API

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka browser di [http://localhost:3000](http://localhost:3000)

## 👤 Membuat Akun Admin

1. Klik **Register** di website
2. Isi form registrasi dengan data Anda
3. Buka Supabase > **SQL Editor**
4. Jalankan query ini (ganti dengan email Anda):

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'email-anda@example.com'
);
```

5. Refresh browser - Anda sekarang admin!

## ✍️ Membuat Post Pertama

1. Login sebagai admin
2. Klik **Profile** di menu
3. Klik **Create Post**
4. Isi:
   - **Title**: Judul post Anda
   - **Content**: Tulis dalam format Markdown
   - **Excerpt**: Ringkasan singkat (opsional)
   - **Featured Image**: Upload gambar (opsional)
   - **Category**: Pilih kategori
   - **Tags**: Pilih tags yang relevan
   - **Status**: Pilih "Published" untuk publish langsung
5. Klik **Create Post**

## 📝 Tips Menulis dengan Markdown

### Headers
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Bold & Italic
```markdown
**Bold Text**
*Italic Text*
```

### List
```markdown
- Item 1
- Item 2
- Item 3
```

### Link
```markdown
[Text Link](https://url.com)
```

### Gambar
```markdown
![Alt Text](url-gambar.jpg)
```

### Code
```markdown
`inline code`

```javascript
// code block
const hello = "world"
```
```

### Quote
```markdown
> Ini adalah quote
```

## 🎨 Kustomisasi Blog

### Ubah Warna
Edit file `app/globals.css`:
```css
:root {
  --pink-gradient-from: #ff6b9d;  /* Warna pink Anda */
  --pink-gradient-to: #ffc3e0;    /* Warna pink lebih terang */
}
```

### Ubah About Page
Edit file `app/about/page.tsx` dengan informasi Anda.

### Ubah Contact Info
Edit file `app/contact/page.tsx` dengan email dan info kontak Anda.

### Ubah Judul Website
Edit file `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Nama Blog Anda",
  description: "Deskripsi blog Anda",
}
```

## 📂 Struktur Kategori Default

Blog sudah dilengkapi dengan kategori default:
- **Teknologi** - Artikel tentang teknologi dan pemrograman
- **Gaya Hidup** - Tips dan inspirasi gaya hidup
- **Tutorial** - Tutorial dan panduan
- **Personal** - Cerita dan pengalaman pribadi

Anda bisa menambah, edit, atau hapus kategori dari admin panel.

## 🏷️ Tags Default

- Next.js
- React
- TypeScript
- Web Development
- Design
- Productivity

## 🔒 Fitur Keamanan

Blog ini dilengkapi dengan:
- ✅ Autentikasi email/password
- ✅ OAuth Google
- ✅ Row Level Security (RLS)
- ✅ Admin-only content management
- ✅ Secure file uploads

## 📱 Fitur Responsive

Blog otomatis menyesuaikan tampilan untuk:
- 📱 Mobile (smartphone)
- 📱 Tablet
- 💻 Desktop

## 🚀 Deploy ke Production

### Deploy ke Vercel (Gratis & Mudah):

1. Push code ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <url-repo-github-anda>
   git push -u origin main
   ```

2. Buka [vercel.com](https://vercel.com)
3. Klik **New Project**
4. Import repository GitHub Anda
5. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Klik **Deploy**

Blog Anda akan live dalam beberapa menit! 🎉

## 🆘 Troubleshooting

### Error "User not authenticated"
- Pastikan sudah login
- Cek environment variables sudah benar
- Clear browser cache

### Tidak bisa upload gambar
- Cek storage buckets sudah dibuat
- Pastikan buckets bersifat public
- Cek ukuran file tidak terlalu besar

### Tidak bisa create post
- Pastikan user Anda sudah role 'admin'
- Cek di Supabase SQL Editor
- Jalankan query untuk update role

### Error saat deploy
- Pastikan environment variables sudah ditambahkan
- Cek build errors di Vercel logs
- Pastikan semua dependencies terinstall

## 📚 Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Markdown Guide**: [markdownguide.org](https://www.markdownguide.org)

## 💡 Tips

1. **Backup Database**: Export SQL secara berkala dari Supabase
2. **Optimasi Gambar**: Compress gambar sebelum upload
3. **SEO**: Gunakan excerpt untuk meta description
4. **Konsisten**: Post secara rutin untuk engagement
5. **Engage**: Balas komentar pembaca Anda

## 🎯 Fitur Utama

### Untuk Pengunjung:
- 📖 Baca artikel dengan tampilan yang indah
- 🔍 Filter berdasarkan kategori
- 💬 Komentar di artikel (perlu login)
- 📧 Kontak via form

### Untuk Admin:
- ✍️ Buat dan edit post
- 🖼️ Upload gambar
- 📊 Lihat view count
- 🏷️ Kelola kategori dan tags
- 📝 Draft dan publish post

## 🎨 Desain

Blog ini menggunakan:
- **Warna**: Pink gradient dengan background putih/terang
- **Font**: Inter (body) dan Playfair Display (heading)
- **Style**: Modern, elegan, minimalis dengan sentuhan girly

## 📞 Butuh Bantuan?

1. Baca **README.md** untuk dokumentasi lengkap
2. Baca **SETUP.md** untuk setup detail
3. Cek browser console untuk error messages
4. Lihat Supabase logs di dashboard

---

Selamat membuat blog! 💕✨

**Happy Blogging!** 🎉


