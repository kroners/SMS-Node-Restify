const restifyErrors = require("restify-errors");
import { SNS } from "../../config/amazon";

// creating a topic
// const creatTopicSNS = SNS.createTopic({ Name: "newNodeTopic" }).promise();

// creatTopicSNS
//   .then(data => {
//     console.log(data);
//     console.log("Topic ARN is " + data.TopicArn);
//   })
//   .catch(error => {
//     console.error(err, err.stack);
//   });

// create SMS attributes
let params = {
  attributes: {
    DefaultSMSType: "Transactional"
  }
};

// create promise and SNS service object
const setSMSAttributes = SNS.setSMSAttributes(params).promise();

setSMSAttributes
  .then(data => {
    console.log("ok setSMSAttributes");
    console.log(data);
  })
  .catch(err => {
    console.log("error setSMSAttributes");
    console.error(err, err.stack);
  });

// check if phone number is available
const checkIfPhoneNumberIsAvailable = phoneNumber => {
  const checkPhonePromise = SNS.checkIfPhoneNumberIsOptedOut({
    phoneNumber
  }).promise();

  // Handle promise
  checkPhonePromise
    .then(data => {
      console.log("Phone Opt Out is " + data.isOptedOut);
      return true;
    })
    .catch(err => {
      console.error(err, err.stack);
      return false;
    });
};

// function for send SMS promise
const sendSMSPromise = async params => {
  if (!params.MessageStructure) {
    params = { Message, MessageStructure: "String", PhoneNumber };
  }
  return new Promise((resolve, reject) => {
    SNS.publish(params, function(err, data) {
      if (err) {
        console.log("err sns.publish");
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log("ok sns publish");
        resolve(data);
      }
    });
  });
};

// function to send SMS
const sendSMS = async params => {
  console.log(params);
  const { Message, PhoneNumber } = params;

  // const checkPhoneNumber = await checkIfPhoneNumberIsAvailable(PhoneNumber);
  // if (!checkPhoneNumber) {
  //   console.log(`Phone number is not available ${PhoneNumber}`);
  //   return false;
  // }

  params = { Message, MessageStructure: "String", PhoneNumber };

  const resultSMSPromise = await sendSMSPromise(params);
  console.log("resultSMSPromise");
  console.log(resultSMSPromise);
  return resultSMSPromise;
};

export { sendSMS };
