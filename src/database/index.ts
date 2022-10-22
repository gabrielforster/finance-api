import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE_URL as string);

export function connectToDB(){
  const db = mongoose.connection;
  db.on('error', (error) => console.error({'error on db connection': error.message}));
  db.once('open', () => console.log('DB OK!'));

}
