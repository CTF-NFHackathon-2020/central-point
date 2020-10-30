'use strict';

var {LexRuntime, Credentials}  = require('aws-sdk')

var lexruntime = new LexRuntime({
  region: 'eu-west-1',
  credentials: new Credentials({
      accessKeyId: 'AKIAYD4VVMCMICQEWV5W',
      secretAccessKey: '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'
  })
})



module.exports.detectIntent = async event => {
  const detectedIntent =  await lexruntime.postText({
      botAlias: 'centralpoint',
      botName: 'CentralPoint',
      inputText: 'Set my pain level at 5',
      userId: 'manuelerez'
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: detectedIntent,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
