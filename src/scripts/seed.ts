import { DB_NAME, MONGO_URI } from '@config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Song } from '../models/songs.model';

dotenv.config();

const URI = `${MONGO_URI}${DB_NAME}` || 'mongodb://localhost:27017/musicDB';

mongoose
  .connect(URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const songs = [
  { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera' },
  { title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide' },
  { title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile' },
  { title: 'Imagine', artist: 'John Lennon', album: 'Imagine' },
  { title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller' },
  { title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind' },
  { title: 'Superstition', artist: 'Stevie Wonder', album: 'Innervisions' },
  { title: 'Like a Rolling Stone', artist: 'Bob Dylan', album: 'Highway 61 Revisited' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV' },
  { title: 'Hey Jude', artist: 'The Beatles', album: 'Hey Jude' },
  { title: 'Someone Like You', artist: 'Adele', album: '21' },
  { title: 'My Heart Will Go On', artist: 'Celine Dion', album: 'Let’s Talk About Love' },
  { title: 'Halo', artist: 'Beyoncé', album: 'I Am... Sasha Fierce' },
  { title: 'Rolling in the Deep', artist: 'Adele', album: '21' },
  { title: 'Piano Man', artist: 'Billy Joel', album: 'Piano Man' },
  { title: 'Take Five', artist: 'Dave Brubeck', album: 'Time Out' },
  { title: 'No Woman, No Cry', artist: 'Bob Marley', album: 'Catch a Fire' },
  { title: 'Wonderwall', artist: 'Oasis', album: '(What’s the Story) Morning Glory?' },
  { title: 'I Will Always Love You', artist: 'Whitney Houston', album: 'The Bodyguard' },
  { title: 'Clocks', artist: 'Coldplay', album: 'A Rush of Blood to the Head' },
  { title: 'What’s Going On', artist: 'Marvin Gaye', album: 'What’s Going On' },
  { title: 'Purple Rain', artist: 'Prince', album: 'Purple Rain' },
  { title: 'Uptown Funk', artist: 'Mark Ronson', album: 'Uptown Special' },
  { title: 'Smooth', artist: 'Santana', album: 'Supernatural' },
  { title: 'Hallelujah', artist: 'Leonard Cohen', album: 'Various Positions' },
  { title: 'Yesterday', artist: 'The Beatles', album: 'Help!' },
  { title: 'Shallow', artist: 'Lady Gaga', album: 'A Star Is Born' },
  { title: 'I Want to Hold Your Hand', artist: 'The Beatles', album: 'Meet the Beatles!' },
  { title: 'Tears in Heaven', artist: 'Eric Clapton', album: 'Unplugged' },
  { title: 'Sweet Child O’ Mine', artist: 'Guns N’ Roses', album: 'Appetite for Destruction' },
  { title: 'Riders on the Storm', artist: 'The Doors', album: 'L.A. Woman' },
  { title: 'We Will Rock You', artist: 'Queen', album: 'News of the World' },
  { title: 'Don’t Stop Believin’', artist: 'Journey', album: 'Escape' },
  { title: 'Paint It Black', artist: 'The Rolling Stones', album: 'Aftermath' },
  { title: 'Nothing Else Matters', artist: 'Metallica', album: 'Metallica' },
  { title: 'Lose Control', artist: 'Missy Elliott', album: 'Under Construction' },
  { title: 'All of Me', artist: 'John Legend', album: 'Love in the Future' },
  { title: 'Thinking Out Loud', artist: 'Ed Sheeran', album: 'X' },
  { title: 'Ain’t No Sunshine', artist: 'Bill Withers', album: 'Just As I Am' },
  { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', album: 'Sinatra Sings... of Love' },
  { title: 'Feeling Good', artist: 'Nina Simone', album: 'I Put a Spell on You' },
  { title: 'Thriller', artist: 'Michael Jackson', album: 'Thriller' },
  { title: 'Beat It', artist: 'Michael Jackson', album: 'Thriller' },
  { title: 'September', artist: 'Earth, Wind & Fire', album: 'The Best of Earth, Wind & Fire' },
  { title: 'Creep', artist: 'Radiohead', album: 'Pablo Honey' },
  { title: 'Fix You', artist: 'Coldplay', album: 'X&Y' },
  { title: 'Take on Me', artist: 'A-ha', album: 'Hunting High and Low' },
  { title: 'I Wanna Dance with Somebody', artist: 'Whitney Houston', album: 'Whitney' },
  { title: 'Born to Run', artist: 'Bruce Springsteen', album: 'Born to Run' },
];

const seedDatabase = async () => {
  try {
    await Song.deleteMany();
    await Song.insertMany(songs);
    console.log('✅ Seed data inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting seed data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
