import api from './api'

export const GetSystemCodes = async()=>{
    var results = await api.get('/SystemCode',{
        withCredentials:true
    })
    console.log(results.data);
    return results.data;
}

export const GetSystemCode=async(id)=>{
    var results = await api.get('/systemCode/'+id,{
        withCredentials:true
    })

    return results.data;
}

export const CreateSystemCode = async(data)=>{
  
    var results = await api.post('/systemcode',data,{
        withCredentials:true,
         headers: {
        "Content-Type": "application/json"
      }
    })

    return results.data;
}

export const updateSystemCode = async(data)=>{
    var results = await api.put(
        '/systemCode/' + data.Id,
        data,
        {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        }
    )

    return results.data;
}

export const DeleteSystemCode = async(id)=>{
    var results = await api.delete('/systemCode/'+id,{
        withCredentials:true
    })

    return results.data;
}