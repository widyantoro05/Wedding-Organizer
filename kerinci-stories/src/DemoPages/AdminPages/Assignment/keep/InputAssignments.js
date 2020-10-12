import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, Button, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ReactTable from "react-table";
import { faListUl, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAssignment from "./ModalAssignment";
import EditAssignment from "./EditAssignment";
import PageTitleAdmin from "../../../Layout/AppMain/PageTitleAdmin";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: [],
      editAssignment: [],
      editModalShow: false,
      modalShow: false,
      newuser: [],
      reststaff: [],
    };
    this.saveData = this.saveData.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.getuser = this.getuser.bind(this);
    this.getstaff = this.getstaff.bind(this);
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
      .get("http://localhost:1212//v1/app/assignment/newuser")
      .then((response) => {
        this.setState({ newuser: response.data.data });
      });
  };

  getstaff = async () => {
    await axios
      .get("http://localhost:1212//v1/app/assignment/reststaff")
      .then((response) => {
        this.setState({ reststaff: response.data.data });
      });
  };

  saveData = async (assignment) => {
    await axios
      .post("http://localhost:1212/v1/app/assignment", assignment)
      .then((response) => {
        if (response.data.status === 200) {
          MySwal.fire({
            icon: "success",
            title: "Your data saved successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Your data failed to save!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    await axios
      .get("http://localhost:1212//v1/app/assignment")
      .then((response) => {
        this.setState({ assignment: response.data.data });
      });
    this.getuser();
    this.getstaff();
  };

  saveEdit = async (assignment) => {
    await axios
      .post("http://localhost:1212/v1/app/assignment", assignment)
      .then((response) => {
        if (response.data.status === 200) {
          MySwal.fire({
            icon: "success",
            title: "Your data updated successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Your data failed to update!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    await axios
      .get("http://localhost:1212//v1/app/assignment")
      .then((response) => {
        this.setState({ assignment: response.data.data });
      });
    this.getuser();
    this.getstaff();
  };

  update = () => {
    window.location.reload(false);
  };

  toggle = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  close = () => {
    this.setState({ editModalShow: !this.state.editModalShow });
  };

  deleteAssignment = async (id) => {
    await axios
      .delete("http://localhost:1212//v1/app/assignment/" + id)
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            assignment: this.state.assignment.filter(
              (a) => a.idAssignment !== id
            ),
          });
          MySwal.fire({
            icon: "success",
            title: "Your data deleted successfully!",
            showConfirmButton: false,
            timer: 1000,
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
    this.getuser();
    this.getstaff();
  };

  render() {
    const { assignment } = this.state;
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
          <ModalAssignment
            isOpen={this.state.modalShow}
            toggle={this.toggle}
            savedata={(assignment) => this.saveData(assignment)}
            getuser={this.getuser}
            newuser={this.state.newuser}
            reststaff={this.state.reststaff}
          />
          <EditAssignment
            isOpen={this.state.editModalShow}
            toggle={this.close}
            editAssignment={this.state.editAssignment}
            saveedit={(assignment) => this.saveEdit(assignment)}
            newuser={this.state.newuser}
            reststaff={this.state.reststaff}
          />

          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  <h5>Assignment</h5>
                  <div className="btn-actions-pane-right">
                    <Button
                      className="btn-pill text-right mr-3"
                      color="info"
                      id="Tooltip-123"
                      onClick={this.toggle}
                    >
                      <FontAwesomeIcon icon={faListUl} />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={assignment}
                    columns={[
                      {
                        columns: [
                          {
                            Header: "ID",
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
                                  className="btn-pill btn-sm mr-3"
                                  color="success"
                                  id="Tooltip-123"
                                  onClick={() =>
                                    this.setState({
                                      editModalShow: true,
                                      editAssignment: row.original,
                                    })
                                  }
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button
                                  className="btn-pill btn-sm mr-3"
                                  color="danger"
                                  id="Tooltip-123"
                                  onClick={() =>
                                    this.deleteAssignment(
                                      row.original.idAssignment
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default Assignment;
