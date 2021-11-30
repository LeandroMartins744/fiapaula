import type{ NextApiRequest, NextApiResponse} from 'next'
import { connectionDB } from '../../middlewares/connectionDB';
import { jwtValidator } from '../../middlewares/jwtValidator';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { TaksRequest } from '../../types/TaskRequest';
import { CodeResult } from '../../util/Enum';
import { TaskModel } from '../../models/TaskModel';
import moment from 'moment';

const taskendPoint = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
    if(req.method === 'POST'){
        const {userId} = req.body || req.query;
        const body = req.body as TaksRequest;

        if(!userId){
            return res.status(CodeResult.DEFAULT).json({ msg: "Usuario não informado"})    
        }

        if(!body.name || body.name.length < 2){
            return res.status(CodeResult.DEFAULT).json({ msg: "Name User Invalid"})    
        }

        const previsionDate = moment(body.previsionDate);
        if(previsionDate.isBefore(moment())){
            return res.status(CodeResult.DEFAULT).json({ msg: "Data não pode ser menos que a data atual"})    
        }

        const task = { name: body.name, userId: userId, previsionDate: previsionDate.toDate() }

        await TaskModel.create(task);
        
        return res.status(CodeResult.SUCCESS).json({ msg: "Create Taks Success"})    
    }
    return res.status(CodeResult.DEFAULT).json({ error: "Method Invalid"})
}

export default connectionDB(jwtValidator(taskendPoint))