const express = require('express');
const router = express.Router();
const { start,meeting, project, schedule, getMeetings, getSchedules, 
    getAllMeetings, getAllSchedules, getAllProjects, delMeeting, delSchedule, exeStats, proStats, fraStats } = require("../controllers/submitControllers");
const isLogin = require("../middleware/isLogin");

router.route("/start").get(isLogin,start);
router.route("/meeting").post(isLogin,meeting);
router.route("/project").post(isLogin,project);
router.route("/schedule").post(isLogin,schedule);
router.route("/getMeetings").get(isLogin,getMeetings);
router.route("/getSchedules").get(isLogin,getSchedules);
router.route("/getAllMeetings").get(getAllMeetings);
router.route("/getAllSchedules").get(getAllSchedules);
router.route("/getAllProjects").get(getAllProjects);
router.route("/delMeeting").post(delMeeting);
router.route("/delSchedule").post(delSchedule);
router.route("/exeStats").get(exeStats);
router.route("/proStats").get(proStats);
router.route("/fraStats").post(fraStats);
module.exports = router;