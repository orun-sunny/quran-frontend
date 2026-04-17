This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev



# 📖 Quran Web App

A modern, responsive Quran web application built with **Next.js (SSG)** and **Node.js API**, featuring searchable ayahs, customizable reading settings, and clean UI design.

---

## 🚀 Live Features

* 📚 **Surah List Page**

  * Displays all 114 Surahs
  * Shows both **Arabic** and **English names**

* 📖 **Ayah (Verse) Page**

  * Displays all ayahs of a selected surah
  * Includes:

    * Arabic text
    * English translation

* 🔍 **Search Functionality**

  * Search ayahs by translation text
  * Case-insensitive and partial match supported

* ⚙️ **Settings Panel (Sidebar)**

  * Arabic font selection (minimum 2 fonts)
  * Arabic font size adjustment
  * Translation font size adjustment
  * Settings persist using **localStorage**

* 📱 **Responsive UI**

  * Works across mobile, tablet, and desktop
  * Clean and readable layout

---

## 🛠️ Tech Stack

### Frontend

* **Next.js (App Router with SSG)**
* **Tailwind CSS**

### Backend

* **Node.js API (or Next.js API routes)**
* JSON-based data handling

### Database

* Quran dataset collected from open-source platforms (e.g., GitHub)
* Stored as structured **JSON**

---

## 📁 Project Structure

```
/app
  /api
    /surahs
    /surahs/[id]
    /search
  /surah/[id]
  /search
/components
/context
/hooks
/data
  quran.json
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quran-app.git
cd quran-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Get all surahs

```
GET /api/surahs
```

### Get ayahs of a surah

```
GET /api/surahs/:id
```

### Search ayahs

```
GET /api/search?q=keyword
```

---

## 🎨 Customization Features

### Fonts

* At least 2 Arabic fonts (e.g., Amiri, Scheherazade)

### Settings Stored in:

* `localStorage`

Example:

```js
localStorage.setItem("arabicFont", "amiri");
localStorage.setItem("arabicSize", "24");
localStorage.setItem("translationSize", "16");
```

---

## ⚡ Performance

* Uses **Static Site Generation (SSG)** for faster load times
* Optimized rendering for better SEO and performance

---

## 📌 Future Improvements

* Bookmark favorite ayahs
* Multiple translations
* Audio recitation support
* Dark mode

---

## 🤝 Contribution

Feel free to fork the project and submit pull requests.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🙌 Acknowledgements

* Open-source Quran datasets from GitHub
* Islamic font libraries
* Developer community resources

---

## 👨‍💻 Author

**Md. Orun Sunny**
Frontend Developer | React | Next.js | Tailwind CSS

```

Open [http://localhost:3000](http://localhost:5000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



