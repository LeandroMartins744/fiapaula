import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';
import { debug, error } from 'console';
import { redirect } from 'next/dist/server/api-utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const jwtValidator = (handler: NextApiHandler) =>
    async(req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {

       const {MY_SECRET_KEY} = process.env;
       if(!MY_SECRET_KEY){
           return res.status(500).json({error: "My Secret Id não informada"});
       }
       
       if(!req || !req.headers){
            return res.status(500).json({error: "Header inválidos"});
       }

       if(req.method !== 'OPTIONS'){
           try{
               
                
                const authorization = req.headers['authorization']
                if(!authorization){
                        return res.status(400).json({error: "Header inválidos"});
                }
                const token = authorization.substr(7);

                if(!token){
                        return res.status(400).json({error: "Token nao informado"});
                }

                const decode = await jwt.verify(token, MY_SECRET_KEY) as JwtPayload;
                if(!decode){
                        return res.status(400).json({error: "Falha do decode token"});
                }

                if(req.body){
                    req.body.userId = decode._id;
                }
                else if(req.query){
                    req.query.userId = decode._id;
                }
                }
                catch(e){
                    
                }
       }

       return handler(req, res);
}