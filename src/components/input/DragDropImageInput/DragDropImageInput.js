import React, { useEffect, useState, memo } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "formik";

import "./styles.css";
import { FormControl, FormHelperText } from "@mui/material";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const DragDropImageInput = ({ ...props }) => {
  const { maxFiles, images, ...rest } = props;
  const [files, setFiles] = useState(images);
  const [, meta, helpers] = useField(props);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles?.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      let t = []
      acceptedFiles?.forEach((file) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          t.push(reader.result)

        }, false);

        reader.readAsDataURL(file)
      });

      helpers.setValue(t);
    },
    maxFiles: maxFiles,
  });

  const thumbs = files?.map((file, index) => (
    <div style={thumb} key={file.name || index}>
      <div style={thumbInner}>
        <img
          alt="preview"
          src={file?.preview || file}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="drag-drop-image">
      <FormControl error={Boolean(meta.touched && meta.error)} fullWidth>
        <div {...getRootProps({ className: "dropzone" })}>
          <input
            {...getInputProps()}
            {...rest}
            onChange={(val) => {
              setFiles(
                val?.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                )
              );
            }}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>
            {`(${maxFiles} file${maxFiles > 1 ? "s" : ""
              } are the maximum number of files you can drop here)`}
          </em>
        </div>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default memo(DragDropImageInput);
