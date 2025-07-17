import mongoose from 'mongoose';

const MoodEntrySchema = new mongoose.Schema({
  mood: { type: String, enum: ['happy', 'neutral', 'sad'], required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  color: { type: String, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
});

const MoodEntry = mongoose.model('MoodEntry', MoodEntrySchema);

export default MoodEntry;
