# UDNewsUpdate - Thai News Website

## Overview

This is a modern Thai news website built with React (TypeScript) frontend and Express.js backend. The application provides a comprehensive news portal with categorized articles, search functionality, content management system, and a responsive design optimized for Thai content consumption.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 14, 2025)

- ✅ Integrated custom UDNewsUpdate logo and branding
- ✅ Updated site name to "UDNewsUpdate" with tagline "อัพเดทข่าวฮอต"
- ✅ Added "made by ashura" attribution in footer and about page
- ✅ Created complete admin panel for content management (/admin)
- ✅ Added article CRUD operations (Create, Read, Update, Delete)
- ✅ Implemented content management system with form validation
- ✅ All pages working with Thai language support and responsive design

## System Architecture

The application follows a full-stack architecture with clear separation between client and server:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Structure**: Uses shadcn/ui component library for consistent UI elements
- **Styling**: Tailwind CSS with custom orange/yellow color scheme matching Thai branding
- **Layout**: Responsive design with header, footer, and main content areas
- **Fonts**: Thai-optimized fonts (Sarabun, Prompt) for better readability
- **State Management**: TanStack Query for API data fetching and caching

### Backend Architecture
- **API Design**: RESTful endpoints organized by resource type
- **Data Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Storage**: Abstracted storage interface with in-memory implementation for development
- **Development**: Vite integration for hot module replacement in development

### Database Schema
The application uses three main entities:
- **Categories**: News categories (politics, economy, sports, etc.) with color coding
- **Articles**: News articles with metadata (title, content, author, views, featured status)
- **Contacts**: Contact form submissions

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Drizzle ORM manages database operations with type safety
4. **Response Handling**: JSON responses are cached and managed by TanStack Query
5. **UI Updates**: React components automatically re-render when data changes

### Key API Endpoints
- `/api/categories` - Category management
- `/api/articles` - Article CRUD operations with filtering
- `/api/articles/featured` - Featured article retrieval
- `/api/articles/breaking` - Breaking news
- `/api/articles/:id` - Update/Delete specific article
- `/api/contact` - Contact form submissions

### Content Management
- Admin panel available at `/admin` route
- Full CRUD operations for articles
- Form validation with Zod schemas
- Real-time updates with TanStack Query
- Support for featured articles, breaking news, and categories

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL (@neondatabase/serverless)
- **ORM**: Drizzle ORM with Zod validation
- **UI Components**: Radix UI primitives via shadcn/ui
- **Styling**: Tailwind CSS with PostCSS
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns for Thai date formatting

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Linting**: ESBuild for production builds
- **Development**: Hot reload with Vite dev server

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: ESBuild bundles Express server for production
3. **Static Assets**: Frontend builds to `dist/public` directory
4. **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- **Development**: Uses Vite dev server with Express API
- **Production**: Serves static files through Express with API routes
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Deployment Requirements
- Node.js runtime
- PostgreSQL database (Neon serverless recommended)
- Environment variables for database connection
- Static file serving capability

The application is designed to be deployed on platforms like Replit, Vercel, or similar Node.js hosting services with database support.