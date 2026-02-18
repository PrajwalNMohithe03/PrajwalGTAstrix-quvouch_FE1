import { api } from "../../utils/api";
import { API_PATHS } from  "../../constants/apiPaths";


const BUSINESS_API = import.meta.env.VITE_BUSINESS_API;

// ✅ CREATE CLIENT / BUSINESS
export const createBusinessApi = async (payload) => {
 const res = await api.post(API_PATHS.BUSINESS, payload);
  return res.data;
};

// ✅ GET ALL CLIENTS
export const getBusinessesApi = async () => {
  const res = await api.get(BUSINESS_API);
  return res.data;
};

// ✅ DELETE CLIENT
export const deleteBusinessApi = async (id) => {
  await api.delete(`${BUSINESS_API}/${id}`);
  return id;
};
// ✅ GET BUSINESS BY ID
export const getBusinessByIdApi = async (id) => {
  const res = await api.get(`${API_PATHS.BUSINESS}/${id}`);
  return res.data;
};
