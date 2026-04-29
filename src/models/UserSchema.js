// USER MONGOOSE SCHEMA
// Defines user data structure
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
 name: {
 type: String,
 required: [true, "Name is required"],
 trim: true,
 minlength: [2, "Name must be at least 2 characters"],
 maxlength: [50, "Name cannot exceed 50 characters"]
 },
 email: {
 type: String,
 required: [true, "Email is required"],
 unique: true,
 lowercase: true,
 match: [
 /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
 "Please provide a valid email"
 ]
 },
 phone: {
 type: String,
 default: ""
 },
 role: {
 type: String,
 enum: ["user", "organizer", "admin"],
 default: "user"
 },
 eventsAttended: [
 {
 type: mongoose.Schema.Types.ObjectId,
 ref: "Event"
 }
 ],
 eventsOrganized: [
 {
 type: mongoose.Schema.Types.ObjectId,
 ref: "Event"
 }
 ],
 createdAt: {
 type: Date,
 default: Date.now,
 immutable: true
 }
 },
 {
 timestamps: true,
 collection: "users"
 }
);

// Methods
userSchema.methods.attendEvent = async function(eventId) {
 if (!this.eventsAttended.includes(eventId)) {
 this.eventsAttended.push(eventId);
 return await this.save();
 }
 return this;
};

userSchema.methods.organizeEvent = async function(eventId) {
 if (!this.eventsOrganized.includes(eventId)) {
 this.eventsOrganized.push(eventId);
 return await this.save();
 }
 return this;
};

// Statics
userSchema.statics.findByRole = function(role) {
 return this.find({ role });
};

export default userSchema;
