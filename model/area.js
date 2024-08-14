import mongoose from "mongoose";

const Schema = mongoose.Schema

const areaSchema = new Schema({
    Name: String,
    Distance: String,
    Park: String,
    Province: String,
    Notes: String,
    Difficulty: String,
    Duration: String,
    Completed: Boolean
})

const Area = mongoose.models.Area || mongoose.model('Area', areaSchema)

export default Area