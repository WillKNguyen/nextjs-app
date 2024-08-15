import {connect} from '../../util/dbController'
import Area from '../../model/area'

export default async function handler(req,res) {
    await connect()
    const queryContent = Object.keys(req.query)
    if (queryContent.length === 0){
        const areas = await Area.find({})
        return res.status(200).json(areas)
    } 

    const searchTerm = queryContent[0] //should only be 1 search param

    if (searchTerm==='name'){
        const areas = await Area.find({ Name: new RegExp(req.query[searchTerm], 'i') });
        return res.status(200).json(areas)
    }

    if (searchTerm === 'id'){
        const area = await Area.findById(req.query[searchTerm])
        return res.status(200).json(area)
    }
}