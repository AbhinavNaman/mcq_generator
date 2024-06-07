import React, { useState } from "react";
import { FileInput } from "@mantine/core";
import { Button } from "@mantine/core";
import axios from "axios";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose a file");

  const handleFileChange = (e) => {
    console.log("inside handlefile upload");
    setFile(e.target?.files[0]);
    console.log(file);
    setFileName(e.target?.files[0] ? e.target?.files[0].name : "file");
  };

  const handleFileUpload = async () => {
    console.log("button clicked");
    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      // http://localhost:5000/upload
      const response = await axios.post(
        "http://4.227.155.222:8090/docs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onFileUpload(response.data);
    } else {
      console.log("no file");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>

      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          style={{
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            color: "#333",
            fontWeight: "bold",
            cursor: "pointer",
            // Add more inline styles as needed
          }}
        >
          Choose File
        </label>
        <span style={{ marginLeft: "20px", marginRight: "20px" }}>
          {fileName}
        </span>
      </div>

      <button
        onClick={handleFileUpload}
        style={{
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          color: "#333",
          fontWeight: "bold",
          cursor: "pointer",
          // Add more inline styles as needed
        }}
      >
        Generate MCQs
      </button>
    </div>
  );
};

export default FileUpload;
