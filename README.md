# Sultan Md Aslam - Interactive CV & Portfolio Project

A high-performance, modern, and stylish developer portfolio and interactive CV application built with **React**, **Vite**, and **Tailwind CSS** showcasing **Sultan Md Aslam's** 5+ years of engineering experience in **Java, Spring Boot, Distributed Systems, Kafka, ScyllaDB, WebSocket, and High-Scale Backend Architecture**.

---

## 🚀 Key Highlights & Features

- **Profile & Hero Showcase**: Features transparent avatar from root (`7207-removebg-preview (1).png`), status pill, live availability, copy-to-clipboard email and phone triggers, and direct LinkedIn profile links.
- **Career Trajectory & Experience**: Full timeline of professional experience:
  - **Foodi (Software Engineer II, May 2025 – Present)**: Ridesharing trip orchestration, WebSocket gateway, Strategy Pattern dispatch, real-time driver ranking, RabbitMQ relay, and ScyllaDB/Redis optimizations.
  - **ADN Diginet Ltd (Software Engineer, Feb 2023 – Apr 2025)**: MetLife core services, Kafka idempotency, zero-downtime data migration, and K6 stress testing.
  - **Ctrends Software & Services Ltd (Software Engineer, Aug 2022 – Feb 2023)**: Enterprise Spring Boot applications.
  - **Asian Technology Limited (Programmer, Feb 2021 – Jul 2022)**: Backend microservices, Kafka pipelines, and MSSQL.
- **Architectural Deep Dives**: Dedicated case-study section highlighting **Ridesharing Real-time Trip Orchestration** and **Distributed Transaction / Kafka Idempotency**.
- **Interactive Skills Matrix**: Real-time search filter and categorization across:
  - Backend & Core (Java, Spring Boot, Microservices, SOLID, Strategy Pattern, WebSocket)
  - Messaging & Streaming (Kafka, Kafka Idempotency, RabbitMQ, Event-Driven)
  - Databases & In-Memory (PostgreSQL, ScyllaDB, Redis, MSSQL, MySQL)
  - DevOps, Cloud & Testing (Docker, Kubernetes, Gradle, Maven, Git, K6)
- **Education Section**: B.Sc. in Computer Science and Engineering from Premier University Chittagong (CGPA: 3.02).
- **Print & PDF Engine**: Includes `@media print` optimized template so pressing **"Print / PDF"** formats directly into an executive corporate resume layout.
- **Direct PDF Download**: Instant download access to original `Sultan_Md_Aslam_cv.pdf`.

---

## 🛠️ Project Structure

```text
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration with dark theme
├── vite.config.js               # Vite bundler config
├── public/
│   ├── profile.png              # Profile image (copied from root)
│   └── Sultan_Md_Aslam_cv.pdf   # Original resume PDF
└── src/
    ├── main.jsx                 # React root
    ├── App.jsx                  # Main application structure
    ├── index.css                # Tailwind, glassmorphism, and print rules
    ├── data/
    │   └── cvData.js            # Centralized CV data model
    └── components/
        ├── Navbar.jsx           # Responsive header with navigation & action buttons
        ├── Hero.jsx             # Hero section with avatar, badges & quick contacts
        ├── StatsBar.jsx         # Career metric counter cards
        ├── Experience.jsx       # Interactive experience timeline with role filters
        ├── SystemHighlights.jsx # Architectural case studies & system design
        ├── Skills.jsx           # Searchable skills matrix with progress bars
        ├── Education.jsx        # Academic background card
        ├── ContactSection.jsx   # Contact info with quick email inquiry composer
        ├── Footer.jsx           # Footer with navigation & back-to-top button
        └── PrintableCV.jsx      # Clean print-only executive resume layout
```

---

## 🏃 Running the Application

### 1. Development Server
```bash
npm run dev
```
Runs the development server on `http://localhost:3000` (or the next available port) with instant hot module replacement (HMR).

### 2. Production Build
```bash
npm run build
```
Generates an optimized production bundle inside the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```
Serves the generated production bundle locally.
