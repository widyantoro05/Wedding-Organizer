import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import ReactTable from "react-table";
import { faDatabase, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoUser from "./InfoUser";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idAssignment: "",
      idStaff: "",
      idUser: "",
      modalShow: false,
      datauser: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getdatauser = this.getdatauser.bind(this);
  }

  initialInput = {
    idAssignment: "",
    idStaff: "",
    idUser: "",
  };

  toggle = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  getdatauser = async (idUser) => {
    this.toggle();
    await axios
      .get("http://localhost:1212//v1/app/assignment/userbyid/" + idUser)
      .then((response) => {
        this.setState({ datauser: response.data.data });
      });
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
    return (
      <div>
        <InfoUser
          isOpen={this.state.modalShow}
          toggle={this.toggle}
          datauser={this.state.datauser}
        />
        <ReactTable
          data={this.props.restuser}
          columns={[
            {
              columns: [
                {
                  Header: "ID User",
                  accessor: "idUser",
                  Cell: (row) => (
                    <div className="d-block w-100 text-center">{row.value}</div>
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
                {
                  Header: "Needed Staff",
                  accessor: "countProduct",
                  Cell: (row) => (
                    <div className="d-block w-100 text-center">{row.value}</div>
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
                          this.props.handleChangeUser(row.original.idUser)
                        }
                      >
                        <FontAwesomeIcon icon={faSignInAlt} />
                      </Button>
                      <Button
                        className="btn-pill btn-sm mr-3 btn-shine"
                        style={{
                          background: "#8c9eff",
                          border: "none",
                        }}
                        onClick={() => this.getdatauser(row.original.idUser)}
                      >
                        <FontAwesomeIcon icon={faDatabase} />
                      </Button>
                    </div>
                  ),
                },
              ],
            },
          ]}
          defaultPageSize={3}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default TableUser;
