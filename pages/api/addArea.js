import {connect} from '../../util/dbController'
import Area from '../../model/area'

export default async function handler(req,res) {
    if (req.method === 'POST'){
        await connect()
        const {name, park, province, difficulty, distance, duration} = req.body

        try {
            const newArea = new Area({
                Name: name,
                Difficulty: difficulty,
                Distance: distance,
                Park: park,
                Province: province,
                Duration: duration,
            })
            await newArea.save()
            res.status(201).json(newArea)
        } catch (error) {
            res.status(500).json({error: 'Could not create new area'})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}