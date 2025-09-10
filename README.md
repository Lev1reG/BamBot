# BamBot

BamBot adalah chatbot WhatsApp berbasis aturan (rule-based) yang dirancang untuk memberikan edukasi tentang pengolahan bambu kepada masyarakat Kecamatan Sapuran, Wonosobo. Bot ini membantu memaksimalkan potensi ekonomi bambu yang melimpah di daerah tersebut.

## Demo

https://github.com/user-attachments/assets/b83fae6e-4593-45fe-b491-aa036c61c334

https://github.com/user-attachments/assets/e42be723-dd29-4971-bd54-8d7d5d8c7c58

## Struktur Project

```
src/
├── index.ts           # Entry point & WhatsApp integration
├── engine.ts          # Rule-based response engine
├── logger.ts          # Winston logging configuration
├── demo.ts            # Demo/testing file
└── test/
    └── engine.test.ts # Unit tests
```

## Setup & Installation

1. **Clone Repository**

   ```bash
   git clone https://github.com/Lev1reG/BamBot.git
   cd BamBot
   ```

2. **Install Dependencies**

   ```bash
    npm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

## Menjalankan Bot

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Running Tests

```bash
npm test
```

## Cara Penggunaan

1. Jalankan bot dengan `npm run dev` atau `npm start`
2. Scan QR code yang muncul di terminal dengan WhatsApp
3. Setelah terkoneksi, bot siap menerima pesan
4. Kirim pesan dengan prefix `@bambot` untuk mengaktifkan bot

## Logs

**Logs**: Tersimpan di folder `logs/` dengan digenerate otomatis saat aplikasi berjalan.

- `combined.log` - Semua log aplikasi
- `error.log` - Hanya log error
