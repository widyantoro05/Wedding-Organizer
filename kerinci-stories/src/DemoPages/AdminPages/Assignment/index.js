import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ReactTable from "react-table";
import {
  faPen,
  faSave,
  faSignOutAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import TabelStaff from "./TabelStaff";
import TabelUser from "./TabelUser";
import PageTitleAdmin from "../../../Layout/AppMain/PageTitleAdmin";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";

const MySwal = withReactContent(Swal);

const job = [
  { value: "All", label: "All Job" },
  { value: "Photographer", label: "Photographer" },
  { value: "Videographer", label: "Videographer" },
  { value: "Designer & Stylish", label: "Designer & Stylish" },
  { value: "Makeup Artist", label: "Makeup Artist" },
  { value: "Event Organizer", label: "Event Organizer" },
  { value: "Decorator", label: "Decorator" },
  { value: "Chef", label: "Chef" },
  { value: "Waiter", label: "Waiter" },
  { value: "Waitress", label: "Waitress" },
];

class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: [],
      editAssignment: [],
      restuser: [],
      reststaff: [],
      idAssignment: "",
      idStaff: "",
      idUser: "",
      getidUser: "",
      getidStaff: "",
      selectedJob: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStaff = this.handleChangeStaff.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.saveData = this.saveData.bind(this);
    this.editButton = this.editButton.bind(this);
    this.defaultEditValue = this.defaultEditValue.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.getuser = this.getuser.bind(this);
    this.getstaff = this.getstaff.bind(this);
    this.conditionalGet = this.conditionalGet.bind(this);
  }

  componentDidMount = async () => {
    let data = await axios
      .get("http://localhost:1212//v1/app/assignment")
      .then(({ data }) => data);
    console.log(data);
    this.setState({ assignment: data.data });
    this.getuser();
    this.getstaff();
  };

  getuser = async () => {
    await axios
      .get("http://localhost:1212//v1/app/assignment/restuser")
      .then((response) => {
        this.setState({ restuser: response.data.data });
      });
  };

  getstaff = async () => {
    await axios
      .get("http://localhost:1212//v1/app/assignment/reststaff")
      .then((response) => {
        this.setState({ reststaff: response.data.data });
      });
  };

  getstaffbyjob = async (job) => {
    await axios
      .get("http://localhost:1212//v1/app/assignment/reststaff/byjob/" + job)
      .then((response) => {
        this.setState({ reststaff: response.data.data });
      });
  };

  submitForm = (event) => {
    event.preventDefault();
    const assignment = {
      idAssignment: this.state.idAssignment,
      idStaff: this.state.idStaff,
      idUser: this.state.idUser,
    };
    this.saveData(assignment);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ idAssignment: "", idStaff: "", idUser: "" });
  };

  editButton = (data) => {
    this.setState({ editAssignment: data }, () => {
      this.defaultEditValue();
    });
  };

  defaultEditValue = () => {
    this.setState({
      idAssignment: this.state.editAssignment.idAssignment,
      idStaff: this.state.editAssignment.idStaff,
      idUser: this.state.editAssignment.idUser,
    });
  };

  conditionalGet = () => {
    if (
      this.state.selectedJob !== null &&
      this.state.selectedJob.value !== "All"
    ) {
      axios
        .get(
          `http://localhost:1212//v1/app/assignment/reststaff/byjob/${this.state.selectedJob.value}`
        )
        .then((response) => {
          this.setState({ reststaff: response.data.data });
        });
    } else {
      this.getstaff();
    }
    this.getuser();
  };

  saveData = async (assignment) => {
    await axios
      .post("http://localhost:1212/v1/app/assignment", assignment)
      .then((response) => {
        if (response.data.status === 200) {
          MySwal.fire({
            icon: "success",
            title: `Staff ID: ${assignment.idStaff} successfully assigned to the User ID: ${assignment.idUser}`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: `Staff ID: ${assignment.idStaff} has already been assigned to the same User ID: ${assignment.idUser}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    await axios
      .get("http://localhost:1212//v1/app/assignment")
      .then((response) => {
        this.setState({ assignment: response.data.data });
      });
    this.conditionalGet();
  };

  update = () => {
    window.location.reload(false);
  };

  deleteAssignment = async (assignment) => {
    await axios
      .delete("http://localhost:1212//v1/app/assignment/" + assignment.idAssignment)
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            assignment: this.state.assignment.filter(
              (a) => a.idAssignment !== assignment.idAssignment
            ),
          });
          MySwal.fire({
            icon: "success",
            title: `Staff ID: ${assignment.idStaff} successfully deleted from assignment`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Your data failed to delete!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    this.conditionalGet();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeStaff = (idStaff) => {
    this.setState({ idStaff: idStaff });
  };

  handleChangeStaffbyJob = (selectedJob) => {
    this.setState({ selectedJob });
    if (selectedJob.value === "All") {
      this.getstaff();
    } else {
      this.getstaffbyjob(selectedJob.value);
    }
  };

  handleChangeUser = (idUser) => {
    this.setState({ idUser: idUser });
  };

  handleChangeGetidUser = (event) => {
    this.setState({ getidUser: event.target.value }, () => {
      this.searchbyidUser(this.state.getidUser);
    });
  };

  searchbyidUser = (getidUser) => {
    if (getidUser !== "") {
      axios
        .get(
          "http://localhost:1212//v1/app/assignment/assignmentbyuserid/" +
            getidUser
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({ assignment: data.data });
        });
    } else {
      axios
        .get("http://localhost:1212//v1/app/assignment")
        .then((response) => response.data)
        .then((data) => {
          this.setState({ assignment: data.data }, () => {
            console.log(this.state.assignment);
          });
        });
    }
  };

  handleChangeGetidStaff = (event) => {
    this.setState({ getidStaff: event.target.value }, () => {
      this.searchbyidStaff(this.state.getidStaff);
    });
  };

  searchbyidStaff = (getidStaff) => {
    if (getidStaff !== "") {
      axios
        .get(
          "http://localhost:1212//v1/app/assignment/assignmentbystaffid/" +
            getidStaff
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({ assignment: data.data });
        });
    } else {
      axios
        .get("http://localhost:1212//v1/app/assignment")
        .then((response) => response.data)
        .then((data) => {
          this.setState({ assignment: data.data }, () => {
            console.log(this.state.assignment);
          });
        });
    }
  };

  render() {
    const {
      assignment,
      idAssignment,
      idStaff,
      idUser,
      getidUser,
      getidStaff,
      selectedJob,
    } = this.state;
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitleAdmin
            heading="Assignment"
            subheading="Basic example of a React table with sort, search and filter functionality."
            icon="lnr-calendar-full"
          />
          <Card className="main-card mb-3">
            <CardHeader>
              <h5>Assignment</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <Row>
                    <Col md="6">
                      <h5>Staff</h5>
                    </Col>
                    <Col md="6">
                      <Select
                        value={selectedJob}
                        onChange={this.handleChangeStaffbyJob}
                        options={job}
                        placeholder="Select certain job"
                      />
                    </Col>
                  </Row>
                  <TabelStaff
                    reststaff={this.state.reststaff}
                    handleChangeStaff={(idStaff) =>
                      this.handleChangeStaff(idStaff)
                    }
                  />
                </Col>
                <Col md="6">
                  <h5>User</h5>
                  <TabelUser
                    restuser={this.state.restuser}
                    handleChangeUser={(idUser) => this.handleChangeUser(idUser)}
                  />
                </Col>
              </Row>
              <br />
              <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                <Row>
                  <Input
                    name="idAssignment"
                    id="idAssignment"
                    value={idAssignment}
                    onChange={this.handleChange}
                    hidden
                  />
                  <Col md="6">
                    <FormGroup>
                      <Input
                        className="text-center font-weight-bold"
                        type="number"
                        name="idStaff"
                        id="idStaff"
                        placeholder="ID Staff"
                        autoComplete="off"
                        value={idStaff}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Input
                        className="text-center font-weight-bold"
                        type="number"
                        name="idUser"
                        id="idUser"
                        placeholder="ID User"
                        autoComplete="off"
                        value={idUser}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="text-right">
                    <Row>
                      <Col md="6">
                        <Input
                          type="text"
                          name="getidStaff"
                          id="getidStaff"
                          placeholder="Search Assignment by ID Staff"
                          autoComplete="off"
                          value={getidStaff}
                          onChange={this.handleChangeGetidStaff}
                        />
                      </Col>
                      <Col md="6">
                        <Button
                          className="btn-pill btn-lg btn-shadow mt-1"
                          style={{
                            backgroundColor: "#ffffff",
                            border: "none",
                            color: "currentcolor",
                          }}
                          type="reset"
                        >
                          <FontAwesomeIcon icon={faUndo} />
                          <span> Reset</span>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <Button
                          className="btn-pill btn-lg btn-shadow mt-1"
                          style={{
                            background: "#C0D39A",
                            border: "none",
                            color: "currentcolor",
                          }}
                          type="submit"
                        >
                          <FontAwesomeIcon icon={faSave} />
                          <span> Submit</span>
                        </Button>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="getidUser"
                          id="getidUser"
                          placeholder="Search Assignment by ID User"
                          autoComplete="off"
                          value={getidUser}
                          onChange={this.handleChangeGetidUser}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
              <br />
              <Row>
                <Col md="12">
                  <ReactTable
                    data={assignment}
                    columns={[
                      {
                        columns: [
                          {
                            Header: "ID Assignment",
                            accessor: "idAssignment",
                            Cell: (row) => (
                              <div className="d-block w-100 text-center">
                                {row.value}
                              </div>
                            ),
                          },
                          {
                            Header: "ID Staff",
                            accessor: "idStaff",
                            Cell: (row) => (
                              <div className="d-block w-100 text-center">
                                {row.value}
                              </div>
                            ),
                          },
                          {
                            Header: "Staff",
                            accessor: "nameStaff",
                          },
                          {
                            Header: "Job",
                            accessor: "job",
                          },
                          {
                            Header: "ID User",
                            accessor: "idUser",
                            Cell: (row) => (
                              <div className="d-block w-100 text-center">
                                {row.value}
                              </div>
                            ),
                          },
                          {
                            Header: "Schedule",
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
                                  className="btn-pill btn-sm mr-3 btn-shine"
                                  style={{
                                    background: "#94C973",
                                    border: "none",
                                  }}
                                  onClick={() => this.editButton(row.original)}
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button
                                  className="btn-pill btn-sm mr-3 btn-shine"
                                  style={{
                                    background: "#F37970",
                                    border: "none",
                                  }}
                                  onClick={() =>
                                    this.deleteAssignment(
                                      row.original
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faSignOutAlt} />
                                </Button>
                              </div>
                            ),
                          },
                        ],
                      },
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default Assignment;
