import md5 from 'md5';
import type{ NextApiRequest, NextApiResponse} from 'next'
import { connectionDB } from '../../middlewares/connectionDB';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { UserRequest } from '../../types/UserRequest';
import { CodeResult } from '../../util/Enum';

const userendPoint = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
    if(req.method === 'POST'){
        const body = req.body as UserRequest;

        if(!body.name || body.name.length < 2){
            return res.status(CodeResult.DEFAULT).json({ msg: "Name User Invalid"})    
        }
        if(!body.email || body.email.length < 5){
            return res.status(CodeResult.DEFAULT).json({ msg: "Email User Invalid"})    
        }
        if(!body.password || body.password.length < 5){
            return res.status(CodeResult.DEFAULT).json({ msg: "Password User Invalid"})    
        }   
        
        const existingUserWithEmail = await UserModel.find({email : body.email});
        if(existingUserWithEmail && existingUserWithEmail.length){
            return res.status(400).json({ error : 'Já existe usuário com o email informado'});
        }

        const user = { name: body.name, email: body.email, password: md5(body.password) }

        await UserModel.create(user);
        
        return res.status(CodeResult.SUCCESS).json({ msg: "Create User Success"})    
    }
    return res.status(CodeResult.DEFAULT).json({ error: "Method Invalid"})
}

export default connectionDB(userendPoint)