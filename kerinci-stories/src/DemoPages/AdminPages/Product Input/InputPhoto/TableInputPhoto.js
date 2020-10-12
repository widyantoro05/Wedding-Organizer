import React, { Fragment } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import {
    Row, Col, Button,
    Card, CardBody, CardHeader
} from 'reactstrap';

import ReactTable from "react-table";
import axios from 'axios';
import {
    faListUl, faPen, faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalPhoto from './AddModal';
import EditModal from './EditModal';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default class Photovideography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            editPhoto: [],
            editModalShow: false,
            modalShow: false
        };
        this.savedata = this.savedata.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
    }

    toggle = () => {
        this.setState({ modalShow: !this.state.modalShow })
    }

    close = () => {
        this.setState({ editModalShow: !this.state.editModalShow })
    }

    componentDidMount = async () => {
        let data = await axios.get("http://localhost:1212/v1/app/photo&video/alldata")
            .then(({ data }) => data);
        this.setState({ photos: data.data })

    }

    savedata = async (model) => {
        //console.log(model);
        await axios.post("http://localhost:1212/v1/app/photo&video/data", model)
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
        await axios.get("http://localhost:1212/v1/app/photo&video/alldata").then((response) => {
            //console.log(response.data.data);
            this.setState({ photos: response.data.data });
        });

    }

    deletePhoto = (id) => {
        //console.log(id);
        axios.delete("http://localhost:1212/v1/app/photo&video/" + id)
            .then((response) => {
                if (response.data.status === 200) {
                    this.setState({
                        photos: this.state.photos.filter(photo => photo.idPhoto !== id)
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
        const { photos } = this.state;
        //console.log(this.state.editPhoto);
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <ModalPhoto isOpen={this.state.modalShow} toggle={this.toggle} savedata={(model) => this.savedata(model)} />
                    <EditModal isOpen={this.state.editModalShow} toggle={this.close} editphoto={this.state.editPhoto} savedata={(model) => this.savedata(model)} />

                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <h5>Photography & Videography Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                            onClick={this.toggle} style={{ background: "#76B947", border: "none" }}>
                                            <FontAwesomeIcon icon={faListUl} />
                                            <span>  Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    {
                                        this.state.photos ?
                                            <ReactTable
                                                data={photos}
                                                columns={[{
                                                    columns: [
                                                        {
                                                            Header: 'ID',
                                                            accessor: 'idPhoto',
                                                            Cell: row => (
                                                                <div className='d-block w-100 text-center'>
                                                                    {row.value}
                                                                </div>)

                                                        },
                                                        {
                                                            Header: 'Title',
                                                            accessor: 'namePhoto'
                                                        },
                                                        {
                                                            Header: 'Theme',
                                                            accessor: 'themePhoto',
                                                            Cell: row => (
                                                                <div className='d-block w-100 text-center'>
                                                                    {row.value}
                                                                </div>)
                                                        },
                                                        {
                                                            Header: 'Image',
                                                            accessor: 'imagePhoto'
                                                        },
                                                        {
                                                            Header: 'Detail',
                                                            accessor: 'detailPhoto',
                                                        },
                                                        {
                                                            Header: 'Price',
                                                            accessor: 'pricePhoto',
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
                                                                        onClick={() => this.setState({ editModalShow: true, editPhoto: row.original })}
                                                                        style={{ background: "#94C973", border: "none" }}>
                                                                        <FontAwesomeIcon icon={faPen} />
                                                                    </Button>
                                                                    <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                        onClick={() => this.deletePhoto(row.original.idPhoto)}
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
                </CSSTransitionGroup>
            </Fragment>
        )
    }
}