import api from './api'

export const GetAudits=async()=>
{
    var records = await api.get("/audits",{
        withCredentials:true
    })
   
    return records.data
}