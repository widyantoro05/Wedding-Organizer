import React, {Component, Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,

} from '@fortawesome/free-solid-svg-icons';

import {
    Row, Col,
    Card, CardBody,
    CardFooter,
    Button,Container
} from 'reactstrap';



const style = [
    { value: "All", label: 'All' },
    { value: 'Modern', label: 'Modern' },
    { value: 'Traditional', label: 'Traditional' }
];

const price = [
    { value: "All", label: 'All' },
    { value: 'low', label: 'Lowest price' },
    { value: 'high', label: 'Highest price' }
];
class CardsAdvanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: true,
            transform: true,
            showInkBar: true,
            transformWidth: 400,
            selectedStyle: null,
            selectedPrice: null,
            decor: [],
        };
        this.handleChangeStyle = this.handleChangeStyle.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
    }
    setData = (dat) => {
        if (localStorage.getItem('keyDecor') == dat.idDecor && localStorage.getItem('greyDecor')==='true') {
            localStorage.removeItem('decor')
            localStorage.removeItem('keyDecor')
            localStorage.setItem('greyDecor', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyDecor')
            localStorage.removeItem('greyDecor')
            localStorage.removeItem('decor')
            localStorage.setItem('keyDecor', dat.idDecor)
            localStorage.setItem('greyDecor', true)
            localStorage.setItem('decor', JSON.stringify(dat))
            this.componentDidMount()
        }
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/decor/all").then((response) => {
            this.setState({ decor: response.data.data });
        });

    }

    handleChangeStyle = (selectedStyle) => {
        this.setState({ selectedStyle });
        console.log(selectedStyle.value);
        if (selectedStyle.value==='All'){
            axios.get("http://localhost:1212/v1/app/decor/all").then((response) => {
                this.setState({ decor: response.data.data });
            });
        }
        else {
            axios.get("http://localhost:1212/v1/app/decor/style/" + selectedStyle.value).then((response) => {
                this.setState({ decor: response.data.data });
            });
        }
    }
    sortByPriceAsc() {
        this.setState(prevState => {
          this.state.decor.sort((a, b) => (a.priceDecor - b.priceDecor))
      });
      }

      sortByPriceDesc() {
        this.setState(prevState => {
          this.state.decor.sort((a, b) => (b.priceDecor - a.priceDecor))
      });
      }

    handleChangePrice = (selectedPrice) => {
        this.setState({ selectedPrice });
        console.log(selectedPrice.value);
        if(selectedPrice.value==='low'){
            this.sortByPriceAsc();
        }
        else{
            this.sortByPriceDesc();
        }
    }

    render() {
        const { selectedStyle, selectedPrice
        } = this.state;
        // this.componentDidMount();

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
                        <Row style={{justifyContent:"center"}}>
                            <Col md='3' >
                                <Select
                                    value={selectedStyle}
                                    onChange={this.handleChangeStyle}
                                    options={style}
                                    placeholder="Select your preference"
                                />
                            </Col>
                            <Col md='3' >
                                <Select
                                    value={selectedPrice}
                                    onChange={this.handleChangePrice}
                                    options={price}
                                    placeholder="Sort by price"
                                />
                            </Col>
                        </Row>
                        <br />
                        <br/>
                       
                        <Row>
                            {this.state.decor ?
                                this.state.decor.map((decor, index) => (
                                    <Col lg="3" md="6" sm="12" key={decor.idDecor} style={{ display: "inline-grid" }}>
                                        <Card className="card-hover-shadow-2x mb-3">
                                            <img className="d-block"
                                                src={`http://localhost:1212/v1/app/downloadFile/${decor.imageDecor}`} alt={decor.nameDecor}
                                                style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                            <CardBody>
                                                <h5 className='text-center' style={{ fontWeight: "500" }}>{decor.nameDecor}</h5>
                                                <hr />
                                                <p className='text-center'>Style: {decor.styleDecor}</p>
                                                <p className='text-center'>{decor.detailDecor}</p>
                                            </CardBody>
                                            <CardFooter className="d-block">
                                                <div>
                                                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                        <CurrencyFormat value={decor.priceDecor} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                    </span>
                                                    <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setData(decor)}>
                                                        <FontAwesomeIcon icon={faHeart} color={decor.idDecor == parseInt(localStorage.getItem('keyDecor')) ?"red" : "grey"} size="lg" />
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                )) : ""}
                        </Row>
                    </Container>
                </CSSTransitionGroup>
                <br/>
                <br/>
            </Fragment>
        );
    }
};

export default CardsAdvanced;
