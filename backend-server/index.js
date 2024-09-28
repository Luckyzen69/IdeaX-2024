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

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })  
);
 
app.post('/api/token', async (req, res) => {
  try {
      // Step 1: Login to get the token
      const loginResponse = await axios.post('https://soil.narc.gov.np/api/token', {
          email: req.body.email,
          password: req.body.password
      });

      const token = loginResponse.data.token;

      // Step 2: Fetch data with the token
      const dataResponse = await axios.get(`https://soil.narc.gov.np/soil/soildata/?lon=${req.body.lon}&lat=${req.body.lat}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      // Step 3: Send data back to the client
      res.json(dataResponse.data);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.use('/',routes)



app.listen(port, () => {
  console.log(`server is listen at port:${port}`);
});


