import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PhotoCard from "./PhotoCard";
import Spinner from "./Spinner";
import "./Gallery.css";

const API_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "raGyAIMxrCxWJyYu4W6iZBpIO_1Vks2a5ujtyLL7hLw"; 

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          page,
          query: "plant",
          client_id: CLIENT_ID,
        },
      });
      setPhotos((prev) => [...prev, ...response.data.results]);
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="gallery">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Gallery;
