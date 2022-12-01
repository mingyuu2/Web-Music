import HttpRouter from "../type/HttpRouter";

const roomUsers: HttpRouter = {
    method: "get",
    path: "/room/:id/users",
    handler: async (req, res) => {
        const roomId = req.params.id;

        if (!roomId || Number.isNaN(Number(roomId))) {
            return res.sendStatus(400);
        }
    }
};

export default roomUsers;
