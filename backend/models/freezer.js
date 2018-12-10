import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FreezersSchema = new Schema({
  freezerNum: Number,
  freezerLoc: String,
}, { timestamps: true});

export default mongoose.model('Freezer', FreezersSchema);
