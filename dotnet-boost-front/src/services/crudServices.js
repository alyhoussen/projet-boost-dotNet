import axios from 'axios';

const API_URL = "http://localhost:5054/api/Taches"; // .Net Endpoint de connexion webApi 

export const getAll = async (task) => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        return response.data; // Retourner la réponse si besoin
    } catch (error) {
        console.error("Erreur de connexion :", error);
        throw error;
    }
};
export const getOne = async (task) => {
    try {
        const response = await axios.get(API_URL+`/${task.id}`, task);

        return response.data;
    } catch (error) {
        console.error("Erreur de connexion :", error);
        throw error;
    }
};
export const add = async (task) => {
    try {
        const response = await axios.post(API_URL, task);

        return response.data;
    } catch (error) {
        console.error("Erreur de connexion :", error);
        throw error;
    }
};

export const update = async (task) => {
    try {
        const response = await axios.put(API_URL+`/${task.id}`, task);

        return response.data;
    } catch (error) {
        return null;
    }
};
export const del = async (id) => {
    try {
        const response = await axios.delete(API_URL+`/${id}`);

        return response.data;
    } catch (error) {
        return null;
    }
};