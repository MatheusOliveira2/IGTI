import exrpess from 'express';

const router = exrpess.Router();

router.get('/teste/preco', (req, res) => {
  res.send('teste/preco');
});

router.post('/teste', (req, res) => {
  res.send(req.body);
});

export default router;
