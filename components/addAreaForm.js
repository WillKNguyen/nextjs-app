import { useState } from "react";
import styles from './addAreaForm.module.css'

export default function AddAreaForm({isOpen, onClose, onAdd}){
    const [name, setName] = useState('')
    const [park, setPark] = useState('')
    const [province, setProvince] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [difficulty, setDifficulty] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        const newArea = {name, park, province, difficulty, distance, duration}
        
        await fetch('/api/addArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArea),
        })

        await onAdd()
        onClose()
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
                    <button type="submit">Add Area</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}