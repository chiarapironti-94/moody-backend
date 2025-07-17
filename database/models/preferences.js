import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema(
  {
    _id: { type: String, default: 'singleton' },
    themeColor: {
      type: String,
      default: '#6a4c93',
    },
    lastPromptDate: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'preferences',
    versionKey: false,
  }
);

export default mongoose.model('Preferences', PreferencesSchema);
