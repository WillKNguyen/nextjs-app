import styles from './trailstat.module.css'
import areaCardStyles from './areaCard.module.css'

export default function TrailStat({statType,stat}){
    let svgFile
    let unit
    switch(statType.toLowerCase()){
        case('difficulty'):
            svgFile= '/difficulty.svg'
            break
        case('distance'):
            svgFile= '/distance.svg'
            unit = 'km'
            break
        case('location'):
            svgFile= '/location.svg'
            break
        case('duration'):
            svgFile= '/time.svg'
            unit= 'days'
            break
        case('completed'):
            svgFile= '/check.svg'
            break
    }

    if(stat){
        return (
            <div className={styles.statComp} id={statType === 'Completed' ? styles.completedStat : ''}>
                <img className={areaCardStyles.icon} src={svgFile} alt={statType}/>
                <span>{stat + (unit? ' ' + unit : '')}</span>
            </div>
        )
    }

    return null
}