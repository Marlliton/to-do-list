import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

export default mongoose;
