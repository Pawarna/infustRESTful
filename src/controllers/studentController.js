import studentService from "../services/studentService.js";
import { CustomError } from "../utils/errors/customError.js";
import {sendSuccessResponse} from '../utils/responses/response.js';

const createStudent = async (req, res, next) => {
    try {
        const existStudent = await studentService.countStudent(req.user.nim);
        if (existStudent) {
            throw new CustomError('Student already exist', 422)
        }
        
        const data = {};
        if (req.user.nim){
            data.nim = req.user.nim
        }
        if (req.body.name){
            data.name = req.body.name
        }
        if (req.body.birthdayPlace){
            data.birthdayPlace = req.body.birthdayPlace
        }
        if (req.body.birthday){
            data.birthday = new Date(req.body.birthday);
            data.birthday.setHours(0, 0, 0, 0);
        }
        if (req.body.religion){
            data.religion = req.body.religion
        }
        if (req.body.gender){
            data.gender = req.body.gender
        }
        if (req.body.class){
            data.clas = req.body.class
        }
        if (req.body.motto){
            data.motto = req.body.motto
        }
        if (req.body.badges){
            data.badges = req.body.badges
        }
        const student = await studentService.createStudent(data);
        sendSuccessResponse(res, 'Create Student Success', student, 201);
    } catch (error) {
        next(error);
    }
}

const getStudents = async (req, res, next) => {
    try {
        const students = await studentService.getAllStudents();
        sendSuccessResponse(res, 'Get all students success', students, 200);
    } catch (error) {
        next(error)
    }
}

const getStudentBy = async (req, res, next) => {
    try {
        const student = await studentService.getStudent(req.params);
        if (!student) throw new CustomError('Student not found', 404);
        sendSuccessResponse(res, 'Get user successful', student, 200);
    } catch (error) {
        next(error);
    }
}

const updateStudent = async (req, res, next) => {
    const update = {};
    if (req.body.name){
        update.name = req.body.name
    }
    if (req.body.birthdayPlace){
        update.birthdayPlace = req.body.birthdayPlace
    }
    if (req.body.birthday){
        update.birthday = new Date(req.body.birthday);
        update.birthday.setHours(0, 0, 0, 0);
    }
    if (req.body.religion){
        update.religion = req.body.religion
    }
    if (req.body.gender){
        update.gender = req.body.gender
    }
    if (req.body.class){
        update.clas = req.body.class
    }
    if (req.body.motto){
        update.motto = req.body.motto
    }
    if (req.body.badges){
        update.badges = req.body.badges
    }
    try {
        const existStudent = await studentService.countStudent(req.params.nim);
        if (!existStudent) throw new CustomError('Student not found', 404);

        const student = await studentService.updateStudent(req.params, update)
        sendSuccessResponse(res, 'Update student successfull', student, 200)
    } catch (error) {
        next(error);
    }
}

export default {
    createStudent,
    getStudents,
    getStudentBy,
    updateStudent,
}