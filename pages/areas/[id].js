import { connect } from '../../util/dbController';
import Area from '../../model/area';
import Link from 'next/link';
import styles from '../../components/areaDetails.module.css';
import TrailStat from '../../components/trailStat';
import { useState } from 'react'
import EditAreaForm from '../../components/editAreaForm';
import OSMap from '../../components/map/osMap';

export async function getServerSideProps(context) {
  const { id } = context.params;
  await connect();
  const area = await Area.findById(id).lean();

  return {
    props: {
      area: JSON.parse(JSON.stringify(area)),
    },
  };
}
export default function AreaDetails({ area }) {
    const [showEditForm, setEditShowForm] = useState(false)
    const [areaData, setAreaData] = useState(area)

    async function handleAreaDetailsChange(){
        const updatedArea = await fetch(`/api/getAreas?id=${encodeURIComponent(area._id)}`)
        setAreaData(await updatedArea.json())
    }

    function displayNotes(){
        if (!areaData.Notes) {return null}

        const lines = areaData.Notes.split('\n')
        
        return(
            <ul className={styles.scrollableList}>
                {lines.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.completed}>
                <button className={styles.swankyButton} onClick={() => setEditShowForm(true)}>Edit</button>
                <TrailStat  statType={'Completed'} stat={areaData.Completed ? 'Completed' : null}></TrailStat>
            </div>
            {showEditForm ? <EditAreaForm area={areaData} isOpen={showEditForm} setEditShowForm={setEditShowForm} onSave={handleAreaDetailsChange}></EditAreaForm> : null}
            <h1 className={styles.title}>{areaData.Name}</h1>
            <div className={styles.infoContainer}>
                <TrailStat statType={'Location'} stat={`${areaData.Park}, ${areaData.Province}`}></TrailStat>
                <TrailStat statType={'Difficulty'} stat={areaData.Difficulty}></TrailStat>
                <TrailStat statType={'Distance'} stat={areaData.Distance}></TrailStat>
                <TrailStat statType={'Duration'} stat={areaData.Duration}></TrailStat>
                
            </div>

            {areaData.Gpx && areaData.Gpx.length > 0 ? <OSMap gpxFile={areaData.Gpx}></OSMap> : null}

            <div>
                <strong>Notes</strong>
                {displayNotes()}
            </div>
            <Link href="/areas" className={styles.backLink}>Back to Areas</Link>
        </div>
    );
}
