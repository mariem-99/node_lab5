// EVENT CONTROLLER WITH DATABASE
import EventService from "../services/eventService.js";
import { Event } from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";
import ValidationService from "../services/validationService.js";

export class EventController {
 // Get all events
 static async getAllEvents(req, res) {
 try {
 const { status, location, search, page = 1, limit = 10 } = req.query;
 const filters = {};
 if (status) filters.status = status;
 if (location) filters.location = location;
 if (search) filters.search = search;

 const result = await EventService.getAllEvents(filters, page, limit);
 res.status(200).json(
 ApiResponse.paginated(
 result.events,
 result.page,
 result.limit,
 result.total
 )
 );
 } catch (error) {
 res.status(500).json(
 ApiResponse.error(error.message, 500)
 );
 }
 }

 // Get single event
 static async getEventById(req, res) {
 try {
 const { id } = req.params;
 if (!ValidationService.validateId(id)) {
 return res.status(400).json(
 ApiResponse.error("Invalid event ID format", 400)
 );
 }

 const event = await EventService.getEventById(id);
 res.status(200).json(
 ApiResponse.success(event, "Event retrieved successfully")
 );
 } catch (error) {
 res.status(404).json(
 ApiResponse.error(error.message, 404)
 );
 }
 }

 // Create event
 static async createEvent(req, res) {
 try {
 const { title, date, location, capacity, description } = req.body;
 const validation = ValidationService.validateEvent({
 title,
 date,
 location,
 capacity,
 description
 });

 if (!validation.isValid) {
 return res.status(422).json(
 ApiResponse.validationError(validation.errors)
 );
 }

 // For now, use hardcoded organizer ID
 // In LAB 6, this will come from authenticated user
 const organizerId = "507f1f77bcf86cd799439011";
 const event = await EventService.createEvent(
 { title, date, location, capacity, description },
 organizerId
 );
 res.status(201).json(
 ApiResponse.created(event, "Event created successfully")
 );
 } catch (error) {
 res.status(400).json(
 ApiResponse.error(error.message, 400)
 );
 }
 }

 // Update event
 static async updateEvent(req, res) {
 try {
 const { id } = req.params;
 if (!ValidationService.validateId(id)) {
 return res.status(400).json(
 ApiResponse.error("Invalid event ID format", 400)
 );
 }

 const event = await EventService.updateEvent(id, req.body);
 res.status(200).json(
 ApiResponse.success(event, "Event updated successfully")
 );
 } catch (error) {
 res.status(400).json(
 ApiResponse.error(error.message, 400)
 );
 }
 }

 // Delete event
 static async deleteEvent(req, res) {
 try {
 const { id } = req.params;
 if (!ValidationService.validateId(id)) {
 return res.status(400).json(
 ApiResponse.error("Invalid event ID format", 400)
 );
 }

 await EventService.deleteEvent(id);
 res.status(204).send();
 } catch (error) {
 res.status(404).json(
 ApiResponse.error(error.message, 404)
 );
 }
 }

 // Get statistics
 static async getStats(req, res) {
 try {
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

 const totalEvents = await Event.countDocuments();
 const totalAttendees = stats.reduce((sum, s) => sum + s.totalAttendees, 0);

 res.status(200).json(
 ApiResponse.success({
 totalEvents,
 totalAttendees,
 byStatus: stats
 }, "Statistics retrieved successfully")
 );
 } catch (error) {
 res.status(500).json(
 ApiResponse.error(error.message, 500)
 );
 }
 }
}

export default EventController;
