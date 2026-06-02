import api from './api'

export const GetSystemCodeDetails = async()=>{
    var results = await api.get('/SystemCodeDetails',{
        withCredentials:true,
         headers: {
        "Content-Type": "application/json"
      }
    })

    return results.data;
}

export const GetSystemCodeDetail=async(id)=>{
    var results = await api.get('/SystemCodeDetails'+id,{
        withCredentials:true,
         headers: {
        "Content-Type": "application/json"
      }
    })

    return results.data;
}

export const CreateSystemCodeDetail = async(data)=>{
    var results = await api.post('/SystemCodeDetails',data,{
        withCredentials:true,
         headers: {
        "Content-Type": "application/json"
      }
    })

    return results.data;
}

export const updateSystemCodeDetail = async(data)=>{
    var results = await api.put('/SystemCodeDetails'+data.Id,{
        withCredentials:true,
         headers: {
        "Content-Type": "application/json"
      }
    })

    return results.data;
}

export const DeleteSystemCodeDetail = async(id)=>{
    var results = await api.delete('/SystemCodeDetails/'+id,{
        withCredentials:true,
         headers: {
        "Content-Type": "application/json"
      }
    })

    return results.data;
}