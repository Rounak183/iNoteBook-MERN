const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook"

// const connectToMongo = () => {
//     const conn = mongoose.createConnection(mongoURI);
//     console.log(conn);
// }

const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected!!");
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
}
const conn = mongoose.createConnection(mongoURI);
// console.log(conn);
// console.log(conn);

module.exports = connectDB;