// TEST DATABASE QUERIES
// Examples of MongoDB queries with Mongoose
import Database from "./src/config/database.js";
import { Event, User } from "./src/models/index.js";
import EventService from "./src/services/eventService.js";

async function testQueries() {
 console.log("═══════════════════════════════════════");
 console.log(" DATABASE QUERIES TEST");
 console.log("═══════════════════════════════════════\n");
 try {
 // Connect to database
 await Database.connect();

 // Test 1: Find upcoming events
 console.log(" Finding upcoming events...");
 const upcoming = await Event.findUpcoming().limit(3);
 console.log(` Found ${upcoming.length} upcoming events\n`);

 // Test 2: Find by location
 console.log(" Finding events by location (Sfax)...");
 const sfaxEvents = await Event.findByLocation("Sfax");
 console.log(` Found ${sfaxEvents.length} events in Sfax\n`);

 // Test 3: Filtering with pagination
 console.log(" Filtering events with pagination...");
 const result = await EventService.getAllEvents(
 { status: "upcoming" },
 1,
 5
 );
 console.log(` Page 1: ${result.events.length} events`);
 console.log(` Total: ${result.total} events\n`);

 // Test 4: Count events
 console.log(" Counting total events...");
 const totalEvents = await Event.countDocuments();
 console.log(` Total events in database: ${totalEvents}\n`);

 // Test 5: Count by status
 console.log(" Counting by status...");
 const upcoming_count = await Event.countDocuments({ status: "upcoming" });
 const completed_count = await Event.countDocuments({ status: "completed" });
 console.log(` Upcoming: ${upcoming_count}`);
 console.log(` Completed: ${completed_count}\n`);

 // Test 6: Get statistics
 console.log(" Event statistics...");
 const stats = await Event.aggregate([
 {
 $group: {
 _id: "$status",
 count: { $sum: 1 },
 totalCapacity: { $sum: "$capacity" },
 totalAttendees: { $sum: "$attendees" }
 }
 }
 ]);
 console.log(` Statistics:`);
 stats.forEach(stat => {
 console.log(` - ${stat._id}: ${stat.count} events`);
 });

 console.log("");
 console.log("═══════════════════════════════════════");
 console.log(" ✅ ALL QUERIES SUCCESSFUL!");
 console.log("═══════════════════════════════════════");

 await Database.disconnect();
 } catch (error) {
 console.error("❌ Query test failed:", error.message);
 }
}

testQueries();
