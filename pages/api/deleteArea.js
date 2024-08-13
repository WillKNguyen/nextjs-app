import {connect} from '../../util/dbController'
import Area from '../../model/area'

export default async function handler(req,res){
    if (req.method === 'DELETE'){
        await connect()
        const {id} = req.body

        try{
            await Area.findByIdAndDelete(id)
            res.status(200).end(`Area ${id} deleted`)
        } catch (error){
            res.status(500).json({error: 'Could not delete area'})
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}