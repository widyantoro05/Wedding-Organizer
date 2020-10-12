import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

import {
    Row, Col,
    Card, CardBody,
    CardFooter,
    Button, Container,
    FormGroup, Input
} from 'reactstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,

} from '@fortawesome/free-solid-svg-icons';

const ambiance = [
    { value: "All", label: 'All Ambiance' },
    { value: 'Indoor', label: 'Indoor' },
    { value: 'Outdoor', label: 'Outdoor' }
];

const location = [
    { value: "All", label: 'All Location' },
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Bandung', label: 'Bandung' },
    { value: 'Tangerang Selatan', label: 'Tangerang Selatan' }
];

const capacity = [
    { value: { min: 0, max: 100000000 }, label: 'All Capacity' },
    { value: { min: 0, max: 50 }, label: '0-50' },
    { value: { min: 50, max: 200 }, label: '50-200' },
    { value: { min: 200, max: 500 }, label: '200-500' },
    { value: { min: 500, max: 1000 }, label: '500-1000' },
    // { value: {min:1000,max:null}, label: '1000-more' }
];

const price = [
    { value: "All", label: 'All' },
    { value: 'low', label: 'Lowest price' },
    { value: 'high', label: 'Highest price' }
];
class CardsAdvanced extends Component {
    constructor(props) {
        super();
        this.state = {
            search: "",
            showMore: true,
            transform: true,
            showInkBar: true,
            transformWidth: 400,
            key: 0,
            grey: true,
            selectedAmbiance: { value: "All", label: "All Ambiance" },
            selectedLocation: { value: "All", label: "All Location" },
            selectedCapacity: { value: { min: 0, max: 10000000 }, label: "All Capacity" },
            selectedPrice: null,
            min: null,
            max: null,
            venues: [],
        };
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleChangeAmbiance = this.handleChangeAmbiance.bind(this);
        this.handleChangeCapacity = this.handleChangeCapacity.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/venue/all").then((response) => {
            this.setState({ venues: response.data.data });
        });
    }

    handleChangeLocation = (selectedLocation) => {
        this.setState({ selectedLocation }, this.handleFilter);
    }
    handleChangeAmbiance = (selectedAmbiance) => {
        this.setState({ selectedAmbiance }, this.handleFilter);
    }
    handleFilter = () => {
        console.log(this.state.selectedLocation);
        console.log(this.state.selectedAmbiance);
        let loc = this.state.selectedLocation.value;
        let amb = this.state.selectedAmbiance.value;
        // let cap = this.state.selectedCapacity.value;
        if (loc === 'All' && amb === "All") {
            axios.get("http://localhost:1212/v1/app/venue/all").then((response) => {
                this.setState({ venues: response.data.data });
            });
        }
        else if (loc !== 'All' && amb === "All") {
            axios.get('http://localhost:1212/v1/app/venue/location?loc=' + loc).then((response) => {
                this.setState({ venues: response.data.data });
            });
        }
        else if (loc === 'All' && amb !== "All") {
            axios.get('http://localhost:1212/v1/app/venue/ambiance?amb=' + amb).then((response) => {
                this.setState({ venues: response.data.data });
            });
        }
        else if (loc !== 'All' && amb !== "All") {
            axios.get('http://localhost:1212/v1/app/venue/locamb?amb=' + amb + '&loc=' + loc).then((response) => {
                this.setState({ venues: response.data.data });
            });
        }

    }
    handleChangeCapacity = (selectedCapacity) => {
        this.setState({ selectedCapacity }, this.checkCapacity);
    }
    checkCapacity = () => {
        console.log(this.state.selectedCapacity);
    }

    setData = (dat) => {
        if (localStorage.getItem('keyVenue') == dat.idVenue && localStorage.getItem('greyVenue') == 'true') {
            localStorage.removeItem('venue')
            localStorage.removeItem('keyVenue')
            localStorage.setItem('greyVenue', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyVenue')
            localStorage.removeItem('greyVenue')
            localStorage.removeItem('venue')
            localStorage.setItem('keyVenue', dat.idVenue)
            localStorage.setItem('greyVenue', true)
            localStorage.setItem('venue', JSON.stringify(dat))
            this.componentDidMount()
        }
    }
    sortByPriceAsc() {
        this.setState(prevState => {
            this.state.venues.sort((a, b) => (a.priceVenue - b.priceVenue))
        });
    }

    sortByPriceDesc() {
        this.setState(prevState => {
            this.state.venues.sort((a, b) => (b.priceVenue - a.priceVenue))
        });
    }

    searchVenue = (name) => {
        if (name !== "") {
            axios
                .get("http://localhost:1212//v1/app/venue/randomname?nameVenue=" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ venues: data.data })
                    console.log(this.state.venues);
                });
        } else {
            axios
                .get("http://localhost:1212//v1/app/venue/all")
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ venues: data.data }, () => {
                        console.log(this.state.venues);
                    });
                });
        }
    };
    handleChangePrice = (selectedPrice) => {
        this.setState({ selectedPrice });
        console.log(selectedPrice.value);
        if (selectedPrice.value === 'low') {
            this.sortByPriceAsc();
        }
        else {
            this.sortByPriceDesc();
        }
    }
    handleChangeSearch = (event) => {
        this.setState({ search: event.target.value }, () => {
            this.searchVenue(this.state.search);
        });
    };


    render() {
        //this.componentDidMount();
        const { selectedLocation, selectedAmbiance, selectedCapacity, selectedPrice } = this.state;
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Container>
                        <Row style={{ justifyContent: "center" }}>
                            <Col >
                                <FormGroup>
                                    <Input
                                        type="text"
                                        id="search"
                                        name="search"
                                        placeholder="Search..."
                                        onChange={this.handleChangeSearch}
                                        value={this.state.search}
                                    ></Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Select
                                    value={selectedAmbiance}
                                    onChange={this.handleChangeAmbiance}
                                    options={ambiance}
                                    placeholder="Ambiance"
                                />
                            </Col>
                            <Col>
                                <Select
                                    value={selectedLocation}
                                    onChange={this.handleChangeLocation}
                                    options={location}
                                    placeholder="Location"
                                />
                            </Col>
                            <Col>
                                <Select
                                    value={selectedCapacity}
                                    onChange={this.handleChangeCapacity}
                                    options={capacity}
                                    placeholder="Capacity"
                                />
                            </Col>
                            <Col >
                                <Select
                                    value={selectedPrice}
                                    onChange={this.handleChangePrice}
                                    options={price}
                                    placeholder="Sort by price"
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            {
                                this.state.venues ?
                                    this.state.venues.filter(v => ((v.capacity >= this.state.selectedCapacity.value.min) && (v.capacity <= this.state.selectedCapacity.value.max))).map(
                                        // this.state.venues.map(
                                        (venue, index) => (
                                            <Col lg="3" md="6" sm="12" key={venue.idVenue} style={{ display: "inline-grid" }}>
                                                <Card className="card-hover-shadow-2x mb-3">
                                                    <img className="d-block"
                                                        src={`http://localhost:1212/v1/app/downloadFile/${venue.imageVenue}`} alt={venue.nameVenue}
                                                        style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                                    <CardBody>
                                                        <h5 className='text-center' style={{ fontWeight: "500" }}>{venue.nameVenue}</h5>
                                                        <hr />
                                                        <p className='text-center'>
                                                            <i className="nav-link-icon lnr-map-marker icon-gradient bg-slick-carbon "> </i>
                                                            <span>{venue.location}</span></p>
                                                        <p className='text-center'>{venue.ambiance} </p>
                                                        <p className='text-center'>{venue.capacity} People</p>
                                                        <p className='text-center'>{venue.detailVenue}</p>
                                                    </CardBody>
                                                    <CardFooter className="d-block">
                                                        <div>
                                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                                <CurrencyFormat value={venue.priceVenue} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                            </span>
                                                            <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setData(venue)}>
                                                                <FontAwesomeIcon icon={faHeart} color={venue.idVenue == parseInt(localStorage.getItem('keyVenue')) ? "red" : "grey"} size="lg" />
                                                            </Button>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        )
                                    )
                                    : ""
                            }
                        </Row>
                    </Container>
                </CSSTransitionGroup>
                <br />
                <br />
            </Fragment>
        );
    }
}


export default CardsAdvanced;