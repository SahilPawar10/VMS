import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { approvalColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
// import { ViewLogs, approveMeet } from "../../api/apis";
import { ExportToExcel } from "../Export/ExportToExcel";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { ViewLogs, approveMeet } from "../../api/visitor/apis";

const Approval = () => {
  const [data, setData] = useState([]);
  const fileName = "approvalList";

  const navigate = useNavigate();

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        console.log(Object.values(item.visitor, item.visitor));
        return Object.values(item.visitor, item.visitor)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  const handleApproval = (id, status) => {
    const formdata = {
      aprooval: status ? status : "rejected",
    };
    // console.log(id, data);
    approveMeet(id, formdata)
      .then((res) => {
        console.log(res.data);
        viewLogs();
        // alert("Visit Approved!");
      })
      .catch((err) => console.log(err));

    hideConfirmationModal(false);
  };

  function viewLogs() {
    ViewLogs()
      .then((data) => {
        let temp = data.data.filter((visitor) => {
          return visitor.aprooval === "pending";
        });
        let addedId = [];
        for (let i = 0; i < temp.length; i++) {
          temp[i].srNo = i + 1;
          // temp[i].aprooval = "pending";
          addedId.push(temp[i]);
        }
        setData(addedId);
        // console.log(addedId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  useEffect(() => {
    viewLogs();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    console.log("handleDelete");
    hideConfirmationModal();
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to reject this meet?`);

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
              onClick={() => handleApproval(params.row.id, "approved")}
            >
              Approve
            </div>
            <div
              className="deleteButton"
              onClick={() => showDeleteModal(params.row.id)}
            >
              Reject
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* Add New User */}
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
          />
          <SearchOutlinedIcon />
        </div>
        {/* <Link>
          <ExportToExcel apiData={data} fileName={fileName} />
        </Link> */}
        <div>
          <ExportToExcel apiData={data} fileName={fileName} />
        </div>
      </div>
      {searchInput.length > 1 ? (
        <DataGrid
          className="datagrid"
          rows={filteredResults}
          columns={approvalColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      ) : (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={approvalColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      )}
      <ConfirmDelete
        showModal={displayConfirmationModal}
        hideModal={hideConfirmationModal}
        confirmDelete={handleApproval}
        id={id}
        message={deleteMessage}
      />
    </div>
  );
};

export default Approval;
