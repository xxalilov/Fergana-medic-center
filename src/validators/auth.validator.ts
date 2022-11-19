import {body} from "express-validator";

export const signInValidator = [
    body('login').isString().withMessage("Please input your login"),
    body('password').isString().withMessage("Please input your password")
]