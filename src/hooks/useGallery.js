import { useState, useEffect } from "react";
import fetchGalleryPhotos from "../api/photos-api";

const useGallery = (queryValue, page) => {
  const [data, setData] = useState({ results: [], total_pages: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (queryValue === "") return;

    const handleSearch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetchGalleryPhotos(queryValue, page);
        setData(fetchedData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [queryValue, page]);

  return {
    gallery: data.results,
    totalPages: data.total_pages,
    isLoading,
    isError,
  };
};

export default useGallery;
