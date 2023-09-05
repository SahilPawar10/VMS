import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { visitorColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AllVisitor } from "../../api/apis";
import { ExportToExcel } from "../Export/ExportToExcel";

const Visitor = () => {
  const [data, setData] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const exportData = data.map((visitor) => {
    const { image, ...restOfData } = visitor;
    return restOfData;
  });

  const fileName = "visitorList";

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    AllVisitor()
      .then((res) => {
        let addedId = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].srNo = i + 1;
          addedId.push(res.data[i]);
        }

        setData(addedId);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        // console.log(item);
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => navigate(`/users/${params.row.id}`)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
          />
          <SearchOutlinedIcon />
        </div>
        {/* <div></div> */}

        <div className="link">
          <ExportToExcel apiData={exportData} fileName={fileName} />
        </div>
      </div>

      {searchInput.length > 1 ? (
        <DataGrid
          className="datagrid"
          rows={filteredResults}
          columns={visitorColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      ) : (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={visitorColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      )}
    </div>
  );
};

export default Visitor;
