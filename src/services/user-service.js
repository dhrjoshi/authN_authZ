const UserRepository = require('../repository/user-repository');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        try {
            const email = data.email;
            const existingUser = await this.userRepository.findBy({email});
            if(existingUser){
                throw {
                    message: 'User already exists'
                }
            }
            const hashedPassword = await bcrypt.hash(data.password,10);
            data.password = hashedPassword;
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }

    async login(data) {
        try {
            if(!data.email || !data.password){
                throw {
                    message: 'Fill all details carefully'
                }
            }
            const email = data.email;
            let user = await this.userRepository.findBy({email});
            if(!user){
                throw {
                    message: 'User not registered'
                }
            }
            //verify password and generate JWT token
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            };
            if(await bcrypt.compare(data.password,user.password)){
                const token = jwt.sign(payload, 'dhruv', {expiresIn: '1h'});
                user = user.toObject();
                user.token = token;
                user.password = undefined;

                // const options = {
                //     expires: new Date( Date.now() + 3*24*60*60*1000),
                //     httpOnly:true
                // }
                return {token,user};
            } else{
                throw {
                    message: 'Password Incorrect'
                }
            }
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }
}

module.exports = UserService;