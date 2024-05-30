const NotificationModel= require("../services/models/notification");
module.exports = async function (request,response) {
    try {
        const {username} = request.user;

        const {index} = request.body;

        const Notification = await NotificationModel.findOne({username});

        Notification.notification.splice(index,1);

        await Notification.save();

        return response.status(200).json({sucess:true});
    }
    catch (e) {
        return response.status(500).render('err/500',{
            title: "Err server",
            img: "http://localhost:8080/imgs/node.png",
            jsFiles: ["http://localhost:8080/js/index.js"],
            cssFiles: ["http://localhost:8080/css/header.css",'http://localhost:8080/css/index.css']
        })
    }
};