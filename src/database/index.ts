import mongoose from 'mongoose';

export function connectToDB(){
  mongoose.connect(process.env.MONGO_URL as string);

  const db = mongoose.connection;
  db.on('error', (error) => console.error({'error on db connection': error.message}));
  db.once('open', () => console.log('DB OK!'));
}
