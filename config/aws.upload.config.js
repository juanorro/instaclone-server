require('dotenv').config({ path: '.env' });
const AWS = require('aws-sdk');

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

const awsUploadImage = async(file, filePath) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${filePath}`,
        Body: file
    }

    try {
        const res = await s3.upload(params).promise();
        return res.Location;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
};

module.exports = awsUploadImage;