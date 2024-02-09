const UserService = require('../services/user-service');

const userService = new UserService();

const signUp = async (req,res) => {
    try {
        const response = await userService.signUp(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully signed-up',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to sign-up',
            err: error
        });
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.login(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully login',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to sign-in',
            err: error
        });
    }
}

module.exports = {
    signUp,
    signIn
}