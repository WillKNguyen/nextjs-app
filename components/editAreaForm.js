import styles from './addAreaForm.module.css'
import { useState } from 'react'

export default function EditAreaForm({area, isOpen, onSave, setEditShowForm}){
    if (!isOpen || !area) return null

    const [name, setName] = useState(area.Name)
    const [park, setPark] = useState(area.Park)
    const [province, setProvince] = useState(area.Province)
    const [distance, setDistance] = useState(area.Distance)
    const [duration, setDuration] = useState(area.Duration)
    const [difficulty, setDifficulty] = useState(area.Difficulty) 
    const [notes, setNotes] = useState(area.Notes) 
    const [completed, setCompleted] = useState(area.Completed) 

    function onClose(){
        setEditShowForm(false)
    }

    async function handleSave(event){
        event.preventDefault()
        const id = area._id
        const editArea = {id, name, park, province, difficulty, distance, duration, notes, completed}
        await fetch('/api/editArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editArea),
        })
        await onSave()
        onClose()
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{name}</h2>
                    <svg fill={completed ? '#4CAF50' : '#5f6368'} className={styles.icon} onClick={() => setCompleted(!completed)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <form className={styles.modalForm} onSubmit={handleSave}>
                    <input placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder='Park' type="text" value={park} onChange={(e) => setPark(e.target.value)} />
                    <input placeholder='Province' type="text" value={province} onChange={(e) => setProvince(e.target.value)} />
                    <input placeholder='Difficulty' type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                    <input placeholder='Distance' type="text" value={distance} onChange={(e) => setDistance(e.target.value)} />
                    <input placeholder='Duration' type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    <textarea placeholder='Notes' type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    <button className={styles.swankyButton} type="submit">Save</button>
                    <button className={styles.swankyButton} type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}