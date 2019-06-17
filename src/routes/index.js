import { sendSMS } from "../backing/services/Amazon/sns";

const Router = require("restify-router").Router;
const routerInstace = new Router();

// SMS - Notifications
routerInstace.post("/message", async (req, res) => {
  if (!req.body.Message || req.body.Message == "") {
    req.body.Message = "Message with no body";
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

routerInstace.get("/messages", async (req, res) => {
  try {
    let usersNotify = await notify.getUsers({ limit: 10 });
    sendNotifications(usersNotify);
    Success(res, "Todo Ok", data);
  } catch (exception) {
    if (exception instanceof NotFoundException) {
      NotFound(res, exception.message);
    } else {
      InternalServerError(res, exception.message);
    }
  }
});

export default routerInstace;
