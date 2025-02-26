import taskService from "../services/taskService.js"
import { CustomError } from "../utils/errors/customError.js";
import {sendSuccessResponse} from '../utils/responses/response.js';

const createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body);
        sendSuccessResponse(res, "Create task success", task, 200);
    } catch (error) {
        next(error)
    }
}

const getTaskById = async (req, res, next) => {
    try {
        const task = await taskService.getTaskById(req.params.id, req.user.nim);
        if (!task) throw new CustomError('Task not found', 404);
        sendSuccessResponse(res, 'Get task success', task, 200);
    } catch (error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {
    const {filter, sort} = req.query
    try {
        const task = await taskService.getTask(Number(req.user.nim.slice(0, 4)), req.user.nim);
        sendSuccessResponse(res, 'Get all task success', task, 200);
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    const {title, description, course, dueDate, classOf, submittedTo, linkSubmition} = req.body
    try {
        let update = {}
        if (title) update.title = title
        if (description) update.description = description
        if (course) update.course = course
        if (classOf) update.classOf = classOf
        if (submittedTo) update.submittedTo = submittedTo
        if (linkSubmition) update.linkSubmition = linkSubmition

        const task = await taskService.updateTask(req.params.id, update);
        if (!task) throw new CustomError('Task not found', 404);
        sendSuccessResponse(res, 'Update task success', task, 200);
    } catch (error) {
        next(error)
    }
}

export default {
    createTask,
    getTaskById,
    getTask,
    updateTask
}