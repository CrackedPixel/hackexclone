'use strict';
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const handlers = require('./handlers/handlers');
// const organization = require('./handlers/organization');
const token_master = require('./handlers/token_master');
const account = require('./handlers/account');
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