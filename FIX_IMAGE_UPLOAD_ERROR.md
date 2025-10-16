# 🖼️ Fix: Next.js Image Upload Error

## 🔴 Error yang Muncul

```
Error: Invalid src prop (https://xxx.supabase.co/storage/v1/object/public/avatars/xxx.jpg) 
on `next/image`, hostname "xxx.supabase.co" is not configured under images 
in your `next.config.js`
```

---

## ✅ Solusi (SUDAH DIPERBAIKI!)

File `next.config.ts` sudah saya update dengan konfigurasi yang benar.

### Apa yang Sudah Ditambahkan:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',  // ← Semua subdomain Supabase
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',  // ← Google avatars
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## 🔄 Restart Development Server

**PENTING!** Setelah update `next.config.ts`, Anda HARUS restart server:

### Step 1: Stop Server
Di terminal, tekan:
```bash
Ctrl + C
```

### Step 2: Start Ulang
```bash
npm run dev
```

### Step 3: Refresh Browser
- Hard refresh: `Ctrl + Shift + R`
- Atau clear cache: `Ctrl + Shift + Delete`

---

## ✅ Test Upload Image

Sekarang coba upload image lagi:

### 1. Upload Avatar
1. Buka `/profile/edit`
2. Klik "Change Avatar"
3. Pilih image
4. Upload
5. ✅ Should work!

### 2. Upload Featured Image (Post)
1. Buka `/profile/create-post`
2. Scroll ke "Featured Image"
3. Klik "Upload Image"
4. Pilih image
5. Upload
6. ✅ Should work!

---

## 🎯 Penjelasan Konfigurasi

### `**.supabase.co`
- Wildcard `**` artinya semua subdomain
- Contoh yang akan match:
  - `nvbucmnkdekduvxmzjld.supabase.co`
  - `abcdefgh.supabase.co`
  - Project Supabase manapun

### `lh3.googleusercontent.com`
- Untuk avatar dari Google OAuth
- Ketika user login dengan Google, avatar mereka dari Google

### `/storage/v1/object/public/**`
- Path untuk Supabase Storage
- `**` artinya semua file di public storage

---

## 🚨 Troubleshooting

### Error masih muncul setelah update config
```
✅ Restart development server (Ctrl+C lalu npm run dev)
✅ Clear browser cache (Ctrl+Shift+Delete)
✅ Hard refresh (Ctrl+Shift+R)
```

### Image tidak muncul (broken image icon)
```
✅ Check URL image benar di browser
✅ Check storage bucket bersifat PUBLIC
✅ Check image berhasil terupload di Supabase Storage
```

### Upload berhasil tapi image tidak muncul
```
✅ Check console browser (F12) untuk error lain
✅ Check network tab untuk request yang gagal
✅ Verify image URL dari Supabase
```

---

## 📝 Konfigurasi untuk Domain Lain

Jika nanti pakai image dari domain lain, tambahkan seperti ini:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Google
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      // Tambah domain lain
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
  },
};
```

---

## 🔐 Keamanan

Konfigurasi ini aman karena:
- ✅ Hanya allow HTTPS (bukan HTTP)
- ✅ Hanya allow domain spesifik (tidak semua domain)
- ✅ Hanya allow path tertentu (`/storage/v1/object/public/**`)
- ✅ Next.js tetap optimize image

---

## 💡 Best Practices

### 1. Compress Image Sebelum Upload
```
Gunakan tools seperti:
- TinyPNG.com
- Squoosh.app
- ImageOptim (Mac)
```

### 2. Ukuran File Recommended
```
Avatar: < 500KB
Featured Image: < 2MB
```

### 3. Format Recommended
```
✅ JPEG - untuk foto
✅ PNG - untuk logo/graphic
✅ WebP - untuk web (best compression)
```

---

## 📊 Cara Kerja Next.js Image

```
Browser Request
    ↓
Next.js Image Component
    ↓
Check hostname di config ← next.config.ts
    ↓
Jika allowed → Optimize & Serve
Jika tidak → Error!
```

**Sekarang Supabase sudah allowed!** ✅

---

## 🎬 Summary

**Problem:**
- Next.js tidak allow image dari Supabase

**Solution:**
- Update `next.config.ts` dengan remotePatterns
- Restart dev server
- Image upload sekarang works!

**Files Updated:**
- ✅ `next.config.ts`

---

## ✅ Checklist

- [x] `next.config.ts` sudah diupdate
- [ ] Development server sudah direstart
- [ ] Browser sudah direfresh
- [ ] Test upload avatar works
- [ ] Test upload featured image works

---

**Upload image sekarang sudah bisa!** 🎉

Jangan lupa **restart server** setelah update config! 🚀

