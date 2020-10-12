import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {
    Row, Col, FormGroup,
    Card, CardBody, Input, CardFooter,
    Button, Container
} from 'reactstrap';
import image from '../../../../assets/utils/images/emptysearchlogo.png'

const style = [
    { value: 'All', label: 'All' },
    { value: 'Modern', label: 'Modern' },
    { value: 'Traditional', label: 'Traditional' },
    { value: 'Hijab', label: 'Hijab' },
];

const sort = [
    { value: 'asc', label: 'Lowest price' },
    { value: 'desc', label: 'Highest price' }
];

class CardsAdvanced extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            showMore: true,
            transform: true,
            showInkBar: true,
            transformWidth: 400,
            selectedStyle: null,
            selectedSort: null,
            key: 0,
            grey: false,
            dam: [],
        };
        this.handleChangeStyle = this.handleChangeStyle.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/dam")
            .then(response => {
                this.setState({ dam: response.data.data });
            });
    }

    handleChangeStyle = (selectedStyle) => {
        this.setState({ selectedStyle });
        console.log(selectedStyle);
        if (selectedStyle.value === 'All') {
            axios.get("http://localhost:1212/v1/app/dam")
                .then(response => {
                    this.setState({ dam: response.data.data });
                });
        } else {
            axios.get("http://localhost:1212/v1/app/dam/style/" + selectedStyle.value)
                .then(response => {
                    this.setState({ dam: response.data.data });
                    console.log(response.data)
                });
        }
    }

    handleChangeSort = (selectedSort) => {
        this.setState({ selectedSort });
        if (selectedSort.value === 'asc') {
            this.sortByPriceAsc()
            console.log("a")
        } else {
            this.sortByPriceDesc()
        }
    }

    sortByPriceAsc() {
        this.setState(prevState => {
            this.state.dam.sort((a, b) => (a.priceDam - b.priceDam))
        });
    }

    sortByPriceDesc() {
        this.setState(prevState => {
            this.state.dam.sort((a, b) => (b.priceDam - a.priceDam))
        });
    }

    setData = (dat) => {
        if (localStorage.getItem('keyDam') == dat.idDam && localStorage.getItem('greyDam')=='true') {
            localStorage.removeItem('dam')
            localStorage.removeItem('keyDam')
            localStorage.setItem('greyDam', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyDam')
            localStorage.removeItem('greyDam')
            localStorage.removeItem('dam')
            localStorage.setItem('keyDam', dat.idDam)
            localStorage.setItem('greyDam', true)
            localStorage.setItem('dam', JSON.stringify(dat))
            this.componentDidMount()
        }
    }

    searchDam = (name) => {
        if (name !== "") {
            axios.get("http://localhost:1212//v1/app/dam/randomname?nameDam=" + name)
                .then(response => this.setState({ dam: response.data.data }))
        }
        else {
            axios.get("http://localhost:1212/v1/app/dam")
                .then(response => {
                    this.setState({ dam: response.data.data });
                });
        }
    }

    handleSearch = (event) => {
        this.setState({ search: event.target.value },
            () => {
                this.searchDam(this.state.search);
            })
    }

    render() {
        //this.componentDidMount();
        return (
            <div>
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Container>
                        <Row style={{justifyContent:"center"}}>
                            <Col lg="3" md="6" sm="12">
                                <FormGroup>
                                    <Input
                                        type="text"
                                        id="search"
                                        name="search"
                                        value={this.state.search}
                                        onChange={this.handleSearch}
                                        autoComplete='off'
                                        placeholder="Search..."
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="3" md="6" sm="12">
                                <FormGroup>
                                    <Select
                                        value={this.state.selectedStyle}
                                        onChange={this.handleChangeStyle}
                                        options={style}
                                        placeholder="Select your preference"
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="3" md="6" sm="12" >
                                <FormGroup>
                                    <Select
                                        value={this.state.selectedSort}
                                        onChange={this.handleChangeSort}
                                        options={sort}
                                        placeholder="Sort by price"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        {this.state.dam.length ?
                        <Row>
                            {this.state.dam ?
                                this.state.dam.map((dam, index) => (
                                    <Col lg="3" md="6" sm="12" key={dam.idDam} style={{ display: "inline-grid" }}>
                                        <Card className="card-hover-shadow-2x mb-3">
                                            <img className="d-block"
                                                src={`http://localhost:1212/v1/app/downloadFile/${dam.imageDam}`} alt={dam.nameDam}
                                                style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                            <CardBody>
                                                <h5 className='text-center' style={{ fontWeight: "500" }}>{dam.nameDam}</h5>
                                                <hr />
                                                <p className='text-center'>Style: {dam.styleDam}</p>
                                                <p className='text-center'>{dam.detailDam}</p>
                                            </CardBody>
                                            <CardFooter className="d-block">
                                                <div>
                                                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                        <CurrencyFormat value={dam.priceDam} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                    </span>
                                                    <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setData(dam)}>
                                                        <FontAwesomeIcon icon={faHeart} color={dam.idDam == parseInt( localStorage.getItem('keyDam')) ?"red" : "grey"} size="lg" />
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                )) : ""}
                        </Row>
                        :
                        <div className="text-center">
                            <br /><br />
                            <img src={image} style={{ width: '60%', height: 'auto', alignSelf: 'center' }} alt="">
                            </img>
                        </div>
                    }
                    </Container>
                </CSSTransitionGroup>
                <br />
                <br />
            </Fragment>
            </div>
        );
    }
}
export default CardsAdvanced;
