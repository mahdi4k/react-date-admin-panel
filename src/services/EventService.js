import axios from "axios";
const apiClient =axios.create({
    baseURL : `https://encounter.generalrouter.ir`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
export default apiClient
