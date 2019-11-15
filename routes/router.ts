import {Router, Request, Response} from 'express';

const router = Router();


router.get('/messages', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        message: 'All is good!'
    })
});
router.post('/messages', (req: Request, resp: Response) => {
const body = req.body['body'];
const from = req.body['from'];

    resp.json({
        ok: true,
        body,
        from
    })
});
router.post('/messages/:id', (req: Request, resp: Response) => {
const body = req.body['body'];
const from = req.body['from'];
const id = req.body['id'];

    resp.json({
        ok: true,
        body,
        from,
        id
    })
});

export  default router;
