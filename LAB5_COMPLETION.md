## LAB 5: MONGODB & DATABASE MASTERY - COMPLETION GUIDE

### ✅ WHAT HAS BEEN COMPLETED

This document outlines all the work completed for LAB 5: MongoDB & Database Mastery, implementing persistent data storage with MongoDB and Mongoose.

---

### 📋 COMPLETED TASKS

#### ✅ Task 1: MongoDB Connection & Setup
- [x] Lab 5 structure copied from Lab 4
- [x] Mongoose package installed (`npm install mongoose`)
- [x] Database connection file created: `src/config/database.js`
- [x] Connection class with connect, disconnect, getConnection, getModels methods
- [x] Test connection file created: `test-db-connection.js`
- [x] Database connection verified and working ✅

#### ✅ Task 2: Mongoose Schemas & Models
- [x] Event schema created: `src/models/EventSchema.js`
  - Title validation (3-100 characters)
  - Description with max length
  - Date validation (must be in future)
  - Location, capacity, status fields
  - Organizer and attendeesList relationships
  - Pre-save middleware for timestamps
  - Methods: addAttendee(), removeAttendee()
  - Statics: findUpcoming(), findByLocation()
  - Performance indexes on date, location, status, organizer

- [x] User schema created: `src/models/UserSchema.js`
  - Name, email, phone, role fields
  - Email validation and unique constraint
  - eventsAttended and eventsOrganized arrays
  - Methods: attendEvent(), organizeEvent()
  - Statics: findByRole()

- [x] Models exported: `src/models/index.js`
  - Event model exported
  - User model exported

#### ✅ Task 3: Database CRUD Operations
- [x] Event service created: `src/services/eventService.js`
  - createEvent() - Create new event with organizer
  - getAllEvents() - Get all events with filtering, sorting, pagination
  - getEventById() - Retrieve single event with populated references
  - updateEvent() - Update event with validation
  - deleteEvent() - Delete event from database
  - addAttendee() - Add user to event attendees
  - getUpcomingEvents() - Get upcoming events only
  - getEventsByLocation() - Find events by location

- [x] User service created: `src/services/userService.js`
  - createUser() - Create new user
  - getUserById() - Retrieve user with populated events
  - getUserByEmail() - Find user by email
  - getAllUsers() - Get all users with pagination
  - updateUser() - Update user data
  - deleteUser() - Delete user from database

#### ✅ Task 4: Controller Updates & Integration
- [x] Event controller updated: `src/controllers/eventController.js`
  - Converted to async/await pattern
  - Integrated with EventService
  - getAllEvents() - Query with filtering & pagination
  - getEventById() - Get single event with validation
  - createEvent() - Create new event (with hardcoded organizer for now)
  - updateEvent() - Update with validation
  - deleteEvent() - Delete event

#### ✅ Task 5: Server Integration
- [x] server.js updated with:
  - Database import
  - Async startup function
  - Database connection on server start
  - Enhanced console messages showing database info

#### ✅ Task 6: Advanced Queries & Testing
- [x] Database queries test file: `test-database-queries.js`
- [x] Test coverage includes:
  - Finding upcoming events
  - Finding events by location
  - Filtering with pagination
  - Counting documents
  - Counting by status
  - Aggregation statistics

---

### 📁 FILE STRUCTURE

```
lab5todo/
├── src/
│   ├── config/
│   │   └── database.js (NEW) ✅
│   ├── models/
│   │   ├── EventSchema.js (NEW) ✅
│   │   ├── UserSchema.js (NEW) ✅
│   │   └── index.js (NEW) ✅
│   ├── services/
│   │   ├── eventService.js (NEW) ✅
│   │   ├── userService.js (NEW) ✅
│   │   └── validationService.js
│   ├── controllers/
│   │   └── eventController.js (UPDATED) ✅
│   ├── routes/
│   ├── middleware.js
│   ├── utils/
│   └── swagger.js
├── server.js (UPDATED) ✅
├── package.json (mongoose added) ✅
├── test-db-connection.js (NEW) ✅
└── test-database-queries.js (NEW) ✅
```

---

### 🚀 HOW TO RUN

#### 1. Start MongoDB (if not already running)
```bash
# For local MongoDB
mongod

# OR use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

#### 2. Test Database Connection
```bash
node test-db-connection.js
```

#### 3. Test Queries
```bash
node test-database-queries.js
```

#### 4. Start the Server
```bash
node server.js

# Or use dev mode with auto-reload
npm run dev
```

---

### 📊 DATABASE DESIGN

#### Collections Structure

**events collection:**
```
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  location: String,
  capacity: Number,
  attendees: Number,
  status: "upcoming|ongoing|completed|cancelled",
  organizer: ObjectId (ref: User),
  attendeesList: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

**users collection:**
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  role: "user|organizer|admin",
  eventsAttended: [ObjectId] (ref: Event),
  eventsOrganized: [ObjectId] (ref: Event),
  createdAt: Date,
  updatedAt: Date
}
```

---

### 🔍 KEY FEATURES IMPLEMENTED

1. **Relationships**
   - Events have organizer (User reference)
   - Events have attendeesList (User array reference)
   - Users track eventsAttended and eventsOrganized

2. **Validation**
   - Required fields enforced at schema level
   - Custom validators (date must be future)
   - Email format validation
   - Min/max length constraints

3. **Indexing**
   - Index on Event date (for sorting)
   - Index on Event location (for filtering)
   - Index on Event status
   - Index on Event organizer
   - Index on Event createdAt
   - Unique index on User email

4. **Middleware**
   - Pre-save hook to update timestamps
   - Automatic date validation

5. **Instance Methods**
   - Event.addAttendee()
   - Event.removeAttendee()
   - User.attendEvent()
   - User.organizeEvent()

6. **Static Methods**
   - Event.findUpcoming()
   - Event.findByLocation()
   - User.findByRole()

7. **Advanced Queries**
   - Text search with regex
   - Pagination with skip/limit
   - Filtering with multiple criteria
   - Aggregation pipeline for statistics
   - Population of referenced documents

---

### 🧪 TESTING RESULTS

✅ Database Connection Test: PASSED
✅ Query Tests: PASSED
✅ No syntax errors
✅ All CRUD operations functional

---

### 🎯 LEARNING OUTCOMES ACHIEVED

✅ **AA4 - Database Operations & Data Management**
- Understand MongoDB basics
- Schema design and validation
- Relationships (one-to-many, many-to-many)
- CRUD operations with Mongoose
- Querying and filtering
- Pagination and sorting
- Aggregation pipelines
- Performance indexing

---

### 🔗 API ENDPOINTS (WITH DATABASE)

All endpoints now use MongoDB for persistent storage:

```
GET    /api/v1/events                    (Get all events with filters)
POST   /api/v1/events                    (Create new event)
GET    /api/v1/events/:id                (Get single event)
PUT    /api/v1/events/:id                (Update event)
DELETE /api/v1/events/:id                (Delete event)
```

Query parameters:
- `?page=1&limit=10` - Pagination
- `?status=upcoming` - Filter by status
- `?location=Sfax` - Filter by location
- `?search=keyword` - Search in title/description

---

### 🔮 NEXT STEPS (LAB 6)

From the notes in the lab:
1. Authentication & JWT tokens
2. User registration/login
3. Authorization checks
4. User-specific operations
5. Role-based access control (user, organizer, admin)

---

### 📝 NOTES

- MongoDB connection uses local instance at `mongodb://localhost:27017/event-manager`
- Can be switched to MongoDB Atlas by setting MONGODB_URI environment variable
- Organizer ID is currently hardcoded as `507f1f77bcf86cd799439011` (will be replaced with authenticated user in LAB 6)
- All timestamp fields managed automatically by Mongoose

---

### 🎓 COMPLETION CHECKLIST

✅ All files created
✅ All services implemented
✅ Controllers updated to use services
✅ Server configured with database
✅ Connection testing working
✅ Query testing working
✅ No errors or warnings (duplicate index fixed)
✅ Ready for deployment with real data

**LAB 5 STATUS: COMPLETE ✅**
