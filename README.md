# 🎵 SongFeed – A Next.js App for Sharing Music

**SongFeed** is a modern full-stack web app built with [Next.js](https://nextjs.org/) that allows users to sign in, view a public feed of songs, and submit new ones. Designed with a clean UI, dark theme, and simple user experience.

## ✨ Features

- 🔐 User authentication (via Google OAuth.)
- 📜 Public feed of submitted songs
- ➕ Submit new songs with title, artist, and link
- 🎨 Responsive, dark-themed UI built with Tailwind CSS & ShadCN components

## 🧱 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Auth**: [Auth.js](https://authjs.dev/)
- **Database**: PostgreSQL (via [Prisma](https://www.prisma.io/orm))
- **UI**: Tailwind CSS

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/songfeed.git
cd songfeed
npm install
# or
yarn install
```

### 2. Set up environment variables

- Copy `.env.example` to `.env` and fill out each of the fields

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.
