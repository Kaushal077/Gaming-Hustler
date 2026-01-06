require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gaming-cluster.1v6kksv.mongodb.net/?retryWrites=true&w=majority&appName=Gaming-Cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const sampleTournaments = [
  {
    name: 'BGMI Pro League Season 5',
    game: 'BGMI',
    platform: 'Mobile',
    description: 'Join the biggest BGMI tournament of the season! Compete against the best players and teams for a chance to win from the ₹1,00,000 prize pool.',
    prize: '1,00,000',
    prizePool: 100000,
    entryFee: 0,
    players: 128,
    maxPlayers: 200,
    teamSize: 4,
    date: 'Dec 28, 2025',
    startDate: '2025-12-28T18:00:00Z',
    status: 'upcoming',
    featured: true,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500',
    hostName: 'Gaming Hustlers',
    hostEmail: 'kaushalmandal13590@gmail.com',
    rules: [
      'All participants must be 16 years or older',
      'Teams must have exactly 4 players',
      'No use of emulators allowed',
      'Cheating will result in immediate disqualification'
    ],
    registeredTeams: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Valorant Champions Cup',
    game: 'Valorant',
    platform: 'PC',
    description: 'Show your tactical skills in this premium Valorant tournament. Top teams compete for glory!',
    prize: '75,000',
    prizePool: 75000,
    entryFee: 50,
    players: 64,
    maxPlayers: 128,
    teamSize: 5,
    date: 'Dec 30, 2025',
    startDate: '2025-12-30T16:00:00Z',
    status: 'upcoming',
    featured: true,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500',
    hostName: 'Esports Hub',
    hostEmail: 'kaushalmandal13590@gmail.com',
    rules: [
      'Teams must have 5 players',
      'Standard Valorant competitive rules apply',
      'Match disputes handled by admins'
    ],
    registeredTeams: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Free Fire Max Tournament',
    game: 'Free Fire',
    platform: 'Mobile',
    description: 'Battle royale action at its finest! Join now and prove you are the ultimate survivor.',
    prize: '50,000',
    prizePool: 50000,
    entryFee: 0,
    players: 180,
    maxPlayers: 200,
    teamSize: 4,
    date: 'Dec 27, 2025',
    startDate: '2025-12-27T20:00:00Z',
    status: 'live',
    featured: true,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=500',
    hostName: 'Pro Gamers',
    hostEmail: 'kaushalmandal13590@gmail.com',
    rules: [
      'Squad format only',
      'No third-party apps allowed',
      'Fair play policy enforced'
    ],
    registeredTeams: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'COD Mobile Championship',
    game: 'COD Mobile',
    platform: 'Mobile',
    description: 'Fast-paced action in Call of Duty Mobile. Team up and dominate the battlefield!',
    prize: '30,000',
    prizePool: 30000,
    entryFee: 25,
    players: 96,
    maxPlayers: 100,
    teamSize: 5,
    date: 'Dec 26, 2025',
    startDate: '2025-12-26T19:00:00Z',
    status: 'live',
    featured: false,
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500',
    hostName: 'Battle Zone',
    hostEmail: 'kaushalmandal13590@gmail.com',
    rules: [
      '5v5 team format',
      'Official COD Mobile rules',
      'Anti-cheat monitored'
    ],
    registeredTeams: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'PUBG PC Masters',
    game: 'PUBG PC',
    platform: 'PC',
    description: 'The ultimate PUBG PC showdown. Only the best survive!',
    prize: '2,00,000',
    prizePool: 200000,
    entryFee: 100,
    players: 32,
    maxPlayers: 64,
    teamSize: 4,
    date: 'Jan 2, 2026',
    startDate: '2026-01-02T18:00:00Z',
    status: 'upcoming',
    featured: true,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500',
    hostName: 'Gaming Hustlers',
    hostEmail: 'kaushalmandal13590@gmail.com',
    rules: [
      'Squad format (4 players)',
      'FPP mode only',
      'Custom matches',
      'Point-based scoring system'
    ],
    registeredTeams: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedTournaments() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('Esports-Gaming');
    const tournamentsCollection = db.collection('tournaments');
    
    // Check if tournaments already exist
    const count = await tournamentsCollection.countDocuments();
    if (count > 0) {
      console.log(`Found ${count} existing tournaments. Skipping seed.`);
      console.log('To reseed, first run: db.tournaments.drop()');
      return;
    }
    
    // Insert sample tournaments
    const result = await tournamentsCollection.insertMany(sampleTournaments);
    console.log(`✅ Successfully inserted ${result.insertedCount} tournaments!`);
    
    // List inserted tournaments
    const tournaments = await tournamentsCollection.find().toArray();
    console.log('\nInserted tournaments:');
    tournaments.forEach(t => {
      console.log(`  - ${t.name} (${t.game}) - ${t.status}`);
    });
    
  } catch (error) {
    console.error('Error seeding tournaments:', error);
  } finally {
    await client.close();
  }
}

seedTournaments();
