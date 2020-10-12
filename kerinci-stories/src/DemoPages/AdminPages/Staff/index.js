import React, { Fragment } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import {
    Row, Col,
    Card, CardBody,
    CardHeader, Button,
    FormGroup, Input
} from 'reactstrap';
import Select from 'react-select';
import {
    faListUl, faPen, faTrash
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitleAdmin from '../../../Layout/AppMain/PageTitleAdmin';

import ReactTable from "react-table";
import axios from 'axios';
import ModalStaff from './AddModal';
import EditModalStaff from './EditModal';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const job = [
    { value: 'all', label: 'All Jobs' },
    { value: 'Photographer', label: 'Photographer' },
    { value: 'Videographer', label: 'Videographer' },
    { value: 'Designer & Stylish', label: 'Designer & Stylish' },
    { value: 'Makeup Artist', label: 'Makeup Artist' },
    { value: 'Event Organizer', label: 'Event Organizer' },
    { value: 'Decorator', label: 'Decorator' },
    { value: 'Chef', label: 'Chef' },
    { value: 'Waiter', label: 'Waiter' },
    { value: 'Waitress', label: 'Waitress' }
];

export default class Staff extends React.Component {
    constructor() {
        super();
        this.state = {
            staffs: [],
            editStaff: [],
            selectedJob: "",
            search: "",
            editModalShow: false,
            modalShow: false
        };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.saveData = this.saveData.bind(this);
        this.deleteStaff = this.deleteStaff.bind(this);
        this.handleChangeJob = this.handleChangeJob.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    toggle = () => {
        this.setState({ modalShow: !this.state.modalShow })
    }

    close = () => {
        this.setState({ editModalShow: !this.state.editModalShow })
    }

    componentDidMount = () => {
        axios.get("http://localhost:1212/v1/app/staff/alldata").then((response) => {
            //console.log(response.data.data);
            this.setState({ staffs: response.data.data });
        });
    }

    saveData = async (staff) => {
        await axios.post("http://localhost:1212/v1/app/staff/data", staff)
            .then(response => {
                //console.log(response);
                if (response.data.status === 200) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data saved successfully!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Your data failed to be saved!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            });
        await axios.get("http://localhost:1212/v1/app/staff/alldata").then((response) => {
            //console.log(response.data.data);
            this.setState({ staffs: response.data.data });
        });
    }

    deleteStaff = (id) => {
        //console.log(id)
        axios.delete("http://localhost:1212/v1/app/staff/" + id)
            .then((response) => {
                if (response.data.status === 200) {
                    this.setState({
                        staffs: this.state.staffs.filter(staff => staff.idStaff !== id)
                    })
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data deleted successfully!',
                        showConfirmButton: false,
                        timer: 1000,
                    })

                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Your data failed to delete!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            });
    }

    searchName = (name) => {
        if (name !== "") {
            axios
                .get("http://localhost:1212//v1/app/staff/randomname/" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ staffs: data.data });
                });
        } else {
            axios
                .get("http://localhost:1212//v1/app/staff/alldata")
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ staffs: data.data }, () => {
                        console.log(this.state.staffs);
                    });
                });
        }
    };

    handleChangeSearch = (event) => {
        this.setState({ search: event.target.value }, () => {
            this.searchName(this.state.search);
        });
    };

    handleChangeJob = (selectedJob) => {
        this.setState({ selectedJob });
        // console.log(this.state.selectedJob);
        if (selectedJob.value === 'all') {
            axios.get("http://localhost:1212/v1/app/staff/alldata").then((response) => {
                this.setState({ staffs: response.data.data });
            });
        }
        else {
            axios.get("http://localhost:1212/v1/app/staff/by/" + selectedJob.value).then((response) => {
                this.setState({ staffs: response.data.data });
            });
        }
    }

    render() {
        const { staffs, selectedJob, search } = this.state;

        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitleAdmin
                        heading="Staff"
                        //subheading="Manage your staff profile"
                        icon="lnr-users"
                    />
                    <ModalStaff isOpen={this.state.modalShow} toggle={this.toggle} savedata={(staff) => this.saveData(staff)} />
                    <EditModalStaff isOpen={this.state.editModalShow} toggle={this.close} editstaff={this.state.editStaff} savedata={(staff) => this.saveData(staff)} />

                    <Card>
                        <CardHeader>
                            <h5>Staff Table</h5>
                            <div className="btn-actions-pane-right">
                                <Button className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                    onClick={this.toggle} style={{ background: "#76B947", border: "none" }}>
                                    <FontAwesomeIcon icon={faListUl} />
                                    <span> Add</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Row style={{ justifyContent: "center" }}>
                                        <Col lg="3" md="6" sm="12">
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    id="search"
                                                    name="search"
                                                    placeholder="Search..."
                                                    onChange={this.handleChangeSearch}
                                                    value={search}
                                                ></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3" md="6" sm="12">
                                            <FormGroup>
                                                <Select
                                                    value={selectedJob}
                                                    onChange={this.handleChangeJob}
                                                    options={job}
                                                    placeholder="Select job"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            {
                                                this.state.staffs ?
                                                    <ReactTable
                                                        data={staffs}
                                                        columns={[{
                                                            columns: [
                                                                {
                                                                    Header: 'ID',
                                                                    accessor: 'idStaff',
                                                                    width: 100,
                                                                    Cell: row => (
                                                                        <div className='d-block w-100 text-center'
                                                                            style={{ width: "5%" }}>
                                                                            {row.value}
                                                                        </div>
                                                                    )
                                                                },
                                                                {
                                                                    Header: 'Name',
                                                                    accessor: 'nameStaff',
                                                                    Cell: row => (
                                                                        <div>
                                                                            <div className="widget-content p-0">
                                                                                <div className="widget-content-wrapper">
                                                                                    <div className="widget-content-left mr-3">
                                                                                        <div className="widget-content-left">
                                                                                            <img width={52} className="d-block rounded-circle"
                                                                                                src={`http://localhost:1212/v1/app/downloadFile/${row.original.profile}`}
                                                                                                alt="profile" style={{ width: "52px", height: "52px", objectFit: "cover" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="widget-content-left flex2">
                                                                                        <div className="widget-heading">
                                                                                            {row.value}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                },
                                                                {
                                                                    Header: 'Job',
                                                                    accessor: 'job'
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            columns: [

                                                                {
                                                                    Header: 'Actions',
                                                                    accessor: 'actions',
                                                                    width: 200,
                                                                    Cell: row => (
                                                                        <div className="d-block w-100 text-center">
                                                                            <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                                onClick={() => this.setState({ editModalShow: true, editStaff: row.original })}
                                                                                style={{ background: "#94C973", border: "none" }}>
                                                                                <FontAwesomeIcon icon={faPen} />
                                                                            </Button>
                                                                            <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                                onClick={() => this.deleteStaff(row.original.idStaff)}
                                                                                style={{ background: "#F37970", border: "none" }}>
                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                            </Button>
                                                                        </div>
                                                                    )
                                                                }
                                                            ]
                                                        }]}
                                                        defaultPageSize={10}
                                                        className="-striped -highlight"
                                                    />
                                                    : ""
                                            }
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </CSSTransitionGroup>
            </Fragment>
        )
    }
}