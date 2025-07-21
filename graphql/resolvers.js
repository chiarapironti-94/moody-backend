import { GraphQLDateTime } from 'graphql-scalars';
import MoodEntry from './../database/models/moodEntry.js';
import Preferences from './../database/models/preferences.js';

export const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    moodEntries: async (_, args) => {
      const filter = {};
      if (args.mood) filter.mood = args.mood;
      if (args.minRating) filter.rating = { $gte: args.minRating };
      if (args.color) filter.color = args.color;
      return await MoodEntry.find(filter)
        .sort({ date: -1 })
        .limit(args.limit || 100);
    },
    moodEntry: async (_, { id }) => {
      return await MoodEntry.findById(id);
    },
    preferences: async () => {
      // cerca il documento “singleton”, se non esiste lo crea con valori di default
      let prefs = await Preferences.findById('singleton');
      if (!prefs) {
        prefs = await Preferences.create({ _id: 'singleton' });
      }
      return prefs;
    },
  },

  Mutation: {
    createMoodEntry: async (_, { mood, rating, color, note }) => {
      const newMoodEntry = await MoodEntry.create({
        mood,
        rating,
        color,
        note,
      });
      return newMoodEntry;
    },
    deleteMoodEntry: async (_, { id }) => {
      const res = await MoodEntry.findByIdAndDelete(id);
      return res ? true : false;
    },
    updatePreferences: async (_, args) => {
      const update = {};
      if (typeof args.themeColor !== 'undefined') {
        update.themeColor = args.themeColor;
      }
      if (typeof args.lastPromptDate !== 'undefined') {
        update.lastPromptDate = new Date(args.lastPromptDate);
      }

      const prefs = await Preferences.findOneAndUpdate(
        { _id: 'singleton' },
        { $set: update },
        { new: true, upsert: true }
      );

      return prefs;
    },
  },
};
