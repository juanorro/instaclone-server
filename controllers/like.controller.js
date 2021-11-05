const Like = require('../models/like.models.js');

const addLike = (idPublication, ctx) => {
    try {
        const like = new Like({
            idPublication, 
            idUser: ctx.user.id,
        });

        like.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteLike = async(idPublication, ctx) => {
    try {
        await Like.findOneAndDelete({ idPublication }).where({ idUser: ctx.user.id });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };
};

const isLike = async(idPublication, ctx) => {
    try {
        const result = await Like.findOne({ idPublication }).where({ idUser: ctx.user.id });
        if(!result) throw new Error('No ha dado a like');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };
};

const countLikes = async(idPublication) => {
    try {

        const count = await Like.countDocuments({ idPublication }); 
        return count;

    } catch (error) {

        console.log(error);
        return false;
        
    }
};

module.exports = {
    addLike,
    deleteLike,
    isLike,
    countLikes,
}