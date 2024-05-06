const NotificationModel= require("../services/models/notification");
module.exports = async function (request,response) {
    const {username} = request.user;

    const {index} = request.body;

    const Notification = await NotificationModel.findOne({username});

    Notification.notification.splice(index,1);

    await Notification.save();

    return response.status(200).json({sucess:true});
};