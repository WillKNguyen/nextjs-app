import styles from './areaCard.module.css'

export default function DeleteDialog({confirm, cancel}){
    return (
        <div className={styles.dialog}>
            Are you sure?
            <div>
                <button onClick={confirm}>Yes</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}