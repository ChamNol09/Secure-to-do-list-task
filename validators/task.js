const Joi = require("joi");

const createTaskSchema = Joi.object({
    title: Joi.string().min(5).required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required",
        "string.min": "Title must be at least 5 characters long",
        "any.required": "Title is required"
    }),

    description: Joi.string().min(10).required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
        "any.required": "Description is required"
    }),

    status: Joi.string()
        .valid("pending", "in progress", "completed")
        .required()
        .messages({
            "any.only": "Status must be one of: pending, in progress, completed",
            "any.required": "Status is required"
        })
});

const updateTaskSchema = Joi.object({
    title: Joi.string().min(5).messages({
        "string.min": "Title must be at least 5 characters long"
    }),

    description: Joi.string().min(10).messages({
        "string.min": "Description must be at least 10 characters long"
    }),

    status: Joi.string()
        .valid("pending", "in progress", "completed")
        .required()
        .messages({
            "any.only": "Invalid status value",
            "any.required": "Status is required"
        })
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};