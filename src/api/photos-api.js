import axios from "axios";

const ACCESS_KEY = "Uhg0-nRE7tqksG-amz0Y0Iw4K2UPwBHqaNrmYXDFs2s";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
  "Accept-Version": "v1",
};
axios.defaults.params = {
  per_page: 8,
  orientation: "landscape",
};

const fetchGalleryPhotos = async (query, page) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query,
        page,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    if (error.response) {
      console.error("API error:", error.response);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export default fetchGalleryPhotos;
