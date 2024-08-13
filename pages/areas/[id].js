import {connect} from '../../util/dbController'
import Area from '../../model/area'
import Link from 'next/link'

export async function getServerSideProps(context){
    const {id} = context.params
    await connect()
    const area = await Area.findById(id).lean()

    return {
        props: {
            area: JSON.parse(JSON.stringify(area))
        }
    }
}

export default function AreaDetails({area}){ //short hand for props.area
    return(
        <div>
            <h1>{area.Name}</h1>
            <p><strong>Park:</strong> {area.Park}</p>
            <p><strong>Province:</strong> {area.Province}</p>
            <p><strong>Distance:</strong> {area.Distance} km</p>
            <p><strong>Notes:</strong> {area.Notes}</p>
            <Link href="/areas">Back to Areas</Link>
        </div>
    )
}