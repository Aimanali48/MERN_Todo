const express = require("express"),
  bodyParser  = require("body-parser"),
  cors        = require("cors"),
  path        = require('path')
  app         = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(require("./routes/api"));

//server static assests.
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })

}

app.listen(port, () => {
  console.log(`connected to ${port} port`);
});
