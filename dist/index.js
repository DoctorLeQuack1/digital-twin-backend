import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
const app = express();
const PORT = 3001;
// Permitir solo tu frontend
app.use(cors({
    origin: 'http://localhost:5173', // <-- Cambia esto según dónde corra tu frontend
    credentials: true // Si vas a enviar cookies o headers de autenticación
}));
// Otros middlewares
// Serves static files in the entire client's dist folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Rutas de ejemplo
app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});
