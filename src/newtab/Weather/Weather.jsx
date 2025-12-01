import { getIpLocation, getWeather } from '@/api/amap'
import { useEffect, useState } from 'react'

const Weather = ({ className }) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        getIpLocation()
            .then((response) => {
                // console.log(response)
                return response.data
            })
            .then(({ province, city, adcode }) => {
                getWeather(adcode).then((weather) => {
                    setWeather(weather)
                })
            })
    }, [])
    return (
        <ul className={className}>
            <li>{weather.city} {weather.weather}</li>
            <li>温度 {weather.temperature} ℃</li>
            <li>湿度 {weather.humidity} %</li>
            <li>风力 {weather.windPower}</li>
            <li>风向 {weather.windDirection}</li>
            <li>更新时间 {weather.reportTime}</li>
        </ul>
    )
}

export default Weather
