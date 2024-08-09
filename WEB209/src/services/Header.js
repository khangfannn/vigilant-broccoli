import axios from "axios";

const API_URL = "http://localhost:3000/";

export const getProductsByCategory = async (categoryName) => {
    try {
      const response = await axios.get(`${API_URL}products/${categoryName}`);
      return response.data;
    } catch (e) {
      console.error('Error fetching products: ', e);
      throw e;
    }
}
export const  getCategories = async () => {
    try{
        const response = await axios.get(`${API_URL}categories`);
        
        return response.data.categories; 

    }catch(e){
        console.error('Error fetching categories: ' , e);
        throw e;
    }
};
export const addCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}categories/add`, categoryData);
  return response.data;
};

export const updateCategory = async (id, updateData) => {
  const response = await axios.put(`${API_URL}categories/edit/${id}`, updateData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}categories/remove/${id}`);
  return response.data;
};