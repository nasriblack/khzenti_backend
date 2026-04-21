# ✅ Quick Setup Checklist

Use this checklist to get your Khzenti backend up and running!

## 📋 Pre-Installation Checklist

- [ ] Node.js v18+ installed
- [ ] PostgreSQL installed and running
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Postman or similar API testing tool

---

## 🚀 Installation Steps

### 1. Project Setup
- [ ] Navigate to project directory
- [ ] Run `npm install`
- [ ] Wait for all dependencies to install

### 2. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Update `DATABASE_URL` with your PostgreSQL credentials
- [ ] Generate strong `JWT_SECRET` (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Generate strong `JWT_REFRESH_SECRET`

### 3. External Services Setup
- [ ] Create [Cloudinary](https://cloudinary.com/) account
- [ ] Copy Cloudinary credentials to `.env`:
  - [ ] `CLOUDINARY_CLOUD_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
- [ ] Create [OpenRouter](https://openrouter.ai/) account
- [ ] Get OpenRouter API key
- [ ] Add `OPENROUTER_API_KEY` to `.env`

### 4. Database Setup
- [ ] Create PostgreSQL database: `createdb khzenti_db`
- [ ] Or create via GUI (pgAdmin, DBeaver, etc.)
- [ ] Verify database connection in `.env`

### 5. Prisma Setup
- [ ] Run `npm run prisma:generate`
- [ ] Run `npm run prisma:push`
- [ ] Verify tables created (optional: `npm run prisma:studio`)

### 6. Start Development
- [ ] Run `npm run dev`
- [ ] Verify server starts successfully
- [ ] Check health endpoint: `http://localhost:5000/health`

---

## 🧪 Testing Checklist

### Basic API Tests
- [ ] Test health endpoint
- [ ] Register a new user
- [ ] Login with user credentials
- [ ] Get user profile
- [ ] Update user profile

### Wardrobe Tests
- [ ] Add wardrobe item without image
- [ ] Add wardrobe item with image
- [ ] Get all wardrobe items
- [ ] Update a wardrobe item
- [ ] Delete a wardrobe item

### Outfit Tests
- [ ] Create an outfit
- [ ] Get all outfits
- [ ] Update an outfit
- [ ] Mark outfit as favorite

### AI Tests
- [ ] Generate AI recommendations
- [ ] Analyze outfit combination

---

## 🔧 Configuration Verification

### Check These Files Exist:
- [ ] `src/app.ts`
- [ ] `src/server.ts`
- [ ] `src/config/database.ts`
- [ ] `src/config/cloudinary.ts`
- [ ] `src/config/openrouter.ts`
- [ ] `src/prisma/schema.prisma`
- [ ] `.env` (not .env.example)

### Check Package.json Scripts:
- [ ] `npm run dev` works
- [ ] `npm run build` works
- [ ] `npm run prisma:studio` opens GUI

---

## 📱 Postman Setup

- [ ] Create new Postman collection "Khzenti API"
- [ ] Add environment variable `baseUrl`: `http://localhost:5000/api/v1`
- [ ] Add environment variable `accessToken`: (will be set after login)
- [ ] Import requests from `API_EXAMPLES.md`
- [ ] Test register endpoint
- [ ] Save access token to environment

---

## 🎯 First Week Goals

### Day 1-2: Setup & Testing
- [ ] Complete all installation steps
- [ ] Test all basic endpoints
- [ ] Familiarize with code structure

### Day 3-4: Authentication Deep Dive
- [ ] Understand JWT flow
- [ ] Test token refresh
- [ ] Implement password reset (optional)

### Day 5-6: Image Upload
- [ ] Test image upload with real photos
- [ ] Verify Cloudinary integration
- [ ] Test image compression

### Day 7: AI Integration
- [ ] Test AI recommendations
- [ ] Experiment with different prompts
- [ ] Analyze outfit combinations

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

### Server Won't Start
- [ ] Check `.env` file exists
- [ ] Verify PostgreSQL is running
- [ ] Check if port 5000 is available
- [ ] Review console error messages

### Database Errors
- [ ] Verify database exists
- [ ] Check DATABASE_URL format
- [ ] Run `npm run prisma:generate` again
- [ ] Check PostgreSQL credentials

### Prisma Errors
- [ ] Delete `node_modules/.prisma`
- [ ] Run `npm run prisma:generate` again
- [ ] Verify schema.prisma syntax

### Image Upload Errors
- [ ] Verify Cloudinary credentials
- [ ] Check file size (max 5MB)
- [ ] Verify file format (JPEG, PNG, WebP)

### AI Errors
- [ ] Verify OpenRouter API key
- [ ] Check API credits/quota
- [ ] Review prompt structure

---

## 📚 Learning Checklist

### Week 1 - Understand:
- [ ] Project folder structure
- [ ] How modules are organized
- [ ] Authentication flow
- [ ] Database relationships

### Week 2 - Master:
- [ ] Prisma queries
- [ ] Image processing
- [ ] Error handling
- [ ] API design patterns

### Week 3 - Explore:
- [ ] AI prompt engineering
- [ ] Advanced TypeScript
- [ ] Performance optimization

---

## 🎉 Success Indicators

You're ready to move forward when:
- [ ] Server starts without errors
- [ ] Can register and login
- [ ] Can upload images successfully
- [ ] Database has test data
- [ ] AI recommendations work
- [ ] Understand code structure
- [ ] Know how to add new features

---

## 📝 Daily Development Checklist

Every coding session:
- [ ] Pull latest changes (if using Git)
- [ ] Start PostgreSQL
- [ ] Start dev server: `npm run dev`
- [ ] Open Prisma Studio (optional)
- [ ] Open Postman for testing
- [ ] Update README.md with learnings
- [ ] Commit changes

---

## 🚀 Ready to Launch?

Before considering production:
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables secured
- [ ] Database migrated properly
- [ ] API documentation complete
- [ ] Error handling comprehensive
- [ ] Images uploading correctly
- [ ] AI integration stable

---

**Last Updated:** April 12, 2026  
**Status:** ✅ Ready for Development  

**Let's build something amazing! 🎨👗✨**
