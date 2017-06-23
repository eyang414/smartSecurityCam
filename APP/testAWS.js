const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json');

const rek = new AWS.Rekognition({apiVersion: '2016-06-27'})
const s3 = new AWS.S3

const params = {
  CollectionId: '{your collectionId}' /* required */
};

rek.createCollection(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
