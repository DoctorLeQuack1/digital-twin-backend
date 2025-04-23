import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './config/connections.js';
import './models/index.js';
import dotenv from 'dotenv';
dotenv.config();
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
const db_connection = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log(`Successfully connected to ${process.env.DB_NAME} database...`);
    }
    catch (error) {
        console.error(`Unable to connect to the data base. Error: ${error}`);
    }
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
await db_connection();
await server_init();
