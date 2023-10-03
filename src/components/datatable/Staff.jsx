import "./datatable.scss";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { staffColumns } from "../../datatablesource";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TelegramIcon from "@mui/icons-material/Telegram";
// import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ExportToExcel } from "../Export/ExportToExcel";
import {
  useViewStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useImportStaffMutation,
} from "../../apiservices/staffSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Staff = () => {
  // const staffData = useViewStaffQuery();
  const [apidata, setApiData] = useState([]);
  //..............................RTK QUERY.........................................
  const { data, isLoading, isError, error, refetch } = useViewStaffQuery();

  const [addStaff] = useAddStaffMutation();

  const [deleteStaff] = useDeleteStaffMutation();

  const [importStaff] = useImportStaffMutation();

  // function renderData() {
  //   if (isError) {
  //     console.log(error);
  //   }

  //   if (isLoading) {
  //     console.log("pending................");
  //   }
  //   if (data) {
  //     const addFields = data.staffData.map((staffItem, index) => ({
  //       srNo: index + 1,
  //       role: data.roles[index],
  //       ...staffItem,
  //     }));

  //     console.log(addFields, "renderData");
  //     setApiData(addFields);
  //   }
  // }

  useEffect(() => {
    if (isError) {
      console.log(error);
    }

    if (isLoading) {
      console.log("pending................");
    }
    if (data) {
      const addFields = data.staffData.map((staffItem, index) => ({
        srNo: index + 1,
        role: data.roles[index],
        ...staffItem,
      }));

      console.log(addFields, "renderData");
      setApiData(addFields);
    }
  }, [data, isLoading, isError, error]);

  const [view, setView] = useState({});
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState();
  const [snackopen, setSnackOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

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

  //.....................SnackBar................................

  const { vertical, horizontal, open } = snackopen;

  //snackClose
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen({ ...snackopen, open: false });
    setSeverity("");
    setMessage("");
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id);
    handleSelect(id);
    setShow(true);
  };

  const isValid = () => {
    setValidEmail({ status: false });
    setMobileError(false);
  };
  // // Addnew
  const [Addshow, setAddShow] = useState(false);

  // import Button
  const [uploadshow, setuploadShow] = useState(false);

  const uploadhandleClose = () => {
    setuploadShow(false);
    setSelectedFile(null);
  };
  const uploadhandleShow = () => setuploadShow(true);

  //pending
  const [severity, setSeverity] = useState();
  const [pendingModel, setPendingModel] = useState(false);

  //.....................sampleFile..............................

  const sampleData = [
    {
      firstName: "",
      lastName: "",
      email: "",
      mobileno: "",
      role: "employee or gateman",
    },
  ];

  const sampleFile = "sample";

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
    setMessage("");
  };

  //...................................Delete Data from UI................................
  const handleDelete = async (id) => {
    // setData(data.filter((item) => item.id !== id));
    const { error, data } = await deleteStaff(id);
    if (error) {
      // console.log(error);
      setMessage(error.data.message);
      setSeverity("error");
      setSnackOpen({ vertical: "top", horizontal: "center", open: true });
      hideConfirmationModal();
    }
    if (data) {
      refetch();
      console.log(data);
      setSeverity("success");
      setMessage("Record deleted successfully");
      setSnackOpen({ vertical: "top", horizontal: "center", open: true });
      hideConfirmationModal();
    }
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to delete the record?`);

    setDisplayConfirmationModal(true);
  };

  const handleSelect = (id) => {
    console.log(apidata.find((user) => user.id === id));
    setView(apidata.find((user) => user.id === id));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  //...................................Import File................................
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // const name = event.target.name;
    setSelectedFile(file);
  };

  //................................upload file.................................
  async function handleUpload() {
    if (!selectedFile) {
      // alert("selected file present");

      alert("Select File First");

      return;
    }
    const formData = new FormData();

    formData.append("file", selectedFile);

    // AddPendingOpen();

    const { error, data } = await importStaff(formData);
    if (error) {
      console.log(error);
      setMessage(error.data.message);
      setSeverity("error");
      // setSnackOpen(true);
      uploadhandleClose();
      setSnackOpen({ vertical: "top", horizontal: "center", open: true });
      // AddPendingClose();
    } else if (data) {
      console.log(data, " :data");
      // AddPendingClose();
      setSeverity("success");
      // setSnackOpen(true);
      setMessage(data.message);
      uploadhandleClose();
      setSnackOpen({ vertical: "top", horizontal: "center", open: true });
      refetch();
    }
    // setSelectedFile(null);
  }

  // const valid = validEmail.status ? <p className={validEmail.status}></p> : <p>not valid</p>;

  const OnChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    console.log(name, value);

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
      if (value.length > 10 || value.length < 10) {
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

  //...................................Add GateMan.................................

  async function addNew() {
    AddPendingOpen();
    const { error, data } = await addStaff(formData);
    if (error) {
      console.log(error.response.data.message);
      AddPendingClose();
      setMessage(error.response.data.message);
      setSnackOpen({ vertical: "top", horizontal: "center", open: true });
    }
    if (data) {
      refetch();
      AddPendingClose();
      AddhandleClose();
      AddPendingClose();
      setMessage("Reocrd Added Successfully..!");
      setSnackOpen({ vertical: "top", horizontal: "center", open: true });
    }
  }

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
              onClick={() => showDeleteModal(params.id)}
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
        <div>
          <u>Staff</u>
        </div>

        <div>
          <button className="btn btn-primary link" onClick={AddnewhandleShow}>
            <AddCircleIcon fontSize="small" />
            &nbsp;Add new
          </button>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <button className="btn btn-primary link" onClick={uploadhandleShow}>
            Bulk Upload
          </button>
          {/* ......................................ImportFile Model.................................... */}
          <Modal
            show={uploadshow}
            onHide={uploadhandleClose}
            dialogClassName="modal-lg"
          >
            <Modal.Header closeButton>
              <b>
                <h5>Instructions for Bulk user Upload</h5>
              </b>
            </Modal.Header>
            <Modal.Body>
              <p>
                Our system will process the file and import the users
                automatically contac tour support team for assistance if needed
              </p>
              <ul>
                <li>
                  1. Download the Excel template and fill data without changing
                  headers.
                </li>
                <li>2. Save the filled-in Excel file.</li>
                <li>3. Upload the saved Excel file Below.</li>
                <li>4. Initate the upload process to add bulk users.</li>
              </ul>
              <b>Thank you for choosing our services !</b> <br />
              <small>
                Please note that valid email Id and mobile number should be
                written
              </small>
            </Modal.Body>
            <Modal.Footer>
              <div className="col-12 text-center d-grid">
                <button className="btn btn-primary link  Excel-upload">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                  {selectedFile ? (
                    <label htmlFor="fileInput">{selectedFile["name"]}</label>
                  ) : (
                    <label htmlFor="fileInput">
                      <CloudDownloadIcon fontSize="small" /> &nbsp;Select an
                      Excel file:
                    </label>
                  )}
                </button>
              </div>
              <div className=" d-flex col-12 gap-2">
                <div className="col-6 d-grid abz ">
                  {/* <Button variant="secondary">Download</Button>
                   */}
                  <ExportToExcel
                    fileName={sampleFile}
                    apiData={sampleData}
                    button={"Download Template"}
                  />
                </div>
                <div className="col-6 d-grid">
                  <Button variant="primary" onClick={handleUpload}>
                    {" "}
                    Upload
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      {/* ......................................Data Table.................................... */}
      <DataGrid
        className="datagrid"
        rows={apidata}
        columns={staffColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />

      {/* ......................................Add New Model................................... */}
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
              minLength={3}
              maxLength={15}
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
              <span className="text-danger">Enter Numbers upto 10.</span>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={OnChange}
              name="role"
            >
              <option selected>Click to select role</option>
              <option value="gateman">Gateman</option>
              <option value="employee">Employee</option>
            </select>
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

      {/* ......................................Pending Api Model.................................... */}
      <Modal show={pendingModel}>
        <Modal.Body> Loading...</Modal.Body>
      </Modal>

      {/* ......................................View Staff Model.................................... */}
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

      {/* ......................................Confirm Model.................................... */}
      <ConfirmDelete
        showModal={displayConfirmationModal}
        hideModal={hideConfirmationModal}
        confirmDelete={handleDelete}
        id={id}
        message={deleteMessage}
      />
      <div>
        {/* ......................................SnackBar.................................... */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={1000}
          onClose={handleSnackClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleSnackClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Staff;
