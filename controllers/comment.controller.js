const Comment = require('../models/comments.models');

const addComment = (input, ctx) => {
    try {
        const comment = new Comment({
            idPublication: input.idPublication,
            idUser: ctx.user.id,
            comment: input.comment,
        });

        comment.save()

        return comment;
    } catch (error) {
        console.log(error)
    }
};

const getComments = async(idPublication) => {
    const result = await Comment.find({ idPublication }).populate('idUser');
    return result;
}

module.exports = {
    addComment,
    getComments,
}