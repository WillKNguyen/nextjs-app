import {connect} from '../../util/dbController'
import Area from '../../model/area'

export default async function handler(req,res) {
    await connect()
    if (!req.query){
        const areas = await Area.find({})
        return res.status(200).json(areas)
    } 

    const {searchTerm}  = req.query
    const areas = await Area.find({ Name: new RegExp(searchTerm, 'i') });
    res.status(200).json(areas)

}