import React from 'react';

const DownloadCSV = ({ csvData }) => {
    const handleDownload = () => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mcq.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return <button onClick={handleDownload}>Download CSV</button>;

};

export default DownloadCSV;
