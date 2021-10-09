  
const mongoose = require('mongoose');

export async function connectDatabase(): Promise<void> {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.yepjh.mongodb.net/pqrs-flota-ospina?retryWrites=true&w=majority');
  console.log('Database connected');
}