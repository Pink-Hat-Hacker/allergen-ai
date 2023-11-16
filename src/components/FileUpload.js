// FileUpload.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Text, Strong, Box, AspectRatio } from "@radix-ui/themes";

const FileUpload = ({ onFileUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileUpload(file);

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
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
  );
};

export default FileUpload;
