const mongoose = require('mongoose');

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(
    `mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@cluster0.yepjh.mongodb.net/${process.env.NAMEDB}?retryWrites=true&w=majority`
  );
  console.log('Database connected');
}
