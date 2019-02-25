import axios from 'axios'
import config from './config/config'

axios.defaults.baseURL = config.apiURL

//export default axios

/*export default axios.create({
    baseURL: config.apiURL
})*/

const instance = axios.create({})

instance.defaults.baseURL= config.apiURL

export default instance