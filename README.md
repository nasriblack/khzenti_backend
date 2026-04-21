# 🌟 Khzenti - AI Fashion Assistant for Tunisian Women

> An intelligent wardrobe management and fashion recommendation system powered by AI, tailored specifically for Tunisian women's fashion preferences and cultural context.

---

## 📋 Project Overview

Khzenti helps Tunisian women organize their wardrobe digitally and receive personalized AI-powered outfit recommendations based on weather, occasions, and personal style preferences.

### Tech Stack
- **Backend**: Node.js + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT
- **Image Processing**: Sharp.js
- **Cloud Storage**: Cloudinary
- **AI**: OpenRouter API
- **API Style**: RESTful

---

## 🗓️ Development Roadmap

### ✅ Phase 1: Foundation (Week 1-2) - April 2026
**Status**: 🚧 In Progress

- [x] Project setup and folder structure
- [x] Database schema design
- [x] Environment configuration
- [ ] Authentication system (JWT)
  - [ ] User registration
  - [ ] Login/Logout
  - [ ] Token refresh
  - [ ] Password reset
- [ ] Basic user CRUD operations
- [ ] Image upload with Sharp optimization
- [ ] Cloudinary integration

**Goals**: Have a working authentication system with image upload capability

---

### 🔄 Phase 2: Core Features (Week 3-4) - Late April 2026
**Status**: 📅 Planned

- [ ] Wardrobe Management
  - [ ] Add clothing items
  - [ ] Categorization (tops, bottoms, dresses, accessories)
  - [ ] Color & style tagging
  - [ ] Item search and filter
- [ ] User Profile Enhancement
  - [ ] Style preferences
  - [ ] Size information
  - [ ] Favorite colors
- [ ] Basic outfit creation (manual)

**Goals**: Users can fully manage their digital wardrobe

---

### 🎯 Phase 3: AI Integration (Week 5-6) - Early May 2026
**Status**: 📅 Planned

- [ ] OpenRouter API integration
- [ ] AI recommendation engine
  - [ ] Occasion-based suggestions
  - [ ] Weather-based recommendations
  - [ ] Color harmony analysis
  - [ ] Cultural appropriateness check
- [ ] Outfit rating system
- [ ] Style insights

**Goals**: Working AI that generates culturally relevant outfit suggestions

---

### 🚀 Phase 4: Advanced Features (Week 7-8) - Mid May 2026
**Status**: 💭 Ideas

- [ ] Social features (outfit sharing)
- [ ] Shopping suggestions
- [ ] Capsule wardrobe creation
- [ ] Statistics dashboard
- [ ] Tunisian brands integration
- [ ] Arabic language support

**Goals**: Make the app social and more engaging

---

### 🎨 Phase 5: Polish & Launch (Week 9-10) - Late May 2026
**Status**: 💭 Future

- [ ] Performance optimization
- [ ] Security audit
- [ ] API documentation (Swagger)
- [ ] Comprehensive testing
- [ ] Deployment setup (Docker)
- [ ] CI/CD pipeline
- [ ] Beta testing with Tunisian users

**Goals**: Production-ready application

---

## 📚 What I'm Learning From This Project


---

## 🛠️ Resources I'm Using

### Documentation & Guides
- [Prisma Docs](https://www.prisma.io/docs) - Database modeling and queries
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system mastery
- [Sharp.js Docs](https://sharp.pixelplumbing.com/) - Image processing
- [Cloudinary API](https://cloudinary.com/documentation) - Cloud storage
- [OpenRouter Docs](https://openrouter.ai/docs) - AI model integration
- [JWT.io](https://jwt.io/) - Token authentication

### Learning Platforms
- **YouTube**: Traversy Media, Fireship (Node.js patterns)
- **Articles**: Medium posts on fashion tech
- **Communities**: r/webdev, Stack Overflow

### Tools
- **Postman**: API testing
- **Prisma Studio**: Database visualization
- **DBeaver**: PostgreSQL management
- **Git**: Version control

---

## 🐛 Mistakes Made & Solutions

### Mistake #1: [TBD]
**Date**: Coming soon  
**Problem**: -  
**What Went Wrong**: -  
**Solution**: -  
**Lesson Learned**: -

---


## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Cloudinary account
- OpenRouter API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd khzenti_back_

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

### Database Setup

```bash
# Create PostgreSQL database
createdb khzenti_db

# Push schema to database
npm run prisma:push

# (Optional) Seed with sample data
npm run prisma:seed

# Open Prisma Studio to view data
npm run prisma:studio
```

---

## 📁 Project Structure

```
src/
├── config/          # Configuration files (DB, Cloudinary, OpenRouter)
├── modules/         # Feature modules (auth, users, outfits, wardrobe, ai)
│   └── [module]/
│       ├── controllers/
│       ├── services/
│       ├── dto/
│       └── routes.ts
├── middleware/      # Custom middleware (auth, error handling, validation)
├── utils/           # Utility functions (JWT, password, image, response)
├── types/           # TypeScript type definitions
├── prisma/          # Prisma schema
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

---

## 📝 Current Focus (Week 1-2)

**This Week's Goals:**
1. Complete authentication system
2. Test image upload and compression
3. Set up Cloudinary integration
4. Create basic user profile management

**Blockers:**
- None yet

**Next Week:**
- Start wardrobe management features
- Design outfit data model


**Last Updated**: April 12, 2026  
**Current Sprint**: Phase 1 - Foundation  
**Next Milestone**: Complete Auth System by April 19, 2026
