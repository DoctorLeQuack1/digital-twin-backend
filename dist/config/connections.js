import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
export const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Solo para desarrollo (en producción usa un certificado)
            },
            decimalNumbers: true,
        },
        logging: false // Opcional: desactiva logs de queries en consola
    })
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
