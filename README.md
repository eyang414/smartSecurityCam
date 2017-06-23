
# SmartSecurityCam 
### by eyang414

## What this app does:

Alerts security/management team through text if your live-stream security cam, connected to internet, matches faces with VIP/red-flagged individuals.

## How this app does it:
  1. ***Currently taking photos with webcam, saving onto local drive, uploading to AWS S3*** [Working to use Wowza api to connect your security cam to live streaming services.]
  2. AWS rekognition facial recognition to match live images with AWS S3-stored images of VIP/red-flagged individuals.
  3. Zang api to push text notifications to alert proper individuals of the VIP/red-flag's presence.

## To get this app working:

- Configure AWS by filling in your AWS access keys in ./APP/config.json
- Configure zang api with your zang account in ./APP/zang.js
- Follow directions for project-specific inputs in '{directions}' formats
    - Examples
        - to: '{phone number that will receive message}' ---> to: '2123334444'
        - CollectionId: '{your collectionId}' ---> CollectionId: 'myCollectionId'
