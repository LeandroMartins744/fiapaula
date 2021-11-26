import md5 from 'md5';
import type{ NextApiRequest, NextApiResponse} from 'next'
import { connectionDB } from '../../middlewares/connectionDB';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { LoginRequest } from '../../types/LoginRequest';
import jwt from 'jsonwebtoken';


const loginEndPoint = async(req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | LoginResponse>) => {
    const {MY_SECRET_KEY} = process.env;
    if(!MY_SECRET_KEY){
        return res.status(500).json({error: "Erro chave nao encontrada"})
    }

    if(req.method === 'POST'){
        const body = req.body as LoginRequest;

        if(!body || !body.login || !body.password){
            return res.status(400).json({ error: "Login ou Senha Invalidxxxxxxx"})
        }

        const userFound = await UserModel.find({email: body.login, password: md5(body.password)})

        if(userFound && userFound.length){
            const user = userFound[0];
            const token = jwt.sign({_id: user._id}, MY_SECRET_KEY);

            const result = { name: user.name, email: user.email, token }

            return res.status(200).json(result)
        }

        return res.status(400).json({ error: "Login ou Senha Invalid"})
    }
    return res.status(405).json({ error: "Method Invalid"})
}

export default connectionDB(loginEndPoint)