import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, Button, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalCatering from "./ModalCatering";
import axios from "axios";
import ReactTable from "react-table";
import { faListUl, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditCatering from "./EditCatering";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class TableInputCatering extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catering: [],
      editCatering: [],
      editModalShow: false,
      modalShow: false,
    };
    this.saveData = this.saveData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.deleteCatering = this.deleteCatering.bind(this);
  }

  componentDidMount = async () => {
    await axios
      .get("http://localhost:1212//v1/app/catering")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ catering: data.data }, () => {
          console.log(this.state.catering);
        });
      });
  };

  saveData = async (model) => {
    await axios
      .post("http://localhost:1212/v1/app/catering", model)
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
      .get("http://localhost:1212//v1/app/catering")
      .then((response) => {
        this.setState({ catering: response.data.data });
      });
  };

  toggle = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  close = () => {
    this.setState({ editModalShow: !this.state.editModalShow });
  };

  deleteCatering = (id) => {
    axios
      .delete("http://localhost:1212//v1/app/catering/" + id)
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            catering: this.state.catering.filter((c) => c.idCatering !== id),
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
  };

  render() {
    const { catering } = this.state;
    return (
      <Fragment>
        <EditCatering
          isOpen={this.state.editModalShow}
          toggle={this.close}
          editCatering={this.state.editCatering}
          savedata={(model) => this.saveData(model)}
        />
        <ModalCatering
          isOpen={this.state.modalShow}
          toggle={this.toggle}
          savedata={(model) => this.saveData(model)}
        />
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  <h5>Catering</h5>
                  <div className="btn-actions-pane-right">
                    <Button
                      className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                      style={{ background: "#76B947", border: "none" }}
                      onClick={this.toggle}
                    >
                      <FontAwesomeIcon icon={faListUl} />
                      <span> Add</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={catering}
                    columns={[
                      {
                        columns: [
                          {
                            Header: "ID",
                            accessor: "idCatering",
                            Cell: (row) => (
                              <div className="d-block w-100 text-center">
                                {row.value}
                              </div>
                            ),
                          },
                          {
                            Header: "Name",
                            accessor: "nameCatering",
                          },
                          {
                            Header: "Style",
                            accessor: "styleCatering",
                          },
                          {
                            Header: "Portion",
                            accessor: "portionCatering",
                          },
                          {
                            Header: "Image",
                            accessor: "imageCatering",
                          },
                          {
                            Header: "Detail",
                            accessor: "detailCatering",
                          },
                          {
                            Header: "Price",
                            accessor: "priceCatering",
                            Cell: (row) => (
                              <div className="d-block w-100 text-right">
                                {row.value}
                              </div>
                            ),
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
                                  onClick={() =>
                                    this.setState({
                                      editModalShow: true,
                                      editCatering: row.original,
                                    })
                                  }
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
                                    this.deleteCatering(row.original.idCatering)
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

export default TableInputCatering;
