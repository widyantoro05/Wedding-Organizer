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
import ModalEditDecor from './EditModal';
import TambahModal from './TambahModal';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default class TableInputDecor extends React.Component {
    constructor() {
        super();
        this.state = {
            decor: [],
            editdecor: [],
            modalPostShow: false,
            modalEditShow: false
        };
        
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.deleteDecor = this.deleteDecor.bind(this);
        this.savedata = this.savedata.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/decor/all").then((response) => {
            console.log(response.data.data);
            this.setState({ decor: response.data.data });
        });
    }
    savedata = async (model) => {
        //console.log(model);
        await axios.post("http://localhost:1212/v1/app/decor/inputdata", model)
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
                        title: 'Your data failed to save!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            })
        await axios.get("http://localhost:1212/v1/app/decor/all").then((response) => {
            //console.log(response.data.data);
            this.setState({ decor: response.data.data });
        });

    }

    toggle = () => {
        this.setState({ modalPostShow: !this.state.modalPostShow })
    }

    toggleEdit = () => {
        this.setState({ modalEditShow: !this.state.modalEditShow });
    }

    deleteDecor = (id) => {
        console.log(id);
        axios.delete("http://localhost:1212/v1/app/decor/delete/" + id)
            .then((response) => {
                if (response.data.status === 200) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data saved successfully!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    axios.get("http://localhost:1212/v1/app/decor/all").then((response) => {
                        //console.log(response.data.data);
                        this.setState({ decor: response.data.data });
        });
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Your data failed to save!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
               
            });
        
    }

    render() {
        const { decor } = this.state;

        return (
            <Fragment>
                <ModalEditDecor isOpen={this.state.modalEditShow} toggle={this.toggleEdit} editdecor={this.state.editdecor} savedata={(model) => this.savedata(model)} />
                <TambahModal isOpen={this.state.modalPostShow} toggle={this.toggle} savedata={(model) => this.savedata(model)}  />
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
                                        <h5>Decor Table</h5>
                                        <div className="btn-actions-pane-right">
                                            <Button className="btn-pill btn-md btn-shadow btn-shine text-right mr-3" 
                                                style={{ background: "#76B947", border: "none" }}
                                                onClick={this.toggle} id="Tooltip-123">
                                                <FontAwesomeIcon icon={faListUl} />
                                                <span> Add</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <ReactTable
                                            data={decor}
                                            columns={[{
                                                columns: [
                                                    {
                                                        Header: 'ID',
                                                        accessor: 'idDecor'
                                                    },
                                                    {
                                                        Header: 'Name',
                                                        accessor: 'nameDecor'
                                                    },
                                                    {
                                                        Header: 'Style',
                                                        accessor: 'styleDecor'
                                                    },
                                                    {
                                                        Header: 'Image',
                                                        accessor: 'imageDecor'
                                                    },
                                                    {
                                                        Header: 'Detail',
                                                        accessor: 'detailDecor'
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'priceDecor'
                                                    },
                                                ]
                                            },
                                            {
                                                columns: [

                                                    {
                                                        Header: 'Actions',
                                                        accessor: 'actions',
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    onClick={() => this.setState({ modalEditShow: true, editdecor: row.original })}
                                                                    style={{ background: "#94C973", border: "none" }}>
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    onClick={() => this.deleteDecor(row.original.idDecor)}
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
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </CSSTransitionGroup>
            </Fragment>
        )
    }
}