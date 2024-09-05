import { prisma } from "../config/db.js"

const createStudent = async ({
    nim, name, birthdayPlace, birthday, religion, gender, studyProgram, clas, motto, badges
} = data) => {
    return await prisma.student.create({
        data: {
            nim,
            name,
            birthdayPlace,
            birthday,
            religion,
            gender,
            studyProgram,
            class : clas,
            classOf: Number(nim.slice(0,4)),
            motto,
            badges
        } || data
    })
}

const countStudent = async (nim) => {
    return await prisma.student.count({
        where: {
            nim
        }
    })
}

const getAllStudents = async () => {
    return await prisma.student.findMany({
    })
}

const getStudent = async (value) => {
    return await prisma.student.findFirst({
        where: value
    })
}

const updateStudent = async (nim, {
    name, birthdayPlace, birthday, religion, gender, studyProgram, clas, motto, badges
} = data) => {
    return await prisma.student.update({
        where: nim,
        data: {
            name,
            birthdayPlace,
            birthday,
            religion,
            gender,
            studyProgram,
            class : clas,
            motto,
            badges
        }
    })
}

export default {
    createStudent,
    countStudent,
    getAllStudents,
    getStudent,
    updateStudent
}