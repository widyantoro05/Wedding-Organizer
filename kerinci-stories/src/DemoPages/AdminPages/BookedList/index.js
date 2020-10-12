import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
    Row, Col,
    Card, CardBody,
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";
import PageTitleAdmin from '../../../Layout/AppMain/PageTitleAdmin';
import Axios from 'axios';
import ModalEdit from './ModalEdit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class BookedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookedlist: [],
            bookedlistedit: [],
            name: [],
            modalShow: false,
        }
        this.toggle = this.toggle.bind(this);
        this.editdata = this.editdata.bind(this);
        this.deleteBookedlist = this.deleteBookedlist.bind(this);
    }

    toggle = () => {
        this.setState({ modalShow: !this.state.modalShow })
    }

    componentDidMount() {
        Axios
            .get("http://localhost:1212/v1/app/user")
            .then(response => {
                this.setState({ bookedlist: response.data.data });
            })
    }

    editdata = async (bookedEdit) => {
        await Axios
            .post("http://localhost:1212/v1/app/user/bookedlistEdit", bookedEdit)
            .then(response => {
                if (response.data.status === 200) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data updated successfully!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Your data failed to be updated!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            });
        await Axios
            .get("http://localhost:1212/v1/app/user")
            .then(response => {
                this.setState({ bookedlist: response.data.data });
            })
    }

    deleteBookedlist = (id) => {
        Axios
            .delete("http://localhost:1212/v1/app/user/" + id)
            .then(response => {
                if (response.data.status === 200) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your data deleted successfully!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    this.setState({
                        bookedlist: this.state.bookedlist.filter(bookedlist => bookedlist.idUser !== id)
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
                        heading="Booked List"
                        icon="lnr-book"
                    />
                    <ModalEdit
                        isOpen={this.state.modalShow}
                        toggle={this.toggle}
                        bookedlistedit={this.state.bookedlistedit}
                        editdata={(model) => this.editdata(model)} />
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    {this.state.bookedlist ?
                                        <ReactTable
                                            data={this.state.bookedlist}
                                            textAlign='center'
                                            verticalAlign='middle'
                                            columns={[{
                                                columns: [
                                                    {
                                                        Header: 'ID',
                                                        accessor: 'idUser',
                                                        width: 40,
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-right'>
                                                                {row.value}
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: "Bride & Groom",
                                                        accessor: 'nameBride',
                                                        width: 120,
                                                        Cell: row => (
                                                            <>{row.value} & {row.original.nameGroom}</>
                                                        )
                                                    },
                                                    {
                                                        Header: 'E-Mail',
                                                        accessor: 'email',
                                                        width: 100
                                                    },
                                                    {
                                                        Header: 'No. HP',
                                                        accessor: 'noHp',
                                                        width: 110
                                                    },
                                                    {
                                                        Header: 'Date',
                                                        accessor: 'weddingDate',
                                                        width: 95
                                                    },
                                                    {
                                                        Header: 'Guest',
                                                        accessor: 'guestNumber',
                                                        width: 60,
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-right'>
                                                                {row.value}
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: 'Venue',
                                                        accessor: 'nameVenue',
                                                    },
                                                    {
                                                        Header: 'Decor',
                                                        accessor: 'nameDecor',
                                                    },
                                                    {
                                                        Header: 'Attire',
                                                        accessor: 'nameDam',
                                                    },
                                                    {
                                                        Header: 'Catering',
                                                        accessor: 'nameCatering',
                                                    },
                                                    {
                                                        Header: 'Photo',
                                                        accessor: 'namePhoto',
                                                    },
                                                    {
                                                        Header: 'Total',
                                                        accessor: 'totalPrice',
                                                        width: 80,
                                                        Cell: row => (
                                                            <div className='d-block w-100 text-right'>
                                                                {row.value}
                                                            </div>
                                                        )
                                                    }
                                                ]
                                            },
                                            {
                                                columns: [
                                                    {
                                                        Header: 'Actions',
                                                        accessor: 'actions',
                                                        width: 110,
                                                        sortable: false,
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    style={{ background: "#94C973", border: "none" }}
                                                                    onClick={() => this.setState({ modalShow: true, bookedlistedit: row.original })}>
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                                <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    style={{ background: "#F37970", border: "none" }}
                                                                    onClick={() => this.deleteBookedlist(row.original.idUser)}>
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
        );
    }
}
export default BookedList;
