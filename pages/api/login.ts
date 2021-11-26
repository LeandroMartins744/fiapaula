import md5 from 'md5';
import type{ NextApiRequest, NextApiResponse} from 'next'
import { connectionDB } from '../../middlewares/connectionDB';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { LoginRequest } from '../../types/LoginRequest';


const loginEndPoint = async(req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
    if(req.method === 'POST'){
        const body = req.body as LoginRequest;

        if(!body || !body.login || !body.password){
            return res.status(400).json({ error: "Login ou Senha Invalidxxxxxxx"})
        }

        const userFound = await UserModel.find({email: body.login, password: md5(body.password)})

        if(userFound && userFound.length){
            return res.status(200).json({ msg: "Login Success"})
        }

        return res.status(400).json({ error: "Login ou Senha Invalid"})
    }
    return res.status(405).json({ error: "Method Invalid"})
}

export default connectionDB(loginEndPoint)