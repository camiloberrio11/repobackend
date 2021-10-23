import express from 'express';
import { connectDatabase } from './database/connection';
import cors from 'cors';
import { router } from './routes/routes';
import { loginExternal } from './utils/external';

const app = express();
const PORT : string|number = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api', router);


app.get('/', (req, res) => {
  res.send(`Flota Ospina Api`);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  connectDatabase();
  loginExternal('', '');
});
