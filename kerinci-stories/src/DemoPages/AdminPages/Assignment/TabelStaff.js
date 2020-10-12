import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TableStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idAssignment: "",
      idStaff: "",
      idUser: "",
      job: "",
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
    return (
      <ReactTable
        data={this.props.reststaff}
        columns={[
          {
            columns: [
              {
                Header: "ID Staff",
                accessor: "idStaff",
                Cell: (row) => (
                  <div className="d-block w-100 text-center">{row.value}</div>
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
                      className="btn-pill btn-sm mr-3 btn-shine"
                      style={{
                        background: "#94C973",
                        border: "none",
                      }}
                      onClick={() =>
                        this.props.handleChangeStaff(row.original.idStaff)
                      }
                    >
                      <FontAwesomeIcon icon={faSignInAlt} />
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
    );
  }
}

export default TableStaff;
