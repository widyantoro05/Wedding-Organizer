import React, { Fragment } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import {
    Row, Col,
    Card, CardBody, CardHeader,
    Button
} from 'reactstrap';

import ReactTable from "react-table";
import axios from 'axios';
import {
    faListUl, faPen, faTrash

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalPostDam from './ModalPost';
import ModalEditDam from './ModalEdit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default class Dam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dam: [],
            editDam: [],
            modalPostShow: false,
            modalEditShow: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.savedata = this.savedata.bind(this);
        this.deleteDam = this.deleteDam.bind(this);
    }

    componentDidMount = async () =>{
        let data = await axios.get("http://localhost:1212/v1/app/dam").then(({ data }) => data);
        console.log(data);
        this.setState({ dam: data.data });
    }

    toggle = () => {
        this.setState({ modalPostShow: !this.state.modalPostShow })
    }

    toggleEdit = () => {
        this.setState({ modalEditShow: !this.state.modalEditShow });
    }
    savedata = async (model) => {
        await axios.post("http://localhost:1212/v1/app/dam", model)
            .then(response => {
                if (response.data.status === 200) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data saved successfully!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Your data failed to be saved!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            })
        await axios.get("http://localhost:1212/v1/app/dam").then((response) => {
            console.log(response.data);
            console.log('masuk axios')
            this.setState({ dam: response.data.data });
        });
    }

    deleteDam = (id) => {
        axios.delete("http://localhost:1212/v1/app/dam/" + id)
            .then((response) => {
                console.log(response)
                if (response.data.status === 200) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data deleted successfully!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    this.setState({
                        dam: this.state.dam.filter(dam => dam.idDam !== id)
                    })
                } else {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data failed to delete!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            });
    }

    render() {
        const { dam } = this.state;

        return (
            <Fragment>
                {/* <Update/> */}
                <ModalEditDam isOpen={this.state.modalEditShow} toggle={this.toggleEdit} editdam={this.state.editDam} savedata={(model)=> this.savedata(model)} />
                <ModalPostDam isOpen={this.state.modalPostShow} toggle={this.toggle} savedata={(model) => this.savedata(model)} />
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <h5>Dress, and Makeup Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                            onClick={this.toggle} style={{ background: "#76B947", border: "none" }}>
                                            <FontAwesomeIcon icon={faListUl} />
                                            <span>  Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    {this.state.dam ?
                                        <ReactTable
                                            data={dam}
                                            columns={[{
                                                columns: [
                                                    {
                                                        Header: 'ID',
                                                        accessor: 'idDam',
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-center'>
                                                                {row.value}
                                                            </div>)

                                                    },
                                                    {
                                                        Header: 'Attire',
                                                        accessor: 'nameDam'
                                                    },
                                                    {
                                                        Header: 'Style',
                                                        accessor: 'styleDam',
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-center'>
                                                                {row.value}
                                                            </div>)
                                                    },
                                                    {
                                                        Header: 'Image',
                                                        accessor: 'imageDam'
                                                    },
                                                    {
                                                        Header: 'Detail',
                                                        accessor: 'detailDam',
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'priceDam',
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-right'>
                                                                {row.value}
                                                            </div>)
                                                    },
                                                ]
                                            },
                                            {
                                                columns: [

                                                    {
                                                        Header: 'Actions',
                                                        accessor: 'actions',
                                                        sortable: false,
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    style={{ background: "#94C973", border: "none" }}
                                                                    onClick={() => this.setState({ modalEditShow: true, editDam: row.original })}>
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    style={{ background: "#F37970", border: "none" }}
                                                                    onClick={() => this.deleteDam(row.original.idDam)}>
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
                                        : ""}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CSSTransitionGroup>
            </Fragment>
        )
    }
}