// This file is where the magic happens.
// There is a setTimeout, before running AWS rekognition, to account for any delays in storing live image in AWS S3.

const AWS = require('aws-sdk')
const fs = require('fs')
AWS.config.loadFromPath('./config.json');

const zangSMS = require('./zang.js')

const rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'})
const s3Bucket = new AWS.S3({params: {Bucket: '{AWS S3 bucket where live camera images are saved}'}})

let image = {}
let rekParams = {}

//NOTE: This fs.readFile part will probably change once I figure out how to connect live stream camera.

fs.readFile('../securityCamImage.jpg', (err, data) => {
  if (err) throw err;
  else {
    console.log('you got the image', data);

    image = {Key: "security-cam-image-demo.jpg", Body: data, ACL: 'public-read'};

    s3Bucket.putObject(image, function(err, image){
      if (err)
        { console.log('Error uploading image: ', image);
        } else {
          console.log('succesfully uploaded the image!');
        }
    });

    setTimeout(() => {
      rekParams = {
        CollectionId: '{your collectionId}', /* required */
        Image: { /* required */
          S3Object: {
            Bucket: '{AWS S3 bucket where live camera images are saved}',
            Name: '{security cam live image name}'
          }
        },
        FaceMatchThreshold: 90,
        MaxFaces: 5
      };
      rekognition.searchFacesByImage(rekParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          console.log(data);           // successful response

          if (data.FaceMatches.length > 0) {
            console.log('someone important was found on camera#...')

            zangSMS.sendSmsMessage({
                to: '{phone number that will receive message}',
                from: '{zang phone number}',
                body: '{the SMS text message that you want to send}',
                allowMultiple: true
            }).then(function (data) {
                console.log('an SMS message was sent');
            });

          }

        else {
          console.log("the person was NOT a VIP")
        }
        }
      });

    }, 3000)

  }
});
