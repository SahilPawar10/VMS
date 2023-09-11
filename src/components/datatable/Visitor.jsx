import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { visitorColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { AllVisitor } from "../../api/visitor/apis";
import { ExportToExcel } from "../Export/ExportToExcel";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { AllVisitor, deleteVisitor } from "../../api/visitor/apis";

const Visitor = () => {
  const [data, setData] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const exportData = data.map((visitor) => {
    const { image, isDeleted, ...restOfData } = visitor;
    return restOfData;
  });

  const fileName = "visitorList";

  const navigate = useNavigate();

  function getVisitor() {
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
  }

  useEffect(() => {
    getVisitor();
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

  //confirm Delete

  const handleDelete = (id) => {
    deleteVisitor(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    console.log("handleDelete");
    getVisitor();
    hideConfirmationModal();
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to delete the record?`);

    setDisplayConfirmationModal(true);
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
              onClick={() => showDeleteModal(params.row.id)}
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

        <div>
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

      <ConfirmDelete
        showModal={displayConfirmationModal}
        hideModal={hideConfirmationModal}
        confirmDelete={handleDelete}
        id={id}
        message={deleteMessage}
      />
    </div>
  );
};

export default Visitor;
