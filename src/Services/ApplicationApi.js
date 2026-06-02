import api from "./api";

export const GetApplications = async () => {
  const records = await api.get("/application", {
    withCredentials: true
  });

  console.log( records.data)
  return records.data;
};

export const GetApplication = async (id) => {
  const record = await api.get("/application/" + id, {
    withCredentials: true
  });
  
  return record.data;
};

export const CreateApplication = async (apply) => {
 console.log(apply)
  const record = await api.post("/application", apply, {
    withCredentials: true
  });

  return record.data;
};

export const UpdateApplication = async (application) => {
  const record = await api.put(
    "/application/" + application.Id,
    application,
    {
      withCredentials: true
    }
  );

  return record.data;
};

export const CheckStatus = async (nationalId) => {

  const record = await api.get(
    `/application/checkstatus/${nationalId}`,
    {
      withCredentials: true
    }
  );

  return record.data;
};

export const UpdateLoan = async (id, data) => {
  const response = await api.put(
    `/application/manage/${id}`,
    data
  );

  return response.data;
};

export const CalculateLoan = async(id)=>{
  const record = await api.put(
    `/application/calcpayment/${id}`,
    {
      withCredentials:true
    }
  )

  return record.data;
}