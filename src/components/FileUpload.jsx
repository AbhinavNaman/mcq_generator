import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose a file");

  const handleFileChange = (e) => {
    setFile(e.target?.files[0]);
    setFileName(e.target?.files[0] ? e.target?.files[0].name : "file");
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Ensure the key matches the server's expectation

      try {
        const response = await axios.post(
          "http://4.227.155.222:8090/generate_mcqs/", // Corrected endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        onFileUpload(response.data);
      } catch (error) {
        console.error("Error uploading file", error);
      }
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
        }}
      >
        Generate MCQs
      </button>
    </div>
  );
};

export default FileUpload;