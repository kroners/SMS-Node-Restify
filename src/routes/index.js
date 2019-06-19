import { sendSMS } from "../backing/services/Amazon/sns";

const Router = require("restify-router").Router;
const routerInstace = new Router();

// SMS - Notifications
routerInstace.post("/message", async (req, res) => {
  if (!req.body.message || req.body.message == "") {
    req.body.message = "Message with no body";
  }
  try {
    console.log("before await sendSMS");
    let sendSMSResult = await sendSMS(req.body);
    console.log(sendSMSResult);
    console.log(typeof sendSMSResult);
    return res.json({
      data: sendSMSResult.MessageId || "",
      error_code: null,
      message: "OK",
      success: true
    });
  } catch (error) {
    console.log(error);
    return false;
  }
});

export default routerInstace;
