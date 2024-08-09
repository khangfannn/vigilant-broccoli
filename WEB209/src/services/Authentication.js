import axios from "axios";

const API_URL = 'http://localhost:3000';
export const login = async (body) =>{
    try {
        const response = await axios.post(`${API_URL}/login`,body);
            return response;
    } catch (error) {
        console.error(error);
        throw error;
    }

} 
