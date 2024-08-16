import { useState } from "react";
import styles from './addAreaForm.module.css'

export default function AddAreaForm({isOpen, onClose, onAdd}){
    const [name, setName] = useState(null)
    const [park, setPark] = useState(null)
    const [province, setProvince] = useState(null)
    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [gpx, setGpx] = useState(null)

    async function handleSubmit(event){
        event.preventDefault()
        const newArea = {name, park, province, difficulty, distance, duration, gpx}
        
        await fetch('/api/addArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArea),
        })

        await onAdd()
        onClose()
        setName(null)
        setDifficulty(null)
        setDistance(null)
        setDuration(null)
        setPark(null)
        setProvince(null)
        setGpx(null)
    }

    function handleGpxUpload(event){
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onload = function(e){
            const content = e.target.result; // Access the result (file content)
            setGpx(content); // Store the content in state
        };

        reader.readAsText(file)
    }

    if (!isOpen){
        return null
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Add New Area</h2>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <input placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder='Park' type="text" value={park} onChange={(e) => setPark(e.target.value)} />
                    <input placeholder='Province' type="text" value={province} onChange={(e) => setProvince(e.target.value)} />
                    <input placeholder='Difficulty' type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                    <input placeholder='Distance' type="text" value={distance} onChange={(e) => setDistance(e.target.value)} />
                    <input placeholder='Duration' type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    <label>Upload GPX file
                        <input type="file" accept=".gpx" onChange={handleGpxUpload} />
                    </label>
                    <button type="submit">Add Area</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}