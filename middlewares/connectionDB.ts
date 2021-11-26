import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';
import { error } from 'console';

export const connectionDB = (handler: NextApiHandler) =>
    async(req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {

        console.log('MongoDb readystate', mongoose.connections[0].readyState)
        if(mongoose.connections[0].readyState){
            return handler(req, res);
        }

        const {DB_CONNECTION_STRING} = process.env;
        if(!DB_CONNECTION_STRING){
            return res.status(500).json({error: "Erro connection DataBase"})
        }

        await mongoose.connect(DB_CONNECTION_STRING);
        mongoose.connection.on('connected', () => console.log('Conectado ao bando de dados'))
        mongoose.connection.on('error', () => console.log('Erro ao conecta rno bando de dados'))

        return handler(req, res);
}