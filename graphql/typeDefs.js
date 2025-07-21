export const typeDefs = `

  scalar DateTime

  type MoodEntry {
    _id: ID!
    mood: String!
    rating: Int!
    color: String!
    note: String
    date: DateTime!
  }

  type Preferences {
    themeColor: String!
    lastPromptDate: DateTime!
  }

  type Query {
    moodEntries(mood: String, minRating: Int, color: String, limit: Int): [MoodEntry!]!
    moodEntry(id: ID!): MoodEntry
    preferences: Preferences!
  }

  type Mutation {
    createMoodEntry(mood: String!, rating: Int!, color: String!, note: String): MoodEntry!
    deleteMoodEntry(id: ID!): Boolean!
    updatePreferences(
      themeColor: String,
      lastPromptDate: String
    ): Preferences!
  }
`;
