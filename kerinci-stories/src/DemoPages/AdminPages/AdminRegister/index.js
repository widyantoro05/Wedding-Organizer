import React, { Fragment } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import {
    Row, Col,
    Card, CardBody,
    CardHeader, Button
} from 'reactstrap';
import {
    faListUl, faPen, faTrash
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitleAdmin from '../../../Layout/AppMain/PageTitleAdmin';

import ReactTable from "react-table";
import axios from 'axios';
import ModalAdmin from './AddModal';
import EditModalAdmin from './EditModal';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default class AdminRegister extends React.Component {
    constructor() {
        super();
        this.state = {
            admins: [],
            editAdmin: [],
            editModalShow: false,
            modalShow: false
        };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.saveData = this.saveData.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
    }

    toggle = () => {
        this.setState({ modalShow: !this.state.modalShow })
    }

    close = () => {
        this.setState({ editModalShow: !this.state.editModalShow })
    }

    componentDidMount = () => {
        axios.get("http://localhost:1212/v1/app/admin/all").then((response) => {
            //console.log(response.data.data);
            this.setState({ admins: response.data.data });
        });
    }

    saveData = async (admin) => {
        await axios.post("http://localhost:1212/v1/app/admin/insertadmin", admin)
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
        await axios.get("http://localhost:1212/v1/app/admin/all").then((response) => {
            //console.log(response.data.data);
            this.setState({ admins: response.data.data });
        });
    }

    deleteAdmin = (id) => {
        //console.log(id)
        axios.delete("http://localhost:1212/v1/app/admin/delete/" + id)
            .then((response) => {
                if (response.data.status === 200) {
                    this.setState({
                        admins: this.state.admins.filter(admin => admin.idAdmin !== id)
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

    render() {
        const { admins } = this.state;

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
                        heading="Admin Register"
                        //subheading="Manage your admin profile"
                        icon="lnr-users"
                    />
                    <ModalAdmin isOpen={this.state.modalShow} toggle={this.toggle} savedata={(admin) => this.saveData(admin)} />
                    <EditModalAdmin isOpen={this.state.editModalShow} toggle={this.close} editAdmin={this.state.editAdmin} savedata={(admin) => this.saveData(admin)} />

                    <Card>
                        <CardHeader>
                            <h5>Admin Table</h5>
                            <div className="btn-actions-pane-right">
                                <Button className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                    onClick={this.toggle} style={{ background: "#76B947" , border:"none"}}>
                                    <FontAwesomeIcon icon={faListUl} />
                                    <span> Add</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            {
                                                this.state.admins ?
                                                    <ReactTable
                                                        data={admins}
                                                        columns={[{
                                                            columns: [
                                                                {
                                                                    Header: 'ID',
                                                                    accessor: 'idAdmin',
                                                                    width: 100,
                                                                    Cell: row => (
                                                                        <div className='d-block w-100 text-center'
                                                                            style={{ width: "5%" }}>
                                                                            {row.value}
                                                                        </div>
                                                                    )
                                                                },
                                                                {
                                                                    Header: 'Username',
                                                                    accessor: 'unameAdmin',
                                                                    Cell: row => (
                                                                        <div>
                                                                            <div className="widget-content p-0">
                                                                                <div className="widget-content-wrapper">
                                                                                    <div className="widget-content-left mr-3">
                                                                                        <div className="widget-content-left">
                                                                                            <img width={52} className="rounded-circle d-block"
                                                                                                src={`http://localhost:1212/v1/app/downloadFile/${row.original.imageAdmin}`}
                                                                                                style={{ width: "54px", height: "54px", objectFit: "cover" }}
                                                                                                alt="imageAdmin" />
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
                                                                    Header: 'Name',
                                                                    accessor: 'nameAdmin'
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
                                                                                onClick={() => this.setState({ editModalShow: true, editAdmin: row.original })}
                                                                                style={{background:"#94C973", border:"none"}}>
                                                                                <FontAwesomeIcon icon={faPen} />
                                                                            </Button>
                                                                            <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                                onClick={() => this.deleteAdmin(row.original.idAdmin)}
                                                                                style={{background:"#F37970", border:"none"}}>
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