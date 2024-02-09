const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    try {
        console.log("body", req.body.token);
        const token = req.body.token;
        if(!token || token === undefined){
            throw {
                message: 'Token Missing'
            }
        }
        //verify token:-
        const payload = jwt.verify(token,'dhruv');
        console.log(payload);
        req.user = payload;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            data: {},
            success: false,
            message: 'Something went wrong while verifying token',
            err: error
        });
    }
}

const isStudent = (req,res,next) => {
    try {
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                data: {},
                success: false,
                message: 'Only for students',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            data: {},
            success: false,
            message: 'User role not matching',
            err: error
        });
    }
}

const isAdmin = (req,res,next) => {
    try {
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                data: {},
                success: false,
                message: 'Only for Admin',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            data: {},
            success: false,
            message: 'User role not matching',
            err: error
        });
    }
}

module.exports = {
    auth,
    isStudent,
    isAdmin
}