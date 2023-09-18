import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
let taskList_home = [];
let taskList_work = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// date 


let d = new Date();
let currentDate = d.getDate();
let currentDay = d.getDay();
let currentyear  = d.getFullYear();
let currentMon = d.getMonth();

const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function timeDates(req,res,next){
//   var n = new Date();
//   let currYears = n.getDate();
//   if(currYears !== currentDay){
//     currentyear = n.getFullYear();
//     currentDate = currYears;
//     var Da = n.getDay();
//     var Mo = n.getMonth();
//     currentDay = days[Da];
//     currentMon = months[Mo];
//   }
//   next();
// }

// app.use(timeDates);

app.get("/",(req,res)=>{
  taskList_home = [];
  taskList_work = [];
  res.render("main.ejs",{
  years:currentyear
});
});

app.get("/home",(req,res)=>{
  res.render("today.ejs",{
    date: currentDate,
    day: days[currentDay],
    years: currentyear,
    month: months[currentMon],
    tasks_home:taskList_home
});
});

app.get("/work",(req,res)=>{
  res.render("work.ejs",{
    tasks_work:taskList_work,
    years: currentyear
  });
});

// post .... 
app.post("/add_home",(req,res)=>{
  taskList_home.push(req.body["task_home"]);
  res.redirect("/home");
});

app.post("/add_work",(req,res)=>{
  taskList_work.push(req.body["task_work"]);
  res.redirect("/work");
});

app.listen(process.env.port,()=>{
  console.log("server is working fine ... ");
});