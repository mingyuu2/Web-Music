import HttpRouter from "../type/HttpRouter";

const roomCreate: HttpRouter = {
    path: "/room",
    method: "post",
    handler: async (req, res) => {
        const { creator } = req.query;

        if (!creator) {
            return res.sendStatus(400);
        }

        // TODO: Implement Create Room
    }
};

export default roomCreate;
