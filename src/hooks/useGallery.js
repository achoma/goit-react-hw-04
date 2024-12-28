import { useState, useEffect } from "react";
import fetchGalleryPhotos from "../api/photos-api";

const useGallery = (queryValue, page) => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (queryValue === "") return;

    const handleSearch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchGalleryPhotos(queryValue, page);
        if (data.total === 0) return;
        setGallery((prevGallery) => [...prevGallery, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [queryValue, page]);

  return { gallery, isLoading, isError, totalPages };
};

export default useGallery;
