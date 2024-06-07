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
    setMcqs(data.mcqs);
    setCsvData(data.csv);
  };

  return (
    <MantineProvider>
      <div>
        <h1>MCQ Generator</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        <MCQDisplay mcqs={mcqs} />
        {csvData && <DownloadCSV csvData={csvData} />}
      </div>
    </MantineProvider>
  );
}

export default App;
