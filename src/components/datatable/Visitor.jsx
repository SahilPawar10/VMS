import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { visitorColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { AllVisitor } from "../../api/visitor/apis";
import MuiAlert from "@mui/material/Alert";
import { ExportToExcel } from "../Export/ExportToExcel";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { AllVisitor, deleteVisitor } from "../../api/visitor/apis";
import { selectProfile } from "./../../reducers/auth.reducer";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Visitor = () => {
  const [data, setData] = useState([]);

  const user = useSelector(selectProfile);

  // if (user) {
  //   console.log("paresed user from state", user);
  // }

  console.log("paresed user from state", user);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

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
        getVisitor();
        setState({ vertical: "top", horizontal: "center", open: true });
      })
      .catch((err) => console.log(err));

    console.log("handleDelete");

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
        {/* <div></div> */}
        <u>Visitor</u>
        <div className="d-flex">
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
            />
            <SearchOutlinedIcon />
          </div>
          <ExportToExcel
            apiData={exportData}
            fileName={fileName}
            button={"Export"}
          />
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

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        // message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Record Deleted Succesfully ...!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Visitor;
