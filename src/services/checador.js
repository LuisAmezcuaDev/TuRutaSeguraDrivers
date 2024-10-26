import axios from "axios"

const chequeo = 'https://web-production-b035.up.railway.app/journeys/api/journey/'

export const checkStop = async(rfid) => {
    const response = await axios.post(chequeo, {'rfid': rfid});
    return response.data.data
}