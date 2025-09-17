import axios from "axios";

const API_KEY = 'wxhw147nui9ofk0nq'
const BASE_URL = 'https://techhk.aoscdn.com/api/tasks/visual/scale'

export const enhancedImageapi = async (file) => {
    try {

        //Uploading the in api
        const taskId = await uploadImage(file);
        console.log("Image uploaded Successfully. Task ID:", taskId);
        //uploaded image fetch
        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("enhanced Image Data:", enhancedImageData);

        return enhancedImageData;

    } catch (error) {
        console.log("error enhancing Image: ", error.message);
    }
    return
}

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);

    const response = await axios.post(BASE_URL, formData, {
        headers: {
            "Content-type": "multipart/form-data",
            "X-API-KEY": API_KEY
        },
    });
    const data = response.data;
    if (!data?.data?.task_id) {
        throw new Error("Failed to upload image! Task ID not found");
    }
    return data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
    const response = await axios.get(`${BASE_URL}/${taskId}`, {
        headers: {
            "X-API-KEY": API_KEY,
        },
    });

    return response.data.data; // The API returns task state + result
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    // Processing
    if (result.state === 2) {
        console.log("Processing...");
        if (retries >= 20) throw new Error("Max retries reached. Please try later.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return PollForEnhancedImage(taskId, retries + 1);
    }

    // Success
    if (result.state === 1 && result.image) {
        console.log("Enhanced Image Ready:", result.image);
        return result.image; // ✅ return URL
    }

    // Failed
    throw new Error("Task failed!");
};
