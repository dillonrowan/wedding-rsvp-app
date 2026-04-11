# Wedding RSVP App

A wedding website built for Jennifer & Dillon's wedding on October 18, 2024 at The Hummingbird House in Manchaca, TX. The site served as a central hub for guests to learn about the wedding, view photos, find travel info, and RSVP.

## About

This is a [Next.js](https://nextjs.org/) app styled with [Tailwind CSS](https://tailwindcss.com/). Prior to the wedding, the site included an RSVP feature that allowed guests to submit their attendance and food allergies / dietary preferences. That feature was removed after the wedding date.

### Pages

- **Home** — Hero photo and wedding date/venue details
- **Our Story** — The couple's story of how they met
- **Photos** — A responsive photo gallery
- **Q + A** — Frequently asked questions (attire, timeline, etc.)
- **Travel** — Recommended hotels near the venue
- **Registry** — Link to the couple's registry on The Knot

## Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form (used for the RSVP feature)
- **Backend:** Prior to removal of the RSVP feature, this application connected to a [Spring Boot API](https://github.com/dillonrowan/wedding-rsvp-app-api) hosted in an Amazon EC2 instance. Database was hosted in Amazon RDS.
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

| Command | Description |
| --- | --- |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run lint-fix` | Run ESLint with auto-fix |
