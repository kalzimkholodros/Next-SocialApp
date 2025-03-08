# SMP (Social Media Platform)

A modern, dark-themed social media platform frontend built with Next.js. Features a sleek purple design with glassmorphism effects.


![image](https://github.com/user-attachments/assets/0898741b-3656-479a-a02e-1c9543097774)

## Overview

This project is a frontend-only implementation of a social media platform, focusing on modern UI/UX design principles. It's built for developers who want to explore Next.js and TailwindCSS implementation in a real-world social media context.

## Core Features

- **Post Creation**
  - Create text posts
  - Upload and preview images
  - Real-time feed updates

- **Modern UI Components**
  - Custom Modal system for Login/Signup
  - Responsive Navbar
  - Dark theme with purple accents
  - Glassmorphism design elements

- **Pages**
  - Home Feed
  - Explore Page
  - Messages Interface
  - User Profile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Image Handling**: Next.js Image Component
- **State Management**: React Hooks

## Quick Start

1. **Clone & Install**
```bash
git clone https://github.com/kalzimkholodros/Next-SocialApp.git
cd smp
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. Visit `http://localhost:3000`

## Development Notes

- Frontend-only implementation (no backend required)
- Posts are stored in component state (cleared on page refresh)
- Image uploads are handled with base64 encoding
- Fully responsive design for all screen sizes

## Component Structure

components/
├── Navbar/
│ └── Navbar.tsx # Main navigation
├── Modal/
│ └── Modal.tsx # Auth modals (Login/Signup)
└── Post/
└── Post.tsx # Post display component



## Styling Guide

The project uses a consistent color scheme:
- Primary: Purple (`#6D28D9`)
- Background: Dark gradient
- Text: White/Gray scale
- Accents: Purple variations

## Future Improvements

- [ ] Backend integration
- [ ] Persistent storage
- [ ] Authentication system
- [ ] Social interactions (likes, comments)
- [ ] Real-time messaging
- [ ] Profile customization

## Contributing

Feel free to fork and submit PRs. This is an open-source project aimed at learning and improvement.

## License

MIT License - feel free to use this project for learning and development.
