import React, { useCallback, useState } from "react";
import Dropzone from "./components/Common/Dropzone";
import ImageList from "./components/Common/ImageList";
import { createId } from "@paralleldrive/cuid2";

export default function App() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: createId(), src: e.target.result, size: file.size / 1024 },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <ImageList images={images} />
    </main>
  );
}
