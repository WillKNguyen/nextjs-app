import {connect} from '../../util/dbController'
import Area from '../../model/area'

export default async function handler(req,res) {
    if (req.method === 'POST'){
        await connect()
        const {id, name, park, province, difficulty, distance, duration, notes, completed, gpx} = req.body
        try {
            const updatedData = {
                Name: name,
                Difficulty: difficulty,
                Distance: distance,
                Park: park,
                Province: province,
                Duration: duration,
                Notes: notes,
                Completed: completed,
                Gpx: gpx
            }

            const updatedArea = await Area.findByIdAndUpdate(id, updatedData, {
                new: true,
                runValidators: true
            })

            if(!updatedArea) {
                return res.status(404).json({error: 'Area not found'})
            }

            res.status(201).json(updatedArea)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Could not create new area'})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}