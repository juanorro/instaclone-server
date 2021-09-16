const Follow = require('../models/follow.models');
const User = require('../models/user.models');

const follow = async(username, ctx) => {

    const userFound = await User.findOne({ username });

    if(!userFound) {

        throw new Error('Usuario no encontrado');

    } else {

        try {
            const follow = new Follow({
                idUser: ctx.user.id,
                follow: userFound._id,
            })
            follow.save();
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }

    }
}

const isFollow = async(username, ctx) => {
    
    const userFound = await User.findOne({ username });

    if(!userFound) {

        throw new Error('Usuario no encontrado');

    } else {
            
        const follow = await Follow.find({ idUser: ctx.user.id })
            .where('follow')
            .equals(userFound._id);

        if(follow.length > 0) {
            return true;
        } else {
            return false;
        }

    }
}

const unFollow = async(username, ctx) => {
    const userFound = await User.findOne({ username });
    const follow = await Follow.deleteOne({ idUser: ctx.user.id })
        .where('follow')
        .equals(userFound._id);
    
        if(follow.deletedCount > 0) {
            return true;
        } else {
            return false;
        }

};

const getFollowers = async(username) => {
    const user = await User.findOne({ username });

    const followers = await Follow.find({ follow: user._id }).populate('idUser');

    const followersList = [];

    for await (const data of followers) {
        followersList.push(data.idUser);
    }

    return followersList;
}

const getFollows = async(username) => {
    const user = await User.findOne({ username });

    const follows = await Follow.find({ idUser: user._id }).populate('follow');

    const followsList = [];

    for await (const data of follows) {
        followsList.push(data.follow);
    }
    return followsList;
}

module.exports = {
    follow,
    isFollow,
    unFollow, 
    getFollowers,
    getFollows,
}