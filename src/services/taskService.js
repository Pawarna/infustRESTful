import {prisma} from '../config/db.js';

const createTask = async ({title, desc, course, dueDate, classOf, submittedTo, link} = {}) => {
    const task = await prisma.task.create({
        data : {
            title,
            description: desc,
            course,
            dueDate: new Date(dueDate),
            classOf,
            submittedTo,
            linkSubmition: link
        }
    })

    const studentInClassOf = await prisma.student.findMany({
        where : {
            classOf
        }
    })

    const studentTasks = await prisma.studentTask.createMany({
        data: studentInClassOf.map(student => ({
            nim: student.nim,
            taskId : task.id
        }))
    });

    return task;
};

const getTaskById = async (id, nim) => {
    const task = await prisma.task.findFirst({
        where: {
            id:Number(id),
        },
        include: {
            students: {
                where: {
                    nim
                },
                select: {
                    completed: true,
                    assignedAt: true
                }
            }
        }
    })

    return task;

}

const getTask = async (classOf, nim, {filter, sorting} = {}) => {
    const tasks = await prisma.task.findMany({
        where: {
            classOf,
        },
        include: {
            students: {
                where: {
                    nim: String(nim)
                },
                select: {
                    completed: true,
                    assignedAt: true
                }
            }
        }
    })

    return tasks
}

const updateTask = async (id, data) => {
    return await prisma.task.update({
        where: {
            id
        },
        data
    })

}

export default {
    createTask,
    getTaskById,
    getTask,
    updateTask
}