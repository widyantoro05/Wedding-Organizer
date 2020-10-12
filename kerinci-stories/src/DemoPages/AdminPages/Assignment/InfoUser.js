import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactTable from "react-table";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class InfoUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datauser: [],
    };
  }

  componentDidMount() {}

  render() {
    const closeBtn = (
      <button className="close" onClick={this.props.toggle}>
        &times;
      </button>
    );

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        datauser={this.props.datauser}
      >
        <ModalHeader
          toggle={this.props.toggle}
          close={closeBtn}
          style={{ backgroundColor: "#C0D39A" }}
        >
          <FontAwesomeIcon icon={faClipboardList} />
          <span> Booked ID List</span>
        </ModalHeader>
        <ModalBody>
          <ReactTable
            data={this.props.datauser}
            columns={[
              {
                columns: [
                  {
                    Header: "Venue",
                    accessor: "idVenue",
                    Cell: (row) => (
                      <div className="d-block w-100 text-center">
                        {row.value}
                      </div>
                    ),
                  },
                  {
                    Header: "Decor",
                    accessor: "idDecor",
                    Cell: (row) => (
                      <div className="d-block w-100 text-center">
                        {row.value}
                      </div>
                    ),
                  },
                  {
                    Header: "Dam",
                    accessor: "idDam",
                    Cell: (row) => (
                      <div className="d-block w-100 text-center">
                        {row.value}
                      </div>
                    ),
                  },
                  {
                    Header: "Catering",
                    accessor: "idCatering",
                    Cell: (row) => (
                      <div className="d-block w-100 text-center">
                        {row.value}
                      </div>
                    ),
                  },
                  {
                    Header: "Photo",
                    accessor: "idPhoto",
                    Cell: (row) => (
                      <div className="d-block w-100 text-center">
                        {row.value}
                      </div>
                    ),
                  },
                ],
              },
            ]}
            defaultPageSize={1}
            className="-striped -highlight"
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default InfoUser;
