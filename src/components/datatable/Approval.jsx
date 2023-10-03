import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { approvalColumns } from "../../datatablesource";
import Snackbar from "@mui/material/Snackbar";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { forwardRef, useEffect, useState } from "react";
// import { ViewLogs, approveMeet } from "../../api/apis";
import { ExportToExcel } from "../Export/ExportToExcel";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { ViewLogs, approveMeet } from "../../api/visitor/apis";
import { Box, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, setCount } from "../../reducers/auth.reducer";

const Approval = () => {
  const [data, setData] = useState([]);

  // const approvalsCount = useSelector(selectCount);

  const approvalsCount = useSelector((state) => state.auth.approvalsCount);

  const distpatch = useDispatch();
  const fileName = "approvalList";

  const [action, setAction] = useState(false);
  const [viewOne, setViewOne] = useState();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [show, setShow] = useState(false);

  const viewhandleClose = () => setShow(false);
  const viewhandleShow = (id) => {
    setShow(true);
    // viewOne(id)
  };

  // const navigate = useNavigate();

  //.....................SnackBar................................

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    setError("");
  };

  const [error, setError] = useState();
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<...........End................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  //........................................Search Filter...............................................

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

  //........................................Approve or Reject Visits...............................................

  const handleApproval = (id, status) => {
    const formdata = {
      aprooval: status ? status : "rejected",
    };
    // console.log(id, data);
    approveMeet(id, formdata)
      .then((res) => {
        console.log(res.data);
        hideConfirmationModal(false);
        viewLogs();
        // alert("Visit Approved!");
        // handleClick({ vertical: "top", horizontal: "left" });
        // setState({ open: true });
        setError(`Visit ${formdata.aprooval} successfully..!`);
        setState({ vertical: "top", horizontal: "center", open: true });
      })
      .catch((err) => {
        console.log(err);
        viewLogs();
        hideConfirmationModal(false);
      });
  };

  //........................................pendingvisits...............................................

  function viewLogs() {
    setAction(false);
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

        distpatch(setCount(addedId.length));
        // console.log(addedId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  //........................................rejected visits...............................................

  function rejected() {
    setAction(true);
    ViewLogs()
      .then((data) => {
        let temp = data.data.filter((visitor) => {
          return visitor.aprooval === "rejected";
        });
        console.log(temp);
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

  //........................................approved visits...............................................
  function approved() {
    setAction(true);
    ViewLogs()
      .then((data) => {
        let temp = data.data.filter((visitor) => {
          return visitor.aprooval === "approved";
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

  const viewVisit = (id) => {
    data.filter((item) => {
      if (item.id == id) {
        setViewOne(item);
      }
    });
    console.log(viewOne);
    // hideConfirmationModal();
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to reject this meet?`);

    setDisplayConfirmationModal(true);
  };

  console.log(approvalsCount, "reduxState");

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return action ? (
          <div className="cellAction">
            <div
              className="viewButton_approvel"
              onClick={() => {
                viewhandleShow();
                viewVisit(params.row.id);
              }}
            >
              view
            </div>
            {/* <div
              className="deleteButton"
              onClick={() => showDeleteModal(params.row.id)}
            >
              Delete
            </div> */}
          </div>
        ) : (
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
        <div className="d-flex gap-4">
          <u> Approvals</u>
        </div>

        {/* <Link>
          <ExportToExcel apiData={data} fileName={fileName} />
        </Link> */}
        {/* <button onClick={viewhandleShow}>Demo</button> */}

        <div className="d-flex">
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
            />
            <SearchOutlinedIcon />
          </div>
          <ExportToExcel apiData={data} fileName={fileName} button={"Export"} />
        </div>
      </div>
      <div className="approval_status mb-2" style={{ cursor: "pointer" }}>
        <span
          // className="approve_act"
          style={{ color: "green" }}
          onClick={approved}
        >
          Approved /
        </span>
        <span style={{ color: "red" }} onClick={rejected}>
          Rejected /
        </span>
        <span style={{ color: "goldenrod" }} onClick={viewLogs}>
          Pending
        </span>
      </div>
      {searchInput.length > 1 ? (
        <DataGrid
          className="datagrid"
          rows={filteredResults}
          columns={approvalColumns.concat(actionColumn)}
          // coloumns ={}
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

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        // message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      {/* //........................................View One modal............................................... */}

      <Modal show={show} onHide={viewhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Visit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="name"
                defaultValue={viewOne?.visitor?.name}
                placeholder="Name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Number</Form.Label>

              <Form.Control
                type="email"
                placeholder="Email address"
                autoFocus
                defaultValue={viewOne?.visitor?.number}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Purpose</Form.Label>

              <Form.Control
                type="text"
                // placeholder="hostName"
                value={viewOne?.purpose}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Host Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={viewOne?.hostName}
                placeholder="Roll"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="text"
                defaultValue={viewOne?.appointDate}
                placeholder="Roll"
                autoFocus
              />
            </Form.Group>
            <div className="d-grid gap">
              {/* <Button variant="primary" size="sm" onClick={handleClose}>
                Done
              </Button> */}
              <button
                className="btn btn-primary link"
                onClick={viewhandleClose}
              >
                {/* <TelegramIcon fontSize="small" /> */}
                &nbsp;Done
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Approval;
