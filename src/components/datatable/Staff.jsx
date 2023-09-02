import "./datatable.scss";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { staffColumns } from "../../datatablesource";

import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// import Button from "@mui/material/Button";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { AddGateman, importStaff, Staff as staff } from "../../api/apis";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
};

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
  // const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    handleSelect(id);
    setShow(true);
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
  };

  const AddnewhandleShow = () => {
    setAddShow(true);
    setError("");
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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

  const OnChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  };

  //Add GateMan

  function addNew() {
    AddPendingOpen();
    AddGateman(formData)
      .then((res) => {
        console.log(res.data);
        getData();
        AddhandleClose();
        AddPendingClose()
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setSnackOpen(true);
        AddPendingClose()
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
        console.log(addedId);
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Staff detail</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="name"
                      defaultValue={view.firstName + " " + view.lastName}
                      placeholder="Name"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    {/* <Form.Label>Email address</Form.Label> */}

                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      autoFocus
                      defaultValue={view.email}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    {/* <Form.Label>Number</Form.Label> */}

                    <Form.Control
                      type="number"
                      placeholder="Number"
                      defaultValue={view.mobileno}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      defaultValue={view.role}
                      placeholder="Roll"
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                {/* <Button variant="secondary">Edit</Button> */}

                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
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
        <button className="link" onClick={AddnewhandleShow}>
          Add New
        </button>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="link">
            Import
          </label>

          <Snackbar
            open={snackopen}
            autoHideDuration={2000}
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
          <Form>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="name"
                placeholder="First Name"
                className="input1"
                name="firstName"
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
                onChange={OnChange}
                autoFocus
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
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {/* {error} */}
          <Button variant="primary" onClick={addNew}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={pendingModel}>
        <Modal.Body> Loading...</Modal.Body>
      </Modal>
    </div>
  );
};

export default Staff;
