import {connect} from '../util/dbController.js'
import Area from '../model/area.js'
import AreaCard from '../components/areaCard.js'
import Link from 'next/link'
import styles from './areas.module.css'
import { useState } from 'react'
import AddAreaForm from '../components/addAreaForm.js'

export async function getServerSideProps(){
    await connect()
    const areas = await Area.find({})
    return {
        props:{
            areas: JSON.parse(JSON.stringify(areas))
        }
    }
} 

export default function Areas({ areas }) {
    const [showForm, setShowForm] = useState(false)
    const [areaList, setAreaList] = useState(areas)    

    async function handleAdd(){
        const res = await fetch('/api/getAreas')
        setAreaList(await res.json())
    }

    return (
        <div>
            <h1>Areas</h1>
            <button onClick={()=>setShowForm(true)}>Add New</button>
            <AddAreaForm isOpen={showForm} onClose={() => setShowForm(false)} onAdd={handleAdd}/>
            <div className={styles.cardContainer}>
                {areaList.map(area => (
                    <AreaCard area={area} key={area._id}></AreaCard>
                ))}
            </div>
            <Link href='/'>Back to home</Link>
        </div>
    );
}