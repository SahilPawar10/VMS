import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import "../datatable/datatable.scss";
import BackupIcon from "@mui/icons-material/Backup";

export const ExportToExcel = ({ apiData, fileName }) => {
  // console.log(apiData);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    console.log(apiData, "export");

    if (apiData.length === 0) {
      alert("No Data Available");
    } else {
      const ws = XLSX.utils.json_to_sheet(apiData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    }
  };
  return (
    <button
      className="exportlink"
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      <BackupIcon /> &nbsp;Export
    </button>
  );
};
