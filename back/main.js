'use strict';
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DB = require('./handlers/db');
// const handlers = require('./handlers/handlers');
// const organization = require('./handlers/organization');
const token_master = require('./handlers/token_master');
const account = require('./handlers/account');
const apps = require('./handlers/apps');
// const instructor = require('./handlers/instructor');
// const passages = require('./handlers/passages');
// const student = require('./handlers/student');
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PF = "/api/v1/";
app.get(`${PF}`, (req, res) => {
  res.send("Echo");
})
app.post(`${PF}refresh`, token_master.token_refresh);
app.post(`${PF}register`, account.create_account);
app.post(`${PF}login`, account.verify_login);
app.post(`${PF}apps/scan/scan`, apps.scan_scan_random)
// app.post(`${PF}organization/list`, organization.list_all);
// app.post(`${PF}organization/info`, organization.org_check);
// app.post(`${PF}organization/adduser`, organization.addUser);
// app.post(`${PF}organization/addstudent`, organization.addStudent);
// app.post(`${PF}student/listclass`, student.list_class);
// app.post(`${PF}student/listall`, student.list_all);
// app.post(`${PF}student/openpassage`, student.open_passage);
// app.post(`${PF}instructor/assignpassage`, instructor.assign_student_passage);
// app.post(`${PF}passages/list`, passages.list_all);
// app.post(`${PF}passages/add`, passages.addNewPassage);

app.listen(config.server_port, () => {
    console.log("Server running on port " + config.server_port);
});

// let newIP = "";
// let nQuery = "INSERT IGNORE INTO `addresses` (address) VALUES ";
// // for (let i = 0; i < 80000; ++i ) {
//   newIP = `${(Math.floor(Math.random() * 255) + 1)}.${(Math.floor(Math.random() * 255))}.${(Math.floor(Math.random() * 255))}.${(Math.floor(Math.random() * 255))}`;

//   nQuery += `('${newIP}'),`;
//   // console.log(newIP);
// // }

// nQuery = nQuery.slice(0, -1) + ";";

// DB.querySQL(nQuery, res => {
//   if (res.code) {
//     console.log("ERROR:", res.error);
//   }else{
//     console.log("Done");
//   }
// })

// console.log(nQuery.slice(0, -1));
// account.verify_login({
//   body: {
//     username: "asd",
//     password: "f10e2821bbbea527ea02200352313bc059445190"
//   }
// }, (res) => {
//   console.log(res);
// })