// 高德地图相关api
const WEB_SERVICE_KEY = 'c43611c341a4ea1bec7fe8544532ad57'
const JS_API_KEY = 'c6683c23f2ee5b950866c6f734adbcf1'

// https://lbs.amap.com/

import {request} from './request'

export const getWeather = (city) =>
    request({
        url: 'https://restapi.amap.com//v3/weather/weatherInfo',
        params: {
            city,
            key: WEB_SERVICE_KEY,
        },
    })
        .then((response) => {
            return response?.data?.lives?.[0] || {}
        })
        .then(
            ({
                city,
                humidity,
                humidity_float,
                province,
                reporttime,
                temperature,
                temperature_float,
                weather,
                winddirection,
                windpower,
            } = {}) => {
                return {
                    city,
                    humidity: humidity_float,
                    province,
                    reportTime: reporttime,
                    temperature: temperature_float,
                    weather,
                    windDirection: winddirection,
                    windPower: windpower,
                }
            }
        )

export const getIpLocation = () =>
    request({
        url: 'https://restapi.amap.com//v3/ip',
        params: {
            key: WEB_SERVICE_KEY,
        },
    }).then((response) => {
        const data = response?.data
        console.log(data)
        if (data.status == 0 || data.adcode.length == 0)
            return {
                adcode: 440300,
            }
        return response?.data
    })
