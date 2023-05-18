import express from 'express';
import { createStudent, login, studentInfo, getStudent, editData, deleteStudent, singleStudent } from '../controller/data-controller.js';

const router = express.Router();

router.post('/create',createStudent);
router.post('/login',login);
router.get('/studentdata',studentInfo);
router.get('/:id',getStudent);
router.put('/:id',editData);
router.delete('/:id',deleteStudent);
router.get('/getstudent/:email', singleStudent)


export default router;