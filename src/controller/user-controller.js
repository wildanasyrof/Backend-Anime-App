import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            message: "User registered successfully",
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            message: "User logged in successfully",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const request = req.body;
        request.id = userId;
        const result = await userService.update(request);
        res.status(200).json({
            message: "User updated successfully",
            data: result
        })
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    update
}