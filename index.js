const express = require('express');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORTSERVER;
app.use(express.json());
app.use(cors({ allowedHeaders: 'http://localhost:3000', origin: '*' }));

app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('testing');
});

app.listen(port, () => console.log(`server is running port in ${port}`));
