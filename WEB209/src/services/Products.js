import axios from "axios";

const API_URL = "http://localhost:3000";


export const  getProducts = async () => {
    try{
        const response = await axios.get(`${API_URL}/products`);
        
        return response.data.products;

    }catch(error){
        console.error('Error fetching products: ' , error);
        throw error;
    }
};
export const searchIndexProduct = async (query) => {
    try {  
        const response = await axios.get(`${API_URL}/products/search`, {
            params: { searchI: query }
        });
        return response.data.products;
    } catch (error) {
        console.error('Error searching for products: ', error);
        throw error;
    }
};
export const getDetailedProduct = async (productID) =>{
    try {
        const response = await axios.get(`${API_URL}/products/details/${productID}`);
        return response.data;
    } catch (error) {
        console.error('Error getting detailed product: ' , error);
    }
};
export const getProductbyCategory = async (Category) =>{
    try {
        const response = await axios.get(`${API_URL}/products/${Category}`);
        
        return response.data.products;

    } catch (error) {
        console.error('Error fetch products by category:',error);
        throw error;
    }
};
export const addProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/products/add`, productData);
    return response.data;
  };
  
  export const updateProduct = async (id, updateData) => {
    const response = await axios.put(`${API_URL}/products/edit/${id}`, updateData);
    return response.data;
  };
  
  export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/products/delete/${id}`);
    return response.data;
  };