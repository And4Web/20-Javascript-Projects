const express = require("express");

const PORT = 5000;
const app = express();


app.get("/", (req, res)=>{
  res.json("server is good. Store all your endpoints here in order to hide the keys and sensitive data from the frontend users")
})

app.listen(PORT, ()=>{
  console.log(`server running on ${PORT}`)
})