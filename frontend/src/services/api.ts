import axios from "axios"
const API = "http://localhost:5000"

export const uploadResume = async(file : File) =>{
    const formData = new FormData();
    formData.append("resume" , file)

    const response = await axios.post(`${API}/api/match` , formData , {
        headers: {
            "Content-Type" : "multipart/form-data",
        },
    });
    return response.data;
}
