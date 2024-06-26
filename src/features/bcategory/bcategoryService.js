import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
}

const createBlogCategory = async (blogcategory) => {
    const response = await axios.post(`${base_url}blogcategory/`, blogcategory, config);
    return response.data;
}

const updateBlogCategory = async (category) => {
    const response = await axios.put(`${base_url}blogcategory/${category.id}`, { title: category.blogCatData.title }, config);
    return response.data;
}

const getBlogCategory = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`, config);
    return response.data;
}

const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return response.data;
}

const bCategoryService = {
    getBlogCategories,
    createBlogCategory,
    getBlogCategory,
    deleteBlogCategory,
    updateBlogCategory,
};

export default bCategoryService;