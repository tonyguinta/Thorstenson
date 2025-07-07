# Tiller Bros Guide Service Website

A modern, responsive website for James ("Jamie") Thorstenson's fishing guide business in Ely, Minnesota. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach optimized for all devices
- **Hero Section**: Stunning fishing photography with compelling call-to-action
- **Photo Gallery**: Showcase of recent catches and fishing adventures
- **Professional Layout**: Clean, modern design reflecting the northern Minnesota wilderness
- **Performance Optimized**: Built with Next.js for fast loading and SEO

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Development Server

```bash
# Install dependencies
npm install

# Start development server (configured for port 3001)
npm run dev

# Alternative with Turbopack (better for WSL)
npm run dev-turbo
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Other Commands

```bash
npm run build    # Production build
npm run start    # Start production server  
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── about/          # About page
│   ├── booking/        # Booking page  
│   ├── contact/        # Contact page
│   ├── faq/           # FAQ page
│   ├── gallery/       # Photo gallery
│   ├── services/      # Services page
│   └── page.tsx       # Homepage
├── components/         # Reusable components
│   ├── layout/        # Header, Footer
│   ├── ui/           # UI components
│   └── forms/        # Form components
└── lib/              # Utilities
public/
└── photos/           # Fishing and family photos
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **Icons**: Heroicons
- **Forms**: React Hook Form with Zod validation
- **Image Optimization**: Next.js Image component
- **Development**: Turbopack for fast hot reload

## Deployment

Deploy to Vercel (recommended):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/thorstenson-guide)

## License

Private project for Tiller Bros Guide Service.
