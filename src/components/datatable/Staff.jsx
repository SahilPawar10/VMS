import "./datatable.scss";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { staffColumns } from "../../datatablesource";

import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TelegramIcon from "@mui/icons-material/Telegram";

// import Button from "@mui/material/Button";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import Modal from "react-bootstrap/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Modal from "@mui/material/Modal";
// import { AddGateman, importStaff, Staff as staff } from "../../api/apis";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  AddGateman,
  deleteStaff,
  importStaff,
  Staff as staff,
} from "../../api/staff/staff.api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Staff = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState({});
  const [formData, setFormData] = useState();
  const [error, setError] = useState();
  const [snackopen, setSnackOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const [validEmail, setValidEmail] = useState({
    status: false,
    class: "",
    message: "",
  });

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  // const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    handleSelect(id);
    setShow(true);
  };

  const isValid = () => {
    setValidEmail({ status: false });
    setMobileError(false);
  };
  // // Addnew
  const [Addshow, setAddShow] = useState(false);
  //pending

  const [pendingModel, setPendingModel] = useState(false);

  const AddPendingClose = () => {
    setPendingModel(false);
  };
  const AddPendingOpen = () => {
    setPendingModel(true);
  };

  const AddhandleClose = () => {
    setAddShow(false);
    isValid();
  };

  const AddnewhandleShow = () => {
    setAddShow(true);
    setError("");
  };

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    console.log("handleDelete");
    deleteStaff(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSnackOpen(true);
      });

    hideConfirmationModal();
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to delete the record?`);

    setDisplayConfirmationModal(true);
  };

  const handleSelect = (id) => {
    console.log(data.find((user) => user.id === id));
    setView(data.find((user) => user.id === id));
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  //snackClose
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  useEffect(() => {
    if (selectedFile) {
      // alert("selected file present");

      const formData = new FormData();

      formData.append("file", selectedFile);

      AddPendingOpen();

      console.log(selectedFile);
      importStaff(formData)
        .then((res) => {
          console.log(res.data);
          getData();
          AddPendingClose();
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
          setSnackOpen(true);
          AddPendingClose();
        });
    }
    setSelectedFile(null);
  }, [selectedFile]);

  // const valid = validEmail.status ? <p className={validEmail.status}></p> : <p>not valid</p>;

  const OnChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailRegex.test(value)) {
        setValidEmail({
          status: false,
        });
      } else {
        setValidEmail({
          status: true,
          class: "text-danger",
          message: "Enter Valid Email",
        });
      }
    }
    if (name === "mobileno") {
      if (value.length > 10) {
        console.log("less than 5 characters required");
        setMobileError(true);
      } else {
        setMobileError(false);
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Add GateMan

  function addNew() {
    AddPendingOpen();
    AddGateman(formData)
      .then((res) => {
        console.log(res.data);
        getData();
        AddhandleClose();
        AddPendingClose();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setSnackOpen(true);
        AddPendingClose();
        // setAddShow(false);
      });
  }

  function getData() {
    staff()
      .then((res) => {
        let addedId = [];
        for (let i = 0; i < res.data.staffData.length; i++) {
          res.data.staffData[i].srNo = i + 1;
          res.data.staffData[i].role = res.data.roles[i];
          addedId.push(res.data.staffData[i]);
        }
        setData(addedId);
        // console.log(addedId);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

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
              onClick={() => {
                handleShow(params.id);
              }}
            >
              View
            </div>

            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
              onClick={() => showDeleteModal(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  // return (
  //   <div className="datatable">
  //     <div className="datatableTitle">
  //       <Link to="/users/new" className="link">
  //         Add New
  //       </Link>
  //       {/* Add New User */}
  //       <Link to="/users/new" className="link">
  //         Import
  //         {/* <Link to="/users/new" className="link">
  //           Export
  //         </Link> */}
  //       </Link>
  //     </div>
  //     <DataGrid
  //       className="datagrid"
  //       rows={data}
  //       columns={staffColumns.concat(actionColumn)}
  //       pageSize={9}
  //       rowsPerPageOptions={[9]}
  //       // checkboxSelection
  //     />
  //   </div>
  // );
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <button className="btn btn-primary link" onClick={AddnewhandleShow}>
          <AddCircleIcon fontSize="small" />
          &nbsp;add new
        </button>

        <div>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          {/* <label htmlFor="fileInput" className="link">
            <CloudDownloadIcon fontSize="small" /> &nbsp;Import
          </label> */}

          <button className="btn btn-primary link">
            {/* <AddCircleIcon fontSize="small" />
            &nbsp;add new */}
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <CloudDownloadIcon fontSize="small" /> &nbsp;Import
            </label>
          </button>
          <Snackbar
            open={snackopen}
            autoHideDuration={4000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={staffColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
      <Modal show={Addshow} onHide={AddhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="name"
              placeholder="First Name"
              className="input1"
              name="firstName"
              minLength={3}
              onChange={OnChange}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Last Name"
              className="input1"
              name="lastName"
              minlength={3}
              maxlength={15}
              size="15"
              onChange={OnChange}
              autoFocus
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              placeholder="Email Id"
              className="input1"
              name="email"
              onChange={OnChange}
              autoFocus
            />
            {validEmail.status ? (
              <span className={validEmail.class}>{validEmail.message}</span>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="Mobile"
              className="input1"
              name="mobileno"
              onChange={OnChange}
              autoFocus
            />
            {mobileError ? (
              <span className="text-danger">Invalid mobile no.</span>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="d-grid gap-3">
            {/* <Button variant="primary" size="sm" onClick={addNew}>
                Submit
              </Button> */}
            <button className="btn btn-primary link" onClick={addNew}>
              <TelegramIcon fontSize="small" />
              &nbsp;add new
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={pendingModel}>
        <Modal.Body> Loading...</Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Staff detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="name"
                defaultValue={view.firstName + " " + view.lastName}
                placeholder="Name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email address</Form.Label> */}

              <Form.Control
                type="email"
                placeholder="Email address"
                autoFocus
                defaultValue={view.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Number</Form.Label> */}

              <Form.Control
                type="number"
                placeholder="Number"
                defaultValue={view.mobileno}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                defaultValue={view.role}
                placeholder="Roll"
                autoFocus
              />
            </Form.Group>
            <div className="d-grid gap">
              {/* <Button variant="primary" size="sm" onClick={handleClose}>
                Done
              </Button> */}
              <button className="btn btn-primary link" onClick={handleClose}>
                <TelegramIcon fontSize="small" />
                &nbsp;Done
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
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

export default Staff;
