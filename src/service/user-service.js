import {validate} from "../validation/validation.js";
import {loginUserValidation, registerUserValidation, updateUserValidation} from "../validation/user-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../utils/response-error.js";
import bcrypt from "bcrypt";
import {v4 as UUIDv4} from 'uuid';
import jwt from "jsonwebtoken";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "Email already registered");
    }

    user.id = UUIDv4();
    user.password = await bcrypt.hash(user.password, 12);

    return prismaClient.user.create({
        data: user,
        select: {
            email: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        },
    });

    if (!user) {
        throw new ResponseError(401, "Email or Password invalid!");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or Password invalid!");
    }

    const token = jwt.sign(
        { id: user.id },
        process.env["JWT_SECRET"], // Replace with a secure, environment-based secret key
        { expiresIn: "7d" }
    );

    return { token, id: user.id, email: user.email };
};

const update = async (request) => {
    const updateRequest = validate(updateUserValidation, request);

    if (updateRequest.username) {
        const countUsername = await prismaClient.user.count({
            where: {
                username: updateRequest.username
            }
        });

        if (countUsername !== 0) {
            throw new ResponseError(400, "Username already used!");
        }
    }

    if (updateRequest.email) {
        const countEmail = await prismaClient.user.count({
            where: {
                email: updateRequest.email
            }
        });

        if (countEmail !== 0) {
            throw new ResponseError(400, "Email already used!");
        }
    }

    return prismaClient.user.update({
        where: {
            id: request.id,
        },
        data: updateRequest,
        select: {
            username: true,
            name: true,
            email: true,
            imgUrl: true,
        }
    });
}


export default {
    register,
    login,
    update
}