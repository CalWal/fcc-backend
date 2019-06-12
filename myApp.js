
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console.s/** 2) A first working Express Server */
// console.log("Hello World");
// app.get('/',(req,res)=>{
//   res.send("Hello Express");
// })
/** 3) Serve an HTML file */
app.get('/',(req,res)=>{
  const absolutePath = __dirname+ "/views/index.html";
  res.sendFile(absolutePath);
}
        )

/** 4) Serve static assets  */
app.use(express.static(__dirname+'/public'))

/** 5) serve JSON on a specific route */
// app.get('/json',(req,res)=>{
//   res.json({"message": "Hello json"});
// })

/** 6) Use the .env file to configure the app */
 // app.get('/json',(req,res)=>{
 //   if(process.env.MESSAGE_STYLE=="uppercase"){
 //     res.json({"message":"HELLO JSON"});
 //   } else{
 //     res.json({"message":"Hello json"});
 //   }
 // })
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.get('/json',(req,res,next)=>{
  const method = req.method;
  const path = req.path;
  const ip  = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
})

/** 8) Chaining middleware. A Time server */
app.get('/now',(req,res,next)=>{
  const getTime = new Date().toString();
  req.now = {"time": getTime};
  next();
},(req,res)=>{
  res.send(req.now);
})

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo",(req,res,next)=>{
  res.json({"echo": req.params.word});
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name',(req,res,next)=>{
  const firstname= req.query.first;
  const lastname = req.query.last;
  const jsonObj = {name: firstname + ' '+ lastname};
  res.send(jsonObj)
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}));

/** 12) Get data form POST  */
app.post('/name',(req,res,next)=>{
  const first = req.body.first;
  const last = req.body.last;
  const jsonObj = {name: first + ' '+ last};
  res.send(jsonObj)
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
