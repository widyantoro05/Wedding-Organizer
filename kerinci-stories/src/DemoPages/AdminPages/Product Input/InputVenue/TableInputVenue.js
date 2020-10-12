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

import ModalPostVenue from './ModalPost';
import ModalEditVenue from './ModalEdit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default class Venue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            venue: [],
            editVenue: [],
            modalPostShow: false,
            modalEditShow: false,
            nama: ""
        };
        this.toggle = this.toggle.bind(this);
        this.savedata = this.savedata.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.deleteVenue = this.deleteVenue.bind(this);
    }

    // componentDidMount() {
    //     axios.get("http://localhost:1212/v1/app/venue/all").then((response) => {
    //         console.log(response.data);
    //         this.setState({ venue: response.data.data });
    //     });
    // }

    async componentDidMount() {
        let data = await axios.get("http://localhost:1212/v1/app/venue/all").then(({ data }) => data);
        console.log(data);
        this.setState({ venue: data.data });

    }

    // componentDidUpdate() {
    //     axios.get("http://localhost:1212/v1/app/venue/all").then((response) => {
    //         console.log(response.data);
    //         this.setState({ venue: response.data.data });
    //     });
    // }

    toggle = () => {
        this.setState({ modalPostShow: !this.state.modalPostShow })
        console.log(this.state.modalPostShow)
    }

    savedata = async (model) => {
        await axios.post("http://localhost:1212/v1/app/venue", model)
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
        await axios.get("http://localhost:1212/v1/app/venue/all").then((response) => {
            //console.log(response.data.data);
            this.setState({ venue: response.data.data });
        });
    }

    toggleEdit = () => {
        this.setState({ modalEditShow: !this.state.modalEditShow });
    }

    deleteVenue = (id) => {
        console.log(id);
        axios.delete("http://localhost:1212/v1/app/venue/delete/" + id)
            .then((response) => {
                if (response.data.status === 200) {
                    alert(response.data.message)
                    this.setState({
                        venue: this.state.venue.filter(venue => venue.idVenue !== id)
                    })
                } else {
                    alert("gagal")
                }
            });
    }

    render() {
        const { venue } = this.state;

        return (
            <>
                <Fragment>
                    <ModalEditVenue isOpen={this.state.modalEditShow} toggle={this.toggleEdit} editVenue={this.state.editVenue} savedata={(model) => this.savedata(model)} />
                    <ModalPostVenue isOpen={this.state.modalPostShow} toggle={this.toggle} savedata={(model) => this.savedata(model)} />

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
                                        <h5>Venue</h5>
                                        <div className="btn-actions-pane-right">
                                            <Button className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                                color="info" id="Tooltip-123"
                                                onClick={this.toggle} style={{ background: "#76B947", border: "none" }}>
                                                <FontAwesomeIcon icon={faListUl} />
                                                <span>  Add</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <ReactTable
                                            data={venue}
                                            columns={[{
                                                columns: [
                                                    {
                                                        Header: 'ID',
                                                        accessor: 'idVenue',
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-center'>
                                                                {row.value}
                                                            </div>)

                                                    },
                                                    {
                                                        Header: 'Venue',
                                                        accessor: 'nameVenue'
                                                    },
                                                    {
                                                        Header: 'Location',
                                                        accessor: 'location'
                                                    },
                                                    {
                                                        Header: 'Ambiance',
                                                        accessor: 'ambiance'
                                                    },
                                                    {
                                                        Header: 'Capacity',
                                                        accessor: 'capacity'
                                                    },
                                                    // {
                                                    //     Header: 'Style',
                                                    //     accessor: 'styleDam',
                                                    //     Cell: row => (
                                                    //         <div className='d-block w-100 text-center'>
                                                    //             {row.value}
                                                    //         </div>)
                                                    // },
                                                    {
                                                        Header: 'Image',
                                                        accessor: 'imageVenue'
                                                    },
                                                    {
                                                        Header: 'Detail',
                                                        accessor: 'detailVenue',
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'priceVenue',
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
                                                                    onClick={() => this.setState({ modalEditShow: true, editVenue: row.original })}
                                                                    style={{ background: "#94C973", border: "none" }}>
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    onClick={() => this.deleteVenue(row.original.idVenue)}
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
            </>
        )
    }
}