import {Router, Request, Response} from 'express';
import Server from "../classes/server";

const router = Router();
const server = Server.instance;

router.get('/messages', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        message: 'All is good!'
    })
});
router.post('/messages', (req: Request, resp: Response) => {
    const body = req.body['body'];
    const from = req.body['from'];
    const payload = {
        from,
        body
    };

    server.io.emit('new-message', payload);
    resp.json({
        ok: true,
        body,
        from
    })
});
router.post('/messages/:id', (req: Request, resp: Response) => {
    const body = req.body['body'];
    const from = req.body['from'];
    const id = req.params['id'];
    const payload = {
        from,
        body
    };

    server.io.in(id).emit('private-message', payload);

    resp.json({
        ok: true,
        body,
        from,
        id
    })
});

export default router;
