import axios from "axios";
const API_key = '5950e3e0cb2c1979bed0d88c993d8296';
export default axios.create({
    baseURL:'https://api.openweathermap.org',
    params:{
        appid: API_key
    }
})