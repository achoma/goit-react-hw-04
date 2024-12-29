import { useState, useEffect, useRef, useMemo } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import useGallery from "./hooks/useGallery";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [page, setPage] = useState(1);
  const [queryValue, setQueryValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");
  const [errorDetails, setErrorDetails] = useState(null);
  const [gallery, setGallery] = useState([]);

  const ref = useRef();

  const {
    gallery: fetchedGallery,
    isLoading,
    isError,
    totalPages,
  } = useGallery(queryValue, page);

  useEffect(() => {
    if (isError) {
      setErrorDetails("Something went wrong. Please try again later.");
    }
  }, [isError]);

  useEffect(() => {
    if (page === 1) {
      setGallery(fetchedGallery);
    } else {
      setGallery((prevGallery) => [...prevGallery, ...fetchedGallery]);
    }
  }, [fetchedGallery, page]);

  useEffect(() => {
    if (page === 1) return;

    ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [page, gallery]);

  const handleQuery = (newQuery) => {
    setQueryValue(newQuery);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const isActive = useMemo(() => page === totalPages, [page, totalPages]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateModalStateData = (src, alt) => {
    setModalImage(src);
    setAltDescription(alt);
  };

  return (
    <div ref={ref}>
      <SearchBar onSubmit={handleQuery} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          openModal={openModal}
          updateModalStateData={updateModalStateData}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage errorDetails={errorDetails} />}
      {gallery.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={isActive} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage}
        alt={altDescription}
      />
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default App;
