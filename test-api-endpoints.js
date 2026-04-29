// API TEST - MONGODB ENDPOINTS
// Test the Event Manager API with real MongoDB data

import Database from "./src/config/database.js";
import EventService from "./src/services/eventService.js";
import UserService from "./src/services/userService.js";

async function testAPI() {
 console.log("═══════════════════════════════════════════════");
 console.log(" LAB 5 - API ENDPOINT TEST WITH MONGODB");
 console.log("═══════════════════════════════════════════════\n");

 try {
 // Connect to database
 await Database.connect();

 // Create a test user (organizer)
 console.log("1️⃣  Creating test user (organizer)...");
 const user = await UserService.createUser({
 name: "Ahmed Ali",
 email: "ahmed" + Date.now() + "@example.com",
 phone: "216123456789",
 role: "organizer"
 });
 console.log(`✅ User created: ${user.name} (${user._id})\n`);

 // Create test events
 console.log("2️⃣  Creating test event...");
 const futureDate = new Date();
 futureDate.setDate(futureDate.getDate() + 7); // 7 days from now
 
 const event = await EventService.createEvent({
 title: "Web Development Workshop",
 description: "Learn MongoDB and Express.js",
 date: futureDate,
 location: "Tunis",
 capacity: 50
 }, user._id);
 console.log(`✅ Event created: "${event.title}" (${event._id})\n`);

 // Get all events
 console.log("3️⃣  Fetching all events...");
 const result = await EventService.getAllEvents({}, 1, 10);
 console.log(`✅ Found ${result.total} events in database\n`);

 // Get single event
 console.log("4️⃣  Fetching single event...");
 const fetchedEvent = await EventService.getEventById(event._id);
 console.log(`✅ Retrieved: "${fetchedEvent.title}"`);
 console.log(`   Capacity: ${fetchedEvent.capacity} | Attendees: ${fetchedEvent.attendees}\n`);

 // Update event
 console.log("5️⃣  Updating event...");
 const updatedEvent = await EventService.updateEvent(event._id, {
 capacity: 75,
 description: "Learn MongoDB, Express.js, and React"
 });
 console.log(`✅ Event updated - New capacity: ${updatedEvent.capacity}\n`);

 // Add attendee
 console.log("6️⃣  Creating second user and adding as attendee...");
 const attendee = await UserService.createUser({
 name: "Fatima Nouri",
 email: "fatima" + Date.now() + "@example.com",
 phone: "216987654321",
 role: "user"
 });
 console.log(`✅ Attendee created: ${attendee.name} (${attendee._id})`);
 
 await EventService.addAttendee(event._id, attendee._id);
 console.log(`✅ Attendee added to event\n`);

 // Get user with populated events
 console.log("7️⃣  Fetching user with attended events...");
 const userWithEvents = await UserService.getUserById(attendee._id);
 console.log(`✅ User: ${userWithEvents.name}`);
 console.log(`   Events attended: ${userWithEvents.eventsAttended.length}\n`);

 // Get events by location
 console.log("8️⃣  Searching events by location...");
 const tunisEvents = await EventService.getEventsByLocation("Tunis");
 console.log(`✅ Found ${tunisEvents.length} events in Tunis\n`);

 console.log("═══════════════════════════════════════════════");
 console.log(" ✅ ALL API TESTS PASSED!");
 console.log("═══════════════════════════════════════════════");

 // Cleanup
 await Database.disconnect();
 } catch (error) {
 console.error("❌ Test failed:", error.message);
 process.exit(1);
 }
}

testAPI();
