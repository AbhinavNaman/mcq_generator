import { useState } from "react";
import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { DropzoneButton } from "./components/DropzoneButton/DropzoneButton";

import FileUpload from "./components/FileUpload";
import MCQDisplay from "./components/MCQDisplay";
import DownloadCSV from "./components/DownloadCSV";

function App() {
  const [mcqs, setMcqs] = useState([]);
  const [csvData, setCsvData] = useState("");

  const handleFileUpload = (data) => {
    console.log("-->", data);
    setMcqs(data);
    setCsvData(convertToCSV(data));
  };

  const convertToCSV = (mcqs) => {
    const headers = ["mcq", "options", "correct", "Bloom's Taxonomy"];
    const mcqsArray = Object.values(mcqs);

    const rows = mcqsArray.map((item) => [
      item.mcq,
      Object.values(item.options).join(', '),
      item.correct,
      item["Bloom's Taxonomy"],
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mcqs.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MantineProvider>
      <div>
        <h1>MCQ Generator</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        <MCQDisplay mcqs={mcqs} />
        {csvData && (
          <button onClick={handleDownloadCSV}>Download CSV</button>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
