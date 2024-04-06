// services/product.service.ts (ตั้งชื่อไฟล์ตามต้องการ)
"use client";
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // แก้ตาม URL ของ API จริงของคุณ
const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;


const ProductService = {
  createProduct: async (userData: {
    name: string;
    price: string;
    description: string;
    createdAt?: string | Date;
    createdBy: string;
    active: boolean;
}) => {
    try {
      const response = await axios.post(`${API_URL}/products`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
    }
  },

  getProductById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/${'products'}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting product:', error);
    }
  },

  getAllProducts: async () => {
    try {
      console.log(token,'xx')
      const response = await axios.get(`${API_URL}/${'products'}`);
      return response.data;
    } catch (error) {
      console.error('Error getting all products:', error);
    }
  },

  updateProduct: async (id: string, userData: {
    name: string;
    price: string;
    description: string;
    createdAt?: string | Date;
    createdBy: string;
}) => {
    try {
      const response = await axios.put(`${API_URL}/${'products'}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/${'products'}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
};

export default ProductService;
