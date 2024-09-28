const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectMongoDb } = require("./conntectTOMongodb");
const routes=require('./routes/routes')
const app = express();
const url = process.env.MONGODB_URI;
port = process.env.port;


connectMongoDb(url);

app.use(express.urlencoded({ extended: false }));

app.use(express.json({}));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

 

app.use('/',routes)



app.listen(port, () => {
  console.log(`server is listen at port:${port}`);
});


