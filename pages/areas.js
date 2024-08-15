import {connect} from '../util/dbController.js'
import Area from '../model/area.js'
import AreaCard from '../components/areaCard.js'
import Link from 'next/link'
import styles from './areas.module.css'
import { useState } from 'react'
import AddAreaForm from '../components/addAreaForm.js'
import EditAreaForm from '../components/editAreaForm.js'
import Head from 'next/head';

export async function getServerSideProps(){
    await connect()
    const areas = await Area.find({}).lean()
    return {
        props:{
            areas: JSON.parse(JSON.stringify(areas))
        }
    }
} 

export default function Areas({ areas }) {
    const [showAddForm, setAddShowForm] = useState(false)
    const [showEditForm, setEditShowForm] = useState(false)
    const [editFormContent, setEditFormContent] = useState(null)
    const [areaList, setAreaList] = useState(areas)
    const [searchTerm, setSearchTerm] = useState(null)

    async function handleAreaListChange(){
        const res = await fetch('/api/getAreas')
        setAreaList(await res.json())
    }

    async function resetEditForm(){
        await handleAreaListChange()
        setEditFormContent(null)
    }

    async function handleSearch(searchTerm){
        const res = await fetch(`/api/getAreas?name=${encodeURIComponent(searchTerm)}`)
        setAreaList(await res.json())
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Areas</title>
            </Head>
            <h1 className={styles.title}>Areas</h1>
            <div className={styles.searchBarContainer}>
                <input type="text" className={styles.searchBar} placeholder="Search areas..." onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        handleSearch(searchTerm); // Call your search function here
                        }
                }}/>
                <button className={styles.swankyButton} onClick={() => handleSearch(searchTerm)}>
                    <img src={'/search.svg'}></img>
                </button>
            </div>
            <button className={styles.swankyButton} onClick={()=>setAddShowForm(true)}>Add New</button>
            <AddAreaForm isOpen={showAddForm} onClose={() => setAddShowForm(false)} onAdd={handleAreaListChange}/>
            <div className={styles.cardContainer}>
                {areaList.map(area => (
                    <AreaCard area={area} key={area._id} onDelete={handleAreaListChange} setEditFormContent={setEditFormContent} setEditShowForm={setEditShowForm}></AreaCard>
                ))}
            </div>
            <EditAreaForm area={editFormContent} isOpen={showEditForm} setEditShowForm={setEditShowForm} onSave={resetEditForm}></EditAreaForm>
            <Link href='/' className={styles.backLink}>Back to Home</Link>
        </div>
    );
}