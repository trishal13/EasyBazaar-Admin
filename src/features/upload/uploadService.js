import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const uploadImg = async (data) => {
    const response = await axios.post(`${base_url}upload/`, data, config);
    return response.data;
}

// not working
const deleteImg = async (url) => {
    const response = await axios.put(`${base_url}upload/delete-img`, {url: url}, config);
    return response.data;
}

const uploadService = {
    uploadImg,
    deleteImg,
}

export default uploadService;