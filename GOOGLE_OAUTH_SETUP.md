# 🔐 Cara Setup Google OAuth di Supabase

Panduan lengkap setup Google OAuth untuk Alchira Blog.

## ⚠️ Error yang Anda Alami

```json
{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}
```

Error ini berarti **Google OAuth belum diaktifkan di Supabase**. Mari kita fix!

---

## 📝 Langkah-Langkah Setup

### 1️⃣ Setup di Google Cloud Console

#### A. Buat/Pilih Project

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Login dengan akun Google Anda
3. Klik dropdown project di bagian atas
4. Klik **"New Project"**
5. Isi:
   - **Project name**: `Alchira Blog` (atau nama lain)
   - **Location**: biarkan default
6. Klik **"Create"**
7. Tunggu sampai project selesai dibuat

#### B. Enable Google+ API (PENTING!)

1. Pastikan project Anda sudah terpilih (lihat di top bar)
2. Di sidebar kiri, klik **"APIs & Services"** → **"Library"**
3. Di search box, ketik: `Google+ API`
4. Klik hasil pertama: **"Google+ API"**
5. Klik tombol **"ENABLE"**
6. Tunggu sampai enabled (beberapa detik)

#### C. Configure OAuth Consent Screen

1. Di sidebar, klik **"APIs & Services"** → **"OAuth consent screen"**
2. Pilih **"External"** (untuk bisa dipakai siapa saja)
3. Klik **"CREATE"**
4. Isi form **"OAuth consent screen"**:
   ```
   App name: Alchira Blog
   User support email: [pilih email Anda dari dropdown]
   App logo: [skip, opsional]
   Application home page: http://localhost:3000 (ganti nanti saat production)
   Application privacy policy link: [skip untuk development]
   Application terms of service link: [skip untuk development]
   Authorized domains: [skip untuk development]
   Developer contact information: [email Anda]
   ```
5. Klik **"SAVE AND CONTINUE"**
6. Di halaman **"Scopes"**: langsung klik **"SAVE AND CONTINUE"** (skip)
7. Di halaman **"Test users"**: langsung klik **"SAVE AND CONTINUE"** (skip)
8. Review summary, lalu klik **"BACK TO DASHBOARD"**

#### D. Buat OAuth Client ID (TUNGGU DULU!)

**JANGAN buat OAuth Client ID dulu!** Kita perlu dapat Callback URL dari Supabase dulu.

---

### 2️⃣ Setup di Supabase Dashboard

#### A. Get Callback URL

1. Login ke [Supabase Dashboard](https://supabase.com)
2. Pilih project Anda (Alchira Blog)
3. Di sidebar kiri, klik **"Authentication"** (ikon gembok)
4. Klik tab **"Providers"**
5. Scroll ke bawah, cari **"Google"**
6. **JANGAN toggle ON dulu!**
7. Di situ Anda akan lihat:
   ```
   Callback URL (for OAuth)
   https://xyzabc.supabase.co/auth/v1/callback
   ```
   (URL Anda akan berbeda, sesuai project ID Anda)
8. **COPY URL ini!** Simpan di notepad/text editor

#### B. Screenshot untuk Referensi

Di halaman Google provider, Anda akan lihat form seperti ini:
```
┌─────────────────────────────────────────────────┐
│ Google                                    [OFF] │
├─────────────────────────────────────────────────┤
│ Callback URL (for OAuth)                        │
│ https://xyzabc.supabase.co/auth/v1/callback    │
│                                                  │
│ Client ID (for OAuth)                           │
│ [_____________________________________]          │
│                                                  │
│ Client Secret (for OAuth)                       │
│ [_____________________________________]          │
│                                                  │
│                            [Save] [Cancel]      │
└─────────────────────────────────────────────────┘
```

---

### 3️⃣ Kembali ke Google Cloud Console - Buat OAuth Client ID

#### A. Create Credentials

1. Kembali ke [Google Cloud Console](https://console.cloud.google.com)
2. Pastikan project yang benar terpilih
3. Di sidebar, klik **"APIs & Services"** → **"Credentials"**
4. Klik **"+ CREATE CREDENTIALS"** (di bagian atas)
5. Pilih **"OAuth client ID"**

#### B. Configure OAuth Client

1. **Application type**: Pilih **"Web application"**
2. **Name**: `Alchira Blog OAuth Client` (atau nama lain)
3. **Authorized JavaScript origins** - Klik "ADD URI":
   - Development: `http://localhost:3000`
   - Production (nanti): `https://your-domain.com`
4. **Authorized redirect URIs** - Klik "ADD URI" (INI YANG PENTING!):
   - Paste **Callback URL dari Supabase** yang tadi Anda copy
   - Contoh: `https://xyzabc.supabase.co/auth/v1/callback`
   - ⚠️ **PASTIKAN URL PERSIS SAMA!** Tidak ada spasi, tidak ada typo!

#### C. Screenshot Contoh

```
Application type: Web application

Name: Alchira Blog OAuth Client

Authorized JavaScript origins:
  http://localhost:3000

Authorized redirect URIs:
  https://xyzabc.supabase.co/auth/v1/callback  ← INI DARI SUPABASE!
```

5. Klik **"CREATE"**

#### D. Copy Credentials

Setelah klik Create, akan muncul popup dengan:
```
OAuth client created

Your Client ID:
123456789-abc123def456.apps.googleusercontent.com

Your Client Secret:
GOCSPX-abcdef123456789xyz
```

- **COPY Client ID** (panjang, berakhir dengan `.apps.googleusercontent.com`)
- **COPY Client Secret** (string random)
- Simpan keduanya di tempat aman (notepad/text editor)

---

### 4️⃣ Masukkan Credentials ke Supabase

#### A. Enable Google Provider

1. Kembali ke **Supabase Dashboard**
2. **Authentication** → **Providers** → **Google**
3. Toggle **"Enable Sign in with Google"** ke **ON** ✅
4. Paste credentials:
   - **Client ID**: Paste Client ID dari Google
   - **Client Secret**: Paste Client Secret dari Google
5. Klik **"Save"**

#### B. Verify Setup

Setelah save, Anda tidak akan dapat error lagi. Settings akan tersimpan.

---

### 5️⃣ Test Google OAuth

#### A. Test di Development

1. Jalankan aplikasi Anda:
   ```bash
   npm run dev
   ```

2. Buka browser: `http://localhost:3000`

3. Klik **"Login"** atau **"Register"**

4. Klik tombol **"Continue with Google"**

5. Akan muncul popup Google Sign-In

6. Pilih akun Google Anda

7. Klik **"Allow"** untuk memberikan permission

8. Anda akan di-redirect kembali ke aplikasi dan otomatis login!

#### B. Check di Supabase

1. Buka **Supabase Dashboard** → **Authentication** → **Users**
2. User baru akan muncul dengan provider "google"
3. Profile akan otomatis dibuat di table `profiles`

---

## 🔧 Untuk Production (Deploy ke Vercel)

Setelah deploy ke Vercel, Anda perlu update:

### A. Update di Google Cloud Console

1. Buka **Credentials** → Edit OAuth Client
2. **Authorized JavaScript origins** - tambah:
   ```
   https://your-domain.vercel.app
   ```
3. **Authorized redirect URIs** - TETAP pakai callback URL Supabase yang sama:
   ```
   https://xyzabc.supabase.co/auth/v1/callback
   ```
   (Tidak perlu tambah URL Vercel!)
4. Klik **"Save"**

### B. Tidak Perlu Update di Supabase

Supabase sudah configured, tidak perlu update apapun untuk production!

---

## ✅ Checklist Setup Google OAuth

Gunakan ini untuk memastikan semuanya benar:

- [ ] Project dibuat di Google Cloud Console
- [ ] Google+ API sudah enabled
- [ ] OAuth Consent Screen sudah configured
- [ ] Callback URL dari Supabase sudah di-copy
- [ ] OAuth Client ID sudah dibuat di Google
- [ ] Authorized redirect URIs sudah diisi dengan Callback URL Supabase
- [ ] Client ID sudah di-copy
- [ ] Client Secret sudah di-copy
- [ ] Google provider sudah di-enable di Supabase
- [ ] Client ID sudah di-paste di Supabase
- [ ] Client Secret sudah di-paste di Supabase
- [ ] Settings sudah di-save di Supabase
- [ ] Test login Google berhasil!

---

## 🐛 Troubleshooting

### Error: "Unsupported provider: provider is not enabled"
**Solusi**: Google OAuth belum di-enable di Supabase. Follow langkah 4 di atas.

### Error: "redirect_uri_mismatch"
**Solusi**: 
- Callback URL di Google Console tidak sama dengan Callback URL dari Supabase
- Copy paste lagi dengan hati-hati
- Pastikan tidak ada spasi atau karakter tambahan

### Error: "Access blocked: This app's request is invalid"
**Solusi**:
- Google+ API belum di-enable
- Pergi ke APIs & Services → Library
- Search "Google+ API" dan enable

### Error: "OAuth consent screen not configured"
**Solusi**:
- OAuth Consent Screen belum di-setup
- Follow langkah 1C di atas

### Popup Google Sign-In tidak muncul
**Solusi**:
- Browser blocking popups
- Allow popups untuk localhost atau domain Anda
- Atau coba browser lain

### User ter-create tapi profile tidak ter-create
**Solusi**:
- Check apakah trigger `on_auth_user_created` sudah ada di database
- Re-run `supabase.sql` jika perlu
- Atau create profile manual via SQL

---

## 📸 Screenshot Lokasi Penting

### Di Google Cloud Console:

1. **Navigation Menu** (☰) → **APIs & Services** → **Credentials**
2. **Navigation Menu** (☰) → **APIs & Services** → **OAuth consent screen**
3. **Navigation Menu** (☰) → **APIs & Services** → **Library**

### Di Supabase Dashboard:

1. **Sidebar** → **Authentication** (ikon gembok 🔒)
2. **Top Tabs** → **Providers**
3. **Scroll down** → **Google** section

---

## 🎉 Selesai!

Sekarang Google OAuth sudah berfungsi! User bisa:
- ✅ Register dengan Google
- ✅ Login dengan Google
- ✅ Profile otomatis ter-create
- ✅ Langsung bisa akses fitur yang memerlukan login

---

## 📝 Notes

- **Development**: Callback URL tetap pakai Supabase URL
- **Production**: Callback URL tetap pakai Supabase URL (sama)
- **Yang berubah saat production**: Hanya Authorized JavaScript origins
- **Keamanan**: Client Secret jangan di-commit ke git!
- **Email verification**: Optional, bisa di-disable di Supabase Auth settings

---

Butuh bantuan lebih lanjut? Check:
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)

**Happy coding!** 💕✨


