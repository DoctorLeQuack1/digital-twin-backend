import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import mongoose_connect from './config/connections.js';
dotenv.config();
const app = express();
const PORT = 3001;
// Permitir solo tu frontend
app.use(cors({
    origin: 'https://woof-quest.web.app', // <-- Cambia esto según dónde corra tu frontend
    credentials: true // Si vas a enviar cookies o headers de autenticación
}));
// Otros middlewares
// Serves static files in the entire client's dist folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Rutas de ejemplo
const mongoose_db = async () => {
    mongoose_connect.once('open', () => {
        console.log(`Connected to MongoDB database at ${mongoose_connect.host}:${mongoose_connect.port}`);
    });
};
const server_init = async () => {
    try {
        await new Promise((resolve, reject) => {
            app.listen(PORT, () => {
                console.log(`Backend server running on http://localhost:${PORT}...`);
                resolve();
            });
        });
    }
    catch (error) {
        console.error(`Unable to start backend service. Error: ${error}`);
    }
};
await mongoose_db();
await server_init();
