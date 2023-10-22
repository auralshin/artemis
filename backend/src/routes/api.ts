import express from 'express';

const router = express.Router();

router.get('/backend-setup', (req, res) => {
    res.send('backend setup');
});

export default router;
