const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/jwt.helper');

const register = async (input) => {
    const { username, email, password } = input;

    const emailExist = await User.findOne({ email });
    if(emailExist) {
        throw new Error('Email already exist')
    };

    const usernameExist = await User.findOne({ username });
    if(usernameExist) {
        throw new Error('Username already exist')
    };

    const salt = await bcrypt.genSaltSync(10);
    input.password = await bcrypt.hash(password, salt);

    try {
        const user = new User(input); 
        user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

const login = async (input) => {
    const { email, password } = input;

    const userExist = await User.findOne({ email });
    if(!userExist) {
        throw new Error('Email or password incorrect');
    };

    const correctPasswor = await bcrypt.compare(password, userExist.password);
    if(!correctPasswor) {
        throw new Error('Email or password incorrect');
    };
    
    return {
        token: createToken(userExist, process.env.SECRET_KEY, '24h')
    }
};

const getUser = async(id, username) => {
    let user = null;

    if(id) {
        user = await User.findById(id);
    }

    if(username) {
        user = await User.findOne({ username })
    }

    if(!user) {
        throw new Error('El usuario no existe');
    } else {
        return user;
    }
}

const updateAvatar = async(file) => {
    console.log('este es el fichero en el server => ', file);
    return null;
}

module.exports = {
    register,
    login,
    getUser,
    updateAvatar,
} 