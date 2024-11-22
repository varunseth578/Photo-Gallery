import React from "react";
import "./PhotoCard.css";

const PhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img src={photo.urls.small} alt={photo.alt_description} />
      <p className="caption">Photo by {photo.user.name}</p>
    </div>
  );
};

export default PhotoCard;
