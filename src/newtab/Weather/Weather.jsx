import { getIpLocation, getWeather } from '@/api/amap'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const Weather = ({ className }) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        getIpLocation().then(({ province, city, adcode }) => {
            getWeather(adcode).then((weather) => {
                setWeather(weather)
            })
        })
    }, [])
    return (
        <div className={cn('grid grid-cols-2 gap-x-2', className)}>
            <span>{weather.city}</span>
            <span>{weather.weather}</span>

            <span>温度</span>
            <span>{weather.temperature}℃</span>

            <span>湿度</span>
            <span>{weather.humidity}%</span>

            <span>风力</span>
            <span>{weather.windPower}</span>

            <span>风向</span>
            <span>{weather.windDirection}</span>
            {/* <p className="text-xs">更新时间 {weather.reportTime}</p> */}
        </div>
    )
}

export default Weather
