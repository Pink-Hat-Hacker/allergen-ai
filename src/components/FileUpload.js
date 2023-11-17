// FileUpload.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Text, Strong, Box, AspectRatio, Button } from "@radix-ui/themes";
import "../App.css";

const FileUpload = ({ onFileUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(acceptedFiles[0]);

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );
  
  const handleFileUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
      <Box
        {...getRootProps()}
        width="100%"
        height="100%"
        className="aa-file-upload box"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <input
          {...getInputProps({
            accept: "image/jpeg, image/png, image/jpg, image/heic",
          })}
        />
        <Text size="6" color="iris" weight="light">
          drag & drop your image here, or <Strong>click</Strong> to select files
        </Text>
        {previewImage && (
          <AspectRatio ratio={16 / 8}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                objectFit: "cover",
                width: "90%",
                height: "90%",
                borderRadius: "var(--radius-2)",
              }}
            />
          </AspectRatio>
        )}
      </Box>
      <Button className="aa-file-upload bt" size="4" variant="solid" onClick={handleFileUpload}>
        execute
      </Button>
      </>
  );
};

export default FileUpload;
