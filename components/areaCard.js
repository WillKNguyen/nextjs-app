import homeStyles from '../styles/Home.module.css'
import styles from './areaCard.module.css'
import TrailStat from './trailStat'

export default function AreaCard({area}){
    return (
        <div className={homeStyles.card}>
            <div className={styles.header}>
                <TrailStat statType={'Location'} stat={area.Park}></TrailStat>
                <div className={styles.statistics}>
                    <img src='/edit.svg'></img>
                    <img src='/delete.svg'></img>
                </div>
            </div>
            <h3>{area.Name}</h3>
            <div className={styles.statistics}>
                <TrailStat statType={'Difficulty'} stat={area.Difficulty}></TrailStat>
                <TrailStat statType={'Distance'} stat={area.Distance}></TrailStat>
                <TrailStat statType={'Duration'} stat={area.Duration}></TrailStat>
            </div>
        </div>
    )
}