import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Image = ({ image }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [costodian, setCostodian] = useState();
  const [isShow, setIsShow] = useState(false);
  const [percent, setPercent] = useState(0);

  const handleChange = (event) => {
    const name = event.target.value;
    setCostodian(name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const timer = setInterval(() => {
      setPercent((oldProgress) => {
        if (image.size == oldProgress) {
          return costodian?.length && setIsShow(true);
        }
        return Math.min(oldProgress + Math.random() * 10, image.size);
      });
    }, 499);

    return () => {
      clearInterval(timer);
    };
  };
  return (
    <div className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
      {!isShow ? (
        isLoading ? (
          <ProgressBar
            animated
            now={100}
            label={`${Math.ceil(percent)} KB / ${Math.ceil(image.size)} KB`}
          />
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Enter costodian :
                <input type="text" onChange={handleChange} required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </>
        )
      ) : (
        <>
          <GiCheckMark size="22px" color="#058cff" />
          <AiOutlineClose size="26px" color="red" />
        </>
      )}
    </div>
  );
};
const ImageList = ({ images }) => {
  const renderImage = (image) => {
    console.log(415, image);
    return (
      <>
        {image?.map((image, i) => {
          return <Image image={image} key={`${image.id}-image`} />;
        })}
      </>
    );
  };

  return (
    <>
      {images?.length ? (
        <section className="file-list">{renderImage(images)}</section>
      ) : (
        <section className="file-list">No files</section>
      )}
    </>
  );
};

export default ImageList;
