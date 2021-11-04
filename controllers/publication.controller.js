const Publication = require('../models/publication.models');
const User = require('../models/user.models');
const awsUploadImage = require('../config/aws.upload.config');
const {v4: uuidv4} = require('uuid');

const publish = async(file, ctx) => {
    const { id } = ctx.user;

    const { createReadStream, mimetype } = await file;
    const extenxion = mimetype.split('/')[1];
    const fileName = `publication/${uuidv4()}.${extenxion}`;
    const fileData = createReadStream();

    try {
        const result = await awsUploadImage(fileData, fileName);
        const publication = new Publication({
            idUser: id, 
            file: result,
            typFile: mimetype.split('/')[0],
            createAt: Date.now(),
        });
        publication.save();

        return {
            status: true,
            urlFile: result
        }
    } catch (error) {
        return {
            status: null,
            urlFile: '',
        }
    }
};

const getAllPublications = async(username) => {
    const user = await User.findOne({ username });
    if(!user) throw new Error('Usuario no encontrado');

    const publications = await Publication.find()
        .where({ idUser: user._id })
        .sort({ createAt: -1 });

    return publications
}

module.exports = {
    publish,
    getAllPublications,
}