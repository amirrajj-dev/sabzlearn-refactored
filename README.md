# 🎓 Sabzlearn - Modern E-Learning Platform

![Project Screenshot](/public/project-demo.png)

Sabzlearn is a full-stack e-learning platform featuring course management, article publishing, user engagement features, and an admin and user pannel and dashboard. Built with modern web technologies.

## 🚀 Features

- **Course Management**
  - Create/Edit/Update/Delete courses with sessions
  - Category system for organization
  - Discount codes and campaigns
  - Comment/rating system with replies
- **Content Publishing**
  - Rich text articles with CKEditor
  - Article categories and drafts
  - Related content suggestions
- **User System**
  - JWT Authentication & Authorization
  - Role-based access (Admin/User)
  - User profiles and course enrollment
- **Support System**
  - Ticket management with priorities
  - Real-time chat support
- **Admin Dashboard**
  - Comprehensive content management
  - User moderation tools
  - Analytics and reporting
- **Modern Tech Stack**
  - Next.js App Router
  - Prisma ORM with PostgreSQL
  - Zustand state management
  - Tailwind CSS + DaisyUI
- **Themes**
  - +10 Different themes🔥🔥🔥

## 🛠️ Technologies

![Tech Stack](https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,prisma,postgres,nodejs,docker,bun)

**Core Stack:**

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: Zustand
- **Backend**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: WebSockets
- **Auth**: JWT, Bcrypt
- **Cloud**: Cloudinary (Media Storage)
- **Email**: Nodemailer

## 📦 Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/sabzlearn-shop.git
   cd sabzlearn-refactored
   ```
2. **install Dependencies**
   ```bash
   bun install
   ```
3. **Environment Setup**
   ```bash
   DATABASE_URL="postgresql://"
   JWT_SECRET="your_jwt_secret"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   EMAIL_USER="your_email"
   EMAIL_PASSWORD="your_password"
   ```
4. **Database Setup**
   ```bash
   bun prisma db push
   bun run prisma generate
   bun run prisma migrate dev
   ```
5. **Run Development Server**
   ```bash
   bun run dev
   ```

## 🗄️ Database Schema
1. User
2. Course
3. Category
4. Comment
5. Session
6. Ticket
7. Reply
8. enum Role
9. enum TicketStatus
10. enum TicketPriority
11. enum TicketType

## ⚙️ Configuration

### Environment Variables

| Variable           | Description                     |
|--------------------|---------------------------------|
| `DATABASE_URL`     | PostgreSQL connection string    |
| `JWT_SECRET`       | JWT signing secret              |
| `CLOUDINARY_URL`   | Cloudinary API credentials      |
| `EMAIL_USER`       | Nodemailer email account        |
| `EMAIL_PASSWORD`   | Nodemailer email password       |

### Third-party Services
1. **Cloudinary** - For media storage
2. **PostgreSQL** - Primary database
3. **Nodemailer** - Email service for password resets

## 📚 API Documentation

### Server Actions Structure

/src/actions/
├── article.actions.ts
├── auth.actions.ts
├── category.actions.ts
├── comment.actions.ts
├── course.actions.ts
├── discount.actions.ts
├── session.actions.ts
├── ticket.actions.ts
└── user.actions.ts

## 🧠 State Management

## Zustand stores for each entity:

/src/stores/
├── auth.store.ts
├── article.store.ts
├── cart.store.ts
├── category.store.ts
├── comment.store.ts
├── course.store.ts
├── discount.store.ts
├── session.store.ts
├── ticket.store.ts
└── user.store.ts


## Hope You like It My Firend😉🩷