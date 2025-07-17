import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Nur werfen, wenn nicht im Testmodus
if (!MONGODB_URI && process.env.NODE_ENV !== 'test') {
  throw new Error(
    'Bitte die Umgebungsvariable MONGODB_URI in .env.local definieren'
  );
}

// Globale Deklaration für den Cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

// Globale Verbindungscaches verwenden
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  // Falls schon verbunden, diese Verbindung zurückgeben
  if (cached.conn) {
    return cached.conn;
  }

  // Neue Verbindung aufbauen, falls noch keine vorhanden
  if (!cached.promise) {
    // Falls keine URI und wir sind im Testmodus, Dummy zurückgeben
    if (!MONGODB_URI) {
      return Promise.resolve({} as Mongoose);
    }

    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn as Mongoose;
}

export default dbConnect;
