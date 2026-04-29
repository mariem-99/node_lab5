// ROUTES MODULE
// All event routes in one place
import express from "express";
const router = express.Router(); // هذا كأنو mini app داخل السيرفر  

// Sample events data (in-memory)
let events = [
    {
        id: 1,
        title: "JavaScript Workshop",
        date: "2026-02-15",
        location: "Sfax",
        capacity: 30
    },
    {
        id: 2,
        title: "React Conference",
        date: "2026-03-20",
        location: "Tunis",
        capacity: 100
    },
    {
        id: 3,
        title: "Node.js Bootcamp",
        date: "2026-04-10",
        location: "Sousse",
        capacity: 25
    }
];
let nextId = 4;

// GET all events
router.get("/", (req, res) => {
    console.log("📋 GET /api/events - Fetching all events");
    res.json({
        success: true,
        count: events.length,
        data: events
    });
});

// GET single event by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(`🔍 GET /api/events/${id}`);

    const event = events.find(e => e.id === parseInt(id));
    // if there is no event
    if (!event) {
        return res.status(404).json({
            success: false,
            message: `Event ${id} not found`
        });
    }

    res.json({
        success: true,
        data: event
    });
});

// POST create new event
router.post("/", (req, res) => {
    console.log("➕ POST /api/events - Creating event");

    const { title, date, location, capacity } = req.body;

    // Validation
    if (!title || !date || !location || !capacity) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: title, date, location, capacity"
        });
    }

    // Create event
    const newEvent = {
        id: nextId++,
        title,
        date,
        location,
        capacity
    };

    events.push(newEvent);

    res.status(201).json({
        success: true,
        message: "Event created successfully",
        data: newEvent
    });
});

// PUT update event
router.put("/:id", (req, res) => {
    const { id } = req.params;
    console.log(`✏ PUT /api/events/${id} - Updating event`);

    const event = events.find(e => e.id === parseInt(id));

    if (!event) {
        return res.status(404).json({
            success: false,
            message: `Event ${id} not found`
        });
    }

    // Update fields
    const { title, date, location, capacity } = req.body;
    if (title) event.title = title;
    if (date) event.date = date;
    if (location) event.location = location;
    if (capacity) event.capacity = capacity;

    res.json({
        success: true,
        message: "Event updated successfully",
        data: event
    });
});

// DELETE event
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(`🗑 DELETE /api/events/${id} - Deleting event`);

    const index = events.findIndex(e => e.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Event ${id} not found`
        });
    }

    const deletedEvent = events.splice(index, 1)[0];

    res.json({
        success: true,
        message: "Event deleted successfully",
        data: deletedEvent
    });
});

export default router;
