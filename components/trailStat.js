import styles from './trailstat.module.css'

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
    }

    return (
        <div className={styles.statComp}>
            <img src={svgFile} alt={statType}/>
            <span>{stat + (unit? ' ' + unit: '')}</span>
        </div>
    )
}