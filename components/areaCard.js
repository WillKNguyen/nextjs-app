import Link from 'next/link'
import homeStyles from '../styles/Home.module.css'
import styles from './areaCard.module.css'
import TrailStat from './trailStat'
import DeleteDialog from './deleteDialog'
import { useState } from 'react'

export default function AreaCard({area, onDelete, setEditShowForm, setEditFormContent}){
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    function handleDeleteClick(){setShowDeleteDialog(true)}

    function handleEditClick(){
        setEditShowForm(true)
        setEditFormContent(area)
    }

    async function confirmDelete(){
        await fetch('/api/deleteArea', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: area._id}),
        })
        setShowDeleteDialog(false)
        await onDelete()
    }

    function cancelDelete(){setShowDeleteDialog(false)}

    return (
        <div className={homeStyles.card}>
            <div className={styles.header}>
                <TrailStat statType={'Location'} stat={area.Park}></TrailStat>
                <div className={styles.statistics}>
                    <img className={styles.icon} src='/edit.svg' style={{cursor: 'pointer'}} onClick={handleEditClick}></img>
                    <img className={styles.icon} src='/delete.svg' onClick={handleDeleteClick} style={{cursor: 'pointer'}}></img>
                </div>
            </div>
            <Link href={`/areas/${area._id}`}>
                <h3>{area.Name}</h3>
            </Link>
            <div className={styles.footer}>
                <div className={styles.statistics}>
                    <TrailStat statType={'Difficulty'} stat={area.Difficulty}></TrailStat>
                    <TrailStat statType={'Distance'} stat={area.Distance}></TrailStat>
                    <TrailStat statType={'Duration'} stat={area.Duration}></TrailStat>
                </div>
                <TrailStat statType={'Completed'} stat={area.Completed ? 'Completed' : null}></TrailStat>
            </div>
            {showDeleteDialog && (
                <DeleteDialog className={styles.dialogOverlay} confirm={confirmDelete} cancel={cancelDelete}></DeleteDialog>
            )}
        </div>
    )
}