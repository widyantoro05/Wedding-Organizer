import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import ReactTable from "react-table";
import { faListUl, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MySwal = withReactContent(Swal);

class ModalAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idAssignment: "",
      idStaff: "",
      idUser: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  initialInput = {
    idAssignment: "",
    idStaff: "",
    idUser: "",
  };

  submitForm = (event) => {
    event.preventDefault();
    const assignment = {
      idAssignment: this.state.idAssignment,
      idStaff: this.state.idStaff,
      idUser: this.state.idUser,
    };
    this.props.savedata(assignment);
    this.resetForm();
  };

  resetForm = () => {
    this.setState(() => this.initialInput);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.props.toggle}>
        &times;
      </button>
    );
    const { idAssignment, idStaff, idUser } = this.state;

    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          newuser={this.props.newuser}
          reststaff={this.props.reststaff}
        >
          <ModalHeader toggle={this.props.toggle} close={closeBtn}>
            Add New Assignment
          </ModalHeader>
          <Form onReset={this.resetForm} onSubmit={this.submitForm}>
            <ModalBody>
              <Input
                name="idAssignment"
                id="idAssignment"
                value={idAssignment}
                onChange={this.handleChange}
                hidden
              />
              <FormGroup>
                <Label for="idStaff">ID Staff</Label>
                <Input
                  type="number"
                  name="idStaff"
                  id="idStaff"
                  placeholder="ID Staff"
                  autoComplete="off"
                  value={idStaff}
                  onChange={this.handleChange}
                />
                <ReactTable
                  data={this.props.reststaff}
                  columns={[
                    {
                      columns: [
                        {
                          Header: "ID",
                          accessor: "idStaff",
                          Cell: (row) => (
                            <div className="d-block w-100 text-center">
                              {row.value}
                            </div>
                          ),
                        },
                        {
                          Header: "Job",
                          accessor: "job",
                        },
                        {
                          Header: "Recent Schedule",
                          accessor: "staffSchedule",
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          Header: "Actions",
                          accessor: "actions",
                          sortable: false,
                          Cell: (row) => (
                            <div className="d-block w-100 text-center">
                              <Button
                                className="btn-pill btn-sm mr-3"
                                color="success"
                                id="Tooltip-123"
                                onClick={() =>
                                  this.setState(
                                    {
                                      idStaff: row.original.idStaff,
                                    },
                                    () => {
                                      console.log(
                                        "clicked",
                                        this.state.idStaff
                                      );
                                    }
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </Button>
                            </div>
                          ),
                        },
                      ],
                    },
                  ]}
                  defaultPageSize={5}
                  className="-striped -highlight"
                />
              </FormGroup>
              <FormGroup>
                <Label for="idUser">ID User</Label>
                <Input
                  type="number"
                  name="idUser"
                  id="idUser"
                  placeholder="ID User"
                  autoComplete="off"
                  value={idUser}
                  onChange={this.handleChange}
                />
                <ReactTable
                  data={this.props.newuser}
                  columns={[
                    {
                      columns: [
                        {
                          Header: "ID",
                          accessor: "idUser",
                          Cell: (row) => (
                            <div className="d-block w-100 text-center">
                              {row.value}
                            </div>
                          ),
                        },
                        {
                          Header: "Email",
                          accessor: "email",
                        },
                        {
                          Header: "Wedding Date",
                          accessor: "weddingDate",
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          Header: "Actions",
                          accessor: "actions",
                          sortable: false,
                          Cell: (row) => (
                            <div className="d-block w-100 text-center">
                              <Button
                                className="btn-pill btn-sm mr-3"
                                color="success"
                                id="Tooltip-123"
                                onClick={() =>
                                  this.setState(
                                    {
                                      idUser: row.original.idUser,
                                    },
                                    () => {
                                      console.log("clicked", this.state.idUser);
                                    }
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </Button>
                            </div>
                          ),
                        },
                      ],
                    },
                  ]}
                  defaultPageSize={5}
                  className="-striped -highlight"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="reset" className="mt-1">
                Reset
              </Button>
              <Button
                color="primary"
                type="submit"
                className="mt-1"
                onClick={this.props.toggle}
              >
                Submit
              </Button>{" "}
            </ModalFooter>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default ModalAssignment;
