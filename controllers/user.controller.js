const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/jwt.helper');
const awsUploadImage = require('../config/aws.upload.config');

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

const updateAvatar = async(file, ctx) => {
    const { id } = ctx.user;
    const { mimetype, createReadStream } = await file;
    const extension = mimetype.split('/')[1];
    const imagePath = `avatar/${id}.${extension}`
    const fileData = createReadStream();

    try {
        const result = await awsUploadImage(fileData, imagePath);
        await User.findByIdAndUpdate(id, { avatar: result });
        return {
            status: true, 
            urlAvatar: result
        }
    } catch (error) {
        return {
            status: false,
            urlAvatar: null
        }
    }
};

const deleteAvatar = async(ctx) => {
    const { id } = ctx.user;

    try {
        await User.findByIdAndUpdate(id, { avatar: '' });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };
};

const updateUser = async(input, ctx) => {
    
    const { id } = ctx.user;
    const { currentPassword, newPassword } = input;

    try {

        if(currentPassword && newPassword) {

            //cambiar contraseña
            const userFound = await User.findById(id);

            const passwordSucess = await bcrypt.compare(
                currentPassword,
                userFound.password
            );

            if(!passwordSucess) {
                throw new Error('Contraseña incorrecta');
            }

            const salt = await bcrypt.genSaltSync(10);
            const newPasswordCrypt = await bcrypt.hash(newPassword, salt);

            await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
            
        } else {
            await User.findByIdAndUpdate(id, input);
        }

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const search = async(search) => {
    const users = await User.find({

        //con esta opción hay que escribir las cosas exactas
        // name: search

        //con esta opción te trae las cosas por las que empieza

        name: { $regex: search, $options: 'i' }
    })

    return users;
}

module.exports = {
    register,
    login,
    getUser,
    updateAvatar,
    deleteAvatar,
    updateUser,
    search
} 