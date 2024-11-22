import express from 'express';
const router = express.Router();
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Horario = require('../models/horario');
const utf = require('utf-8');
const util = require('../util');


router.post('/', async (req, res) => {
  try {
    const salao = new Salao(req.body);
    
    await salao.save();

    res.json({ salao });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get ('/', (req, res) => {
  res.send('Rota de salões funcionando!')
})

router.get('/servicos/:salaoId', async (req, res) => {
  try {
    const { salaoId } = req.params;
    
    const servicos = await Servico.find({
      salaoId,
      status: 'A',
    }).select('_id titulo');

    res.json({
      error: false,
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })), 
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/filter/:id', async (req, res) => {
  try {
    const fields = Array.isArray(req.body.fields) ? req.body.fields : [];
    
    const salao = await Salao.findById(req.params.id).select(fields);

    if (!salao.geo || !Array.isArray(salao.geo.coordinates) || salao.geo.coordinates.length !== 2) {
      return res.json({ error: true, message: 'Coordenadas inválidas para o salão' });
    }
    
    const distance = turf.distance(
      turf.point(salao.geo.coordinates),
      turf.point([-30.043858, -51.103487]) 
    ).toFixed(2);  

    const horarios = await Horario.find({
      salaoId: req.params.id,
    }).select('dias inicio fim');

    const isOpened = await util.isOpened(horarios);

    res.json({ error: false, salao: { ...salao._doc, distance, isOpened } });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
