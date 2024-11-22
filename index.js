import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import utf from 'utf'; 
require ('./database.js')
import salaoRoutes from './src/routes/salao.routes.js';
import clienteRoutes from './src/routes/cliente.routes.js';
import servicoRoutes from './src/routes/servico.routes.js';
import colaboradorRoutes from './src/routes/colaborador.routes.js';
import horarioRoutes from './src/routes/horario.routes.js';
import agendamentoRoutes from './src/routes/agendamento.routes.js';

const app = express();
const upload = multer({ dest: 'upload/' });
const port = 8000;

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Arquivo enviado com sucesso!');
});

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.set('port', port);

app.use('/salao', salaoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/servico', servicoRoutes);
app.use('/colaborador', colaboradorRoutes);
app.use('/horario', horarioRoutes);
app.use('/agendamento', agendamentoRoutes);

app.listen(port, () => {
  console.log('WS Escutando na porta http://localhost:${port}');
});