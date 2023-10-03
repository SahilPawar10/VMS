import React from "react";
import { useEffect, useState } from "react";
import "../ContactUS/Contact.scss";
import { connectDeveloper } from "../../api/visitor/apis";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import thanku from "../../assets/thanku.png";

const Contactus = () => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [subjects, setSubject] = useState();
  const [message, setMessage] = useState();

  const onNameChanged = (e) => setName(e.target.value);
  const onNumberChanged = (e) => setNumber(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onSubjectsChanged = (e) => setSubject(e.target.value);
  const onMessageChanged = (e) => setMessage(e.target.value);

  const navigate = useNavigate();

  // // Addnew
  const [Addshow, setAddShow] = useState(false);
  const AddhandleClose = () => {
    navigate("/");
    setAddShow(false);
  };

  const AddnewhandleShow = () => {
    setAddShow(true);
  };

  const canSave =
    Boolean(name) &&
    Boolean(email) &&
    Boolean(number) &&
    Boolean(subjects) &&
    Boolean(message);

  // const OnChange = (e) => {
  //   console.log(typeof formData);
  //   e.preventDefault();

  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));

  //   if (!setFormData) {
  //     setPreSave(false);
  //   } else {
  //     setPreSave(true);
  //   }
  //   console.log(formData);
  // };

  function addNew() {
    const formData = {
      name: name,
      email: email,
      mobile: number,
      subject: subjects,
      message: message,
    };
    connectDeveloper(formData)
      .then((res) => {
        console.log(res.data);
        setAddShow(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setAddShow(false);
      });
  }
  return (
    <>
      <div class="form-container mt-3 align-items-center">
        <div class="container">
          <div class="form-card">
            <div class="row covero">
              <div class="col-md-5 addresscol">
                <div class="address-cover">
                  <h2>Connect With Developer</h2>
                  <p>Sahil Shankar Pawar</p>

                  <address>
                    Tower 1A 701 Kalpataru Aura Lal Bahadur Shastri Marg,
                    Ghatkopar West, Kurla, MH-400086, India
                  </address>
                  <ul>
                    <li>
                      <i class="fa fa-mobile-alt"></i> +91 9764804327
                    </li>
                    <li>
                      <i class="fa fa-envelope"></i> sahil.pawar@cloudstrats.com
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-7 formcol">
                <div class="form-cover">
                  <div class="form-row row">
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      required=""
                      class="form-control"
                      name="name"
                      onChange={onNameChanged}
                    />
                  </div>
                  <div class="form-row row">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      class="form-control"
                      name="mobile"
                      onChange={onNumberChanged}
                    />
                  </div>
                  <div class="form-row row">
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      required=""
                      class="form-control"
                      name="email"
                      onChange={onEmailChanged}
                    />
                  </div>
                  <div class="form-row row">
                    <input
                      type="text"
                      placeholder="Enter Subject"
                      class="form-control"
                      name="subject"
                      onChange={onSubjectsChanged}
                    />
                  </div>
                  <div class="form-row row">
                    <textarea
                      placeholder="Enter Your Message"
                      required=""
                      rows="4"
                      class="form-control"
                      name="message"
                      onChange={onMessageChanged}
                    ></textarea>
                  </div>
                  <div class="form-row row mb-0">
                    <button
                      class="btn btn-primary"
                      onClick={addNew}
                      disabled={!canSave}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={Addshow} onHide={AddhandleClose}>
        
      </Modal> */}

      <Modal
        className="modal-dialog-centered modals_d"
        show={Addshow}
        onHide={AddhandleClose}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Add New</Modal.Title> */}
        </Modal.Header>

        <Modal.Body>
          <img
            src={thanku}
            style={{ width: "270px", height: "250px" }}
            alt=""
          />
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary">Edit</Button> */}

          <Button variant="primary" onClick={AddhandleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contactus;
