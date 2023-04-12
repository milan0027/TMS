const User = require("../models/user");
const Item =require("../models/item");
const Meeting = require("../models/meeting");
const Schedule = require("../models/schedule");
const Project = require("../models/project");
const {uuid} = require('uuidv4')
const start = async(req,res) => {


    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        //user modification code
        await user.save();
        return res.status(200).json({user});
    }catch(e){
        return res.status(400).send({ msg: "Server Error" });
    }
}

const meeting = async(req,res) => {
    try{
        const userId = req.user.userId;
        //console.log(userId);
        console.log(req.body);
        const project = await Project.findById(req.body.project);
        if(!project)
        return res.status(400).send({ msg: "Invalid Project" });
        
        const common = uuid();
        const meeting = await Meeting.create({name: req.body.name,
            venue:req.body.venue,
            purpose: req.body.purpose,
            project: req.body.project,
            start: req.body.start,
            end: req.body.end,
            duration: req.body.duration,
            common,
            invited:[...req.body.invited,userId],
            creator: userId});
       // console.log(meeting)
        const schedule = await Schedule.create({
            desc: `Meeting for Project ${req.body.project}`,
            start: req.body.start,
            duration: req.body.duration,
            end: req.body.end,
            common,
            creator: userId,
        })
        

         
       
        //user code
        project.meetings.unshift(meeting);
        await project.save();
        
        
        meeting.invited.forEach(async (item) => {
            const inv = await User.findById(item);
            if(inv){
                inv.meetings.unshift(meeting);
                inv.schedules.unshift(schedule);
                await inv.save();
            }
        })

        return res.status(200).json({msg:`Meeting Created ID:${meeting._id}`});


    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const project = async(req,res) => {
    try{
        const userId = req.user.userId;
        //console.log(userId);
        const project = await Project.create({
            ...req.body,
            creator: userId,
        });
        
        //user code
        return res.status(200).json({msg: `Project Created ID:${project._id}`});
    }catch(e){
        return res.status(400).send({ msg: "Server Error" });
    }
}

const schedule = async(req,res) => {
    try{
        const userId = req.user.userId;
        //console.log(req.body);
        const schedule = await Schedule.create({
            ...req.body,
            common: uuid(),
            creator: userId,
        });
       // console.log(schedule)
        const user = await User.findById(userId);
        user.schedules.unshift(schedule);
        await user.save();
        //user code
        return res.status(200).json({msg:`Schedule Created ID:${schedule._id}`});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const getMeetings = async(req,res) => {
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId).populate("meetings");
        //console.log(req.body);
        const meetings = user.meetings;

        return res.status(200).json({meetings});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const getSchedules = async(req,res) => {
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId).populate("schedules");
        //console.log(req.body);
        const schedules = user.schedules;

        return res.status(200).json({schedules});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const getAllMeetings = async(req,res) => {
    try{
        const allMeetings = await Meeting.find({});
        //user code
        return res.status(200).json({allMeetings});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const getAllSchedules = async(req,res) => {
    try{
        const allSchedules = await Schedule.find({});
        return res.status(200).json({allSchedules});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const getAllProjects = async(req,res) => {
    try{
        const allProjects = await Project.find({});
        return res.status(200).json({allProjects});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const delMeeting = async(req,res) => {
    try{
        console.log(req.body)
        const meeting = await Meeting.findById(req.body._id);
        const common = meeting.common;
        await Meeting.findOneAndDelete({common});
        await Schedule.findOneAndDelete({common});
        return res.status(200).json({common});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const delSchedule = async(req,res) => {
    try{
        const schedule = await Schedule.findById(req.body._id);
        const common = schedule.common;
        await Meeting.findOneAndDelete({common});
        await Schedule.findOneAndDelete({common});
        return res.status(200).json({common});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const exeStats = async(req,res) => {
    try{
        const resp = await User.find({type:'exe'}).populate("meetings");
        //console.log(resp);
        return res.status(200).json({resp});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const proStats = async(req,res) => {
    try{
        const resp = await Project.find({}).populate("meetings");
        return res.status(200).json({resp});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

const fraStats = async(req,res) => {
    try{
        const {start,end} = req.body;
        const users = await User.find({type:'exe'}).populate("meetings")
        const resp = users.map((user) => {
            const timer= user.meetings.reduce((total,meet) =>{
              //  console.log(Math.max(start,(new Date(meet.end)).getTime()))
                return total+Math.max(Math.min(end,(new Date(meet.end)).getTime())-Math.max(start,(new Date(meet.start)).getTime()),0)
            }
           ,0);
            return {
                _id: user._id,
                name: user.username,
                frac: timer/(end-start),
            }
        })
        //console.log(resp)
        return res.status(200).json({resp});
    }catch(e){
        console.log(e)
        return res.status(400).send({ msg: "Server Error" });
    }
}

module.exports = {start, meeting, project, schedule,getAllMeetings,
getAllProjects,getAllSchedules,getMeetings,getSchedules,delMeeting,delSchedule,
exeStats,proStats,fraStats};