const PostModel = require("../../services/models/postagens");

module.exports = {
    async DeletePost (request,response) {
        const {username} = request.user;
        const index = request.body.index;
        const PostUser = await PostModel.findOne({username});
        PostUser.Posts.splice(index,1);
        await PostUser.save();
        return response.status(200).json({messagem: 'Post apagado com sucesso'});
    }
};