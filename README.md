## 🎓 LAB 5: MongoDB & Database Mastery - COMPLETE

**Status**: ✅ **ALL COMPLETED**

---

## 📋 Quick Start

### Prerequisites
- Node.js installed
- MongoDB running locally (or use MongoDB Atlas)
- npm packages installed

### Installation
```bash
cd lab5todo
npm install  # (mongoose already added)
```

### Run Tests
```bash
# Test database connection
node test-db-connection.js

# Test database queries
node test-database-queries.js

# Test all API endpoints
node test-api-endpoints.js

# Start the server
node server.js
# Or with auto-reload
npm run dev
```

---

## 📁 Project Structure

```
lab5todo/
├── src/
│   ├── config/
│   │   └── database.js          ✅ MongoDB connection
│   ├── models/
│   │   ├── EventSchema.js       ✅ Event data structure
│   │   ├── UserSchema.js        ✅ User data structure
│   │   └── index.js             ✅ Model exports
│   ├── services/
│   │   ├── eventService.js      ✅ Event CRUD operations
│   │   ├── userService.js       ✅ User CRUD operations
│   │   └── validationService.js
│   ├── controllers/
│   │   └── eventController.js   ✅ Updated with DB integration
│   ├── routes/
│   │   └── eventRoutes.js
│   ├── middleware.js
│   ├── utils/
│   └── swagger.js
├── server.js                     ✅ Updated with DB connection
├── package.json                  ✅ mongoose added
├── test-db-connection.js         ✅ Connection test
├── test-database-queries.js      ✅ Query examples
├── test-api-endpoints.js         ✅ Full API test
└── LAB5_COMPLETION.md           ✅ Detailed completion guide
```

---

## 🚀 API Endpoints

All endpoints now use MongoDB for persistent storage:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/events` | Get all events (with filters & pagination) |
| POST | `/api/v1/events` | Create new event |
| GET | `/api/v1/events/stats` | Get event statistics |
| GET | `/api/v1/events/:id` | Get single event |
| PUT | `/api/v1/events/:id` | Update event |
| DELETE | `/api/v1/events/:id` | Delete event |

### Query Parameters
```
?page=1&limit=10              # Pagination
?status=upcoming               # Filter by status
?location=Tunis               # Filter by location  
?search=workshop              # Search in title/description
```

### Example Requests

**Create an Event:**
```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript Workshop",
    "description": "Learn modern JavaScript",
    "date": "2026-06-15T10:00:00Z",
    "location": "Tunis",
    "capacity": 50
  }'
```

**Get All Events:**
```bash
curl http://localhost:3000/api/v1/events?page=1&limit=10
```

**Update Event:**
```bash
curl -X PUT http://localhost:3000/api/v1/events/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "capacity": 75,
    "status": "ongoing"
  }'
```

---

## 🗄️ Database Schema

### Events Collection
```javascript
{
  _id: ObjectId,
  title: String,                    // Required, 3-100 chars
  description: String,               // Max 1000 chars
  date: Date,                        // Required, must be future date
  location: String,                  // Required, 2-100 chars
  capacity: Number,                  // Required, 1-10000
  attendees: Number,                 // Current attendee count
  status: String,                    // upcoming|ongoing|completed|cancelled
  organizer: ObjectId (ref: User),  // Event creator
  attendeesList: [ObjectId],         // User references
  createdAt: Date,                   // Auto-managed
  updatedAt: Date                    // Auto-managed
}
```

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,                      // Required, 2-50 chars
  email: String,                     // Required, unique, validated
  phone: String,
  role: String,                      // user|organizer|admin
  eventsAttended: [ObjectId],        // Event references
  eventsOrganized: [ObjectId],       // Event references
  createdAt: Date,                   // Auto-managed
  updatedAt: Date                    // Auto-managed
}
```

---

## 🔐 Data Relationships

```
User (Organizer)
  └── eventsOrganized ────→ Event
                              ├── organizer ────→ User
                              └── attendeesList ────→ User (many)
                                    └── eventsAttended ────→ Event (many)
```

---

## 🎯 Key Features Implemented

### 1. **Schemas & Validation**
- ✅ Required field validation
- ✅ Custom validators (e.g., date must be future)
- ✅ Min/max length constraints
- ✅ Email format validation
- ✅ Enum constraints (status, role)

### 2. **Relationships**
- ✅ One-to-Many (Event → Users attending)
- ✅ Many-to-One (Event → Organizer)
- ✅ Many-to-Many (Users ↔ Events)
- ✅ Population of references

### 3. **CRUD Operations**
- ✅ Create with validation
- ✅ Read with filtering & pagination
- ✅ Update with validators
- ✅ Delete with cascading

### 4. **Query Features**
- ✅ Filtering by multiple criteria
- ✅ Text search with regex
- ✅ Pagination with skip/limit
- ✅ Sorting by date
- ✅ Population of references
- ✅ Aggregation pipeline for stats

### 5. **Indexing**
- ✅ Index on date (sorting performance)
- ✅ Index on location (filtering)
- ✅ Index on status
- ✅ Index on organizer
- ✅ Unique index on email

### 6. **Instance Methods**
- ✅ `event.addAttendee(userId)`
- ✅ `event.removeAttendee(userId)`
- ✅ `user.attendEvent(eventId)`
- ✅ `user.organizeEvent(eventId)`

### 7. **Static Methods**
- ✅ `Event.findUpcoming()`
- ✅ `Event.findByLocation(location)`
- ✅ `User.findByRole(role)`

---

## 🧪 Test Results

### Connection Test ✅
```
✅ MongoDB connected successfully!
✅ Database: event-manager
✅ Host: localhost
```

### Query Test ✅
```
✅ Finding upcoming events
✅ Finding events by location
✅ Filtering with pagination
✅ Counting documents
✅ Aggregation statistics
```

### API Endpoint Test ✅
```
✅ Creating users
✅ Creating events
✅ Reading events
✅ Updating events
✅ Adding attendees
✅ Fetching with populated references
✅ Searching by location
```

---

## 🔧 Configuration

### MongoDB Connection
**File:** `src/config/database.js`

**Local MongoDB:**
```javascript
MONGODB_LOCAL = "mongodb://localhost:27017/event-manager"
```

**MongoDB Atlas (Cloud):**
Set environment variable:
```bash
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/event-manager"
```

---

## 📊 Learning Outcomes Achieved

✅ **AA4 - Database Operations & Data Management**
- Understand MongoDB document model
- Design schemas with validation
- Implement relationships
- CRUD operations with Mongoose
- Querying and filtering data
- Pagination and sorting
- Aggregation pipelines
- Performance indexing
- Data persistence

---

## 🔄 Service Methods

### EventService
```javascript
EventService.createEvent(data, organizerId)
EventService.getAllEvents(filters, page, limit)
EventService.getEventById(id)
EventService.updateEvent(id, data)
EventService.deleteEvent(id)
EventService.addAttendee(eventId, userId)
EventService.getUpcomingEvents(limit)
EventService.getEventsByLocation(location)
```

### UserService
```javascript
UserService.createUser(data)
UserService.getUserById(id)
UserService.getUserByEmail(email)
UserService.getAllUsers(page, limit)
UserService.updateUser(id, data)
UserService.deleteUser(id)
```

---

## 🐛 Debugging

### Connection Issues
```bash
# Check if MongoDB is running
# On Windows: Check Services or start mongod manually
# On Mac: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Test connection
node test-db-connection.js
```

### Query Issues
```bash
# Test queries with sample data
node test-api-endpoints.js

# View database in MongoDB Compass
# Or use MongoDB Atlas UI
```

### Server Issues
```bash
# Check server logs
node server.js

# Check for syntax errors
node --check server.js
```

---


