import axios from 'axios'

const api=axios.create({
    baseURL:"https://grivence-back.up.railway.app/" || "http://localhost:8000"
}
)

export const postData=(data)=>{
    return api.post("/grivence/",data,{
        headers: {
            'Content-Type': 'application/json' 
        }
    })
}

export const postUserData=(data)=>{
    return api.post("/user/",data,{
        headers: {
            'Content-Type': 'application/json' 
        }
    })
}

export const postLoginData=(data)=>{
    return api.post("/login",data,{
        headers: {
            'Content-Type': 'application/json' 
        }
    })
}

export const getGrivenceData=(id)=>{
    return api.get(`/grivence/${id}`)
}

export const postfeedbackData=(data)=>{
    return api.post("/feedback",data,{
        headers: {
            'Content-Type': 'application/json' 
        }
    })
}