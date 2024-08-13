import {connect} from '../../util/dbController'
import Area from '../../model/area'

export default async function handler(req,res) {
    await connect()
    const areas = await Area.find({})
    res.status(200).json(areas)
}