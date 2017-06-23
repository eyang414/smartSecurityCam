// Run this file to make a Collection of faces that you will match live photos with.
// This file takes images from your AWS S3 bucket and stores them in an AWS Rekognition Collection.

const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json');

const rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'})
const s3 = new AWS.S3

var params = {
  CollectionId: '{your collectionId}', /* required */
  Image: { /* required */
    S3Object: {
      Bucket: '{AWS S3 bucket where you will store VIP/red-flag photos to match}',
      Name: '{name of your photo in AWS S3 bucket}'
    }
  },
  DetectionAttributes: [
    "ALL", "DEFAULT"
  ],
  ExternalImageId: ''
};
rekognition.indexFaces(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
       console.log(data);           // successful response
       console.log(data.FaceRecords[0].Face)
    }
});
