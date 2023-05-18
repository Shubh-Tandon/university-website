import { request, response } from "express";
import student from "../schema/student-schema.js";
// const bcrypt = require('bcryptjs');
// import jwt_secret from "../jwt/jwt"
import jwt from 'jsonwebtoken'
// import authToken from "../middleware/auth.js";


const jwt_secret = "servicetesting"



export const createStudent = async(request, response) => {
    // console.log("ceratestudent");
    const studentData = request.body;
    const newStudentData = new student(studentData);
    // console.log(studentData);
    
    try {
    //   const salt = await bcrypt.genSalt(10);
    //   const secPass= await bcrypt.hash(studentData.password, salt);

    //   const newStudentData = {
    //     name: studentData.name,
    //     email:studentData.email,
    //     password: secPass,
    //     course: studentData.course,
    //     marksobtained: studentData.marksobtained,
    //     totalmarks: studentData.totalmarks

    //   }
        // const newStudent = new student(newStudentData);
        const newStudent = new student(newStudentData);

        await newStudent.save();
        response.status(201).json(newStudent)
        
    } catch (error) {
        response.status(409).json({message : error.message})
        
    }
}


export const login = async(request, response) => {
    let success = false;
    const {email, password} = request.body;
    const loginUser =await student.find({email})    
    // console.log("loginUser details",loginUser);
    if(!loginUser){
   success = false;

        response.status(409).json({message : "No credentials found"})
        
    }
 
    try {
        const data = {
            user : {
              email: email
            }
          }
          const authtoken = jwt.sign(data, jwt_secret);
          success = true
          response.json({success,authtoken})
    
        
    } catch (error) {
            success = false;

        response.status(409).json({message : error.message})
        
    }
}


export const studentInfo = async(request, response) => {
   
    try{ 
       const studentData =  await student.find({})
       if(!studentData){
        response.status(409).json({message : "No records found"})
       }
    //    console.log("student data",studentData);
       response.status(201).json(studentData);
    } catch (error) {
        response.status(409).json({message : error.message})
        
    }
}


export const getStudent = async(request, response) => {
    try {
      const studentData = await student.find({_id: request.params.id});
      response.status(201).json(studentData);
    } catch (error) {
      response.status(409).json({message : error.message})
      
    }
  }


  export const editData = async(request, response) => {
    let editStudent = request.body;
    const editStudentData = new student(editStudent);
    try {
      await student.updateOne({_id: request.params.id}, editStudentData)
      response.status(201).json(editStudentData);
    } catch (error) {
      response.status(409).json({message : error.message})
      
    }
  }


  
export const deleteStudent = async (request, response) => {
    try {
        await student.deleteOne({_id: request.params.id});
        response.status(200).json({message: 'Student deleted successfully'})
    } catch (error) {
        response.status(409).json({message: error.message})
        
    }
}


export const singleStudent = async(request, response) => {
    try {
      const studentData = await student.find({email: request.params.email});
      response.status(201).json(studentData);
    } catch (error) {
      response.status(409).json({message : error.message})
      
    }
  }