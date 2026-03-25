const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 10000
const cors = require('cors');
const morgan = require("morgan");

const userRouter = require('./routes/tasks.js');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.json()); 
app.use('/users', userRouter);



app.use((err,req,res,next)=>{
  console.log(err.message)
  res.status(500).send("error")
});

app.listen(PORT, () => {
  console.log("Сервер Запущений на порту ",PORT);
});