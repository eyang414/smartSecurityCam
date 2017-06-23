const zang = require('zang-node')
const enums = zang.enums;

const connector = new zang.Connectors({
    accountSid: '{your zang accountSid}',
    authToken: '{your zang authToken}'
});

const smsConnector = connector.sms;

module.exports = smsConnector
