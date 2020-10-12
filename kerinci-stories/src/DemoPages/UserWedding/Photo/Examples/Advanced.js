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
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import image from '../../../../assets/utils/images/emptysearchlogo.png'
const theme = [
    { value: "All", label: 'All' },
    { value: 'Indoor', label: 'Indoor' },
    { value: 'Outdoor', label: 'Outdoor' }
];

const price = [
    { value: 'low', label: 'Lowest price' },
    { value: 'high', label: 'Highest price' }
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
            selectedTheme: null,
            selectedPrice: null,
            photos: [],
            key: 0,
            grey: false
        };
        this.handleChangeTheme = this.handleChangeTheme.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.searchPhoto = this.searchPhoto.bind(this);
        this.setData = this.setData.bind(this);
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/photo&video/alldata").then((response) => {
            this.setState({ photos: response.data.data });
        });

    }

    handleChangeTheme = (selectedTheme) => {
        this.setState({ selectedTheme });
        //console.log(this.state.selectedTheme);
        console.log(selectedTheme.value);
        if (selectedTheme.value === 'All') {
            axios.get("http://localhost:1212/v1/app/photo&video/alldata").then((response) => {
                this.setState({ photos: response.data.data });
            });
        }
        else {
            axios.get("http://localhost:1212/v1/app/photo&video/theme/" + selectedTheme.value).then((response) => {
                this.setState({ photos: response.data.data });
            });
        }
    }

    sortByPriceAsc() {
        this.setState(prevState => {
            this.state.photos.sort((a, b) => (a.pricePhoto - b.pricePhoto))
        });
    }

    sortByPriceDesc() {
        this.setState(prevState => {
            this.state.photos.sort((a, b) => (b.pricePhoto - a.pricePhoto))
        });
    }

    searchPhoto = (name) => {
        if (name !== "") {
            axios
                .get("http://localhost:1212//v1/app/photo&video/randomname?namePhoto="+name )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ photos: data.data });
                });
        } else {
            axios
                .get("http://localhost:1212//v1/app/photo&video/alldata")
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ photos: data.data }, () => {
                        //console.log(this.state.photos);
                    });
                });
        }
    };

    handleChangePrice = (selectedPrice) => {
        this.setState({ selectedPrice });
        //console.log(selectedPrice.value);
        if (selectedPrice.value === 'low') {
            this.sortByPriceAsc();
        }
        else {
            this.sortByPriceDesc();
        }
    }

    handleChangeSearch = (event) => {
        this.setState({ search: event.target.value }, () => {
            this.searchPhoto(this.state.search);
        });
    };

    setData = (dat) => {
        if (localStorage.getItem('keyPhoto') == dat.idPhoto && localStorage.getItem('greyPhoto') == 'true') {
            localStorage.removeItem('photo')
            localStorage.removeItem('keyPhoto')
            localStorage.setItem('greyPhoto', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyPhoto')
            localStorage.removeItem('greyPhoto')
            localStorage.removeItem('photo')
            localStorage.setItem('keyPhoto', dat.idPhoto)
            localStorage.setItem('greyPhoto', true)
            localStorage.setItem('photo', JSON.stringify(dat))
            this.componentDidMount()
        }
    }

    render() {
        const { selectedTheme, selectedPrice } = this.state;
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
                            <Col lg="3" md="6" sm="12">
                                <FormGroup>
                                    <Input
                                        type="text"
                                        id="search"
                                        name="search"
                                        placeholder="Search..."
                                        onChange={this.handleChangeSearch}
                                        value={this.state.search}
                                        autoComplete="off"
                                    ></Input>
                                </FormGroup>
                            </Col>
                            <Col lg="3" md="6" sm="12">
                                <FormGroup>
                                    <Select
                                        value={selectedTheme}
                                        onChange={this.handleChangeTheme}
                                        options={theme}
                                        placeholder="Select your preference"
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="3" md="6" sm="12">
                                <FormGroup>
                                    <Select
                                        value={selectedPrice}
                                        onChange={this.handleChangePrice}
                                        options={price}
                                        placeholder="Sort by price"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        {this.state.photos.length ?
                            <Row>
                                {
                                    this.state.photos ?
                                        this.state.photos.map(
                                            (photo, index) => (
                                                <Col lg="3" md="6" sm="12" key={index} style={{ display: "inline-grid" }}>
                                                    <Card className="card-hover-shadow-2x mb-3">
                                                        <img className="d-block"
                                                            src={`http://localhost:1212/v1/app/downloadFile/${photo.imagePhoto}`} alt="coba"
                                                            style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                                        <CardBody>
                                                            <h5 className='text-center' style={{ fontWeight: "500" }}>{photo.namePhoto}</h5>
                                                            <hr />
                                                            <p className='text-center'>Theme : {photo.themePhoto} </p>
                                                            <p className='text-center'>{photo.detailPhoto}</p>

                                                        </CardBody>
                                                        <CardFooter className="d-block">
                                                            <div>
                                                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                                    <CurrencyFormat value={photo.pricePhoto} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                                </span>

                                                                <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setData(photo)}>
                                                                    <FontAwesomeIcon icon={faHeart} color={photo.idPhoto == parseInt(localStorage.getItem('keyPhoto')) ? "red" : "grey"} size="lg" />
                                                                </Button>
                                                            </div>
                                                        </CardFooter>
                                                    </Card>
                                                </Col>
                                            )
                                        )
                                        :
                                        ""
                                }
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
        );
    }
}

export default CardsAdvanced;