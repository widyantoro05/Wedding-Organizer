import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Container,
  FormGroup,
  Input,
} from "reactstrap";
import Select from "react-select";
import CurrencyFormat from "react-currency-format";

const style = [
  { value: "All", label: "All" },
  { value: "Padangnese", label: "Padangnese" },
  { value: "Sundanese", label: "Sundanese" },
  { value: "Javanese", label: "Javanese" },
  { value: "Balinese", label: "Balinese" },
  { value: "Western", label: "Western" },
  { value: "MiddleEastern", label: "Middle Eastern" },
];

const portion = [
  { value: { min: 0, max: 100000000 }, label: "All Portion" },
  { value: { min: 0, max: 50 }, label: "0-50" },
  { value: { min: 50, max: 200 }, label: "50-200" },
  { value: { min: 200, max: 500 }, label: "200-500" },
  { value: { min: 500, max: 1000 }, label: "500-1000" },
];

const price = [
  { value: "All", label: "All Price" },
  { value: "low", label: "Lowest price" },
  { value: "high", label: "Highest price" },
];

class CardsAdvanced extends Component {
  constructor(props) {
    super();
    this.state = {
      catering: [],
      search: "",
      showMore: true,
      transform: true,
      showInkBar: true,
      transformWidth: 400,
      key: 0,
      grey: true,
      selectedStyle: null,
      selectedPortion: {
        value: { min: 0, max: 100000000 },
        label: "All Portion",
      },
      selectedPrice: null,
      min: null,
      max: null,
    };

    this.handleChangeStyle = this.handleChangeStyle.bind(this);
    this.handleChangePortion = this.handleChangePortion.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:1212//v1/app/catering")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ catering: data.data }, () => {
          console.log(this.state.catering);
        });
      });
  }

  handleChangeStyle = (selectedStyle) => {
    this.setState({ selectedStyle });
    if (selectedStyle.value === "All") {
      axios.get("http://localhost:1212//v1/app/catering").then((response) => {
        this.setState({ catering: response.data.data });
      });
    } else {
      axios
        .get(
          "http://localhost:1212/v1/app/catering/style/" + selectedStyle.value
        )
        .then((response) => {
          this.setState({ catering: response.data.data });
          console.log(response.data);
        });
    }
  };

  handleChangePortion = (selectedPortion) => {
    this.setState({ selectedPortion }, this.checkPortion);
  };

  checkPortion = () => {
    console.log("ini data porsi", this.state.selectedPortion);
    let min = this.state.selectedPortion.value.min;
    console.log("nilai min", min);
    let max = this.state.selectedPortion.value.max;
    console.log("nilai max", max);
    if (max === 100000000) {
      axios.get("http://localhost:1212//v1/app/catering").then((response) => {
        this.setState({ catering: response.data.data });
      });
    } else {
      axios
        .get(
          `http://localhost:1212//v1/app/catering/betweenportion/${min}/${max}`
        )
        .then((response) => {
          this.setState({ catering: response.data.data });
        });
    }
  };

  sortByPriceAsc() {
    this.setState((prevState) => {
      this.state.catering.sort((a, b) => a.priceCatering - b.priceCatering);
    });
  }

  sortByPriceDesc() {
    this.setState((prevState) => {
      this.state.catering.sort((a, b) => b.priceCatering - a.priceCatering);
    });
  }

  handleChangePrice = (selectedPrice) => {
    this.setState({ selectedPrice });
    console.log(selectedPrice.value);
    if (selectedPrice.value === "low") {
      this.sortByPriceAsc();
    } else {
      this.sortByPriceDesc();
    }
  };

  searchCatering = (name) => {
    if (name !== "") {
      axios
        .get(
          "http://localhost:1212//v1/app/catering/randomname?nameCatering=" +
            name
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({ catering: data.data });
        });
    } else {
      axios
        .get("http://localhost:1212//v1/app/catering")
        .then((response) => response.data)
        .then((data) => {
          this.setState({ catering: data.data }, () => {
            console.log(this.state.catering);
          });
        });
    }
  };

  handleChangeSearch = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.searchCatering(this.state.search);
    });
  };

  setData = (dat) => {
    if (
      localStorage.getItem("keyCatering") == dat.idCatering &&
      localStorage.getItem("greyCatering") == "true"
    ) {
      localStorage.removeItem("catering");
      localStorage.removeItem("keyCatering");
      localStorage.setItem("greyCatering", false);
      this.componentDidMount();
    } else {
      localStorage.removeItem("keyCatering");
      localStorage.removeItem("greyCatering");
      localStorage.removeItem("catering");
      localStorage.setItem("keyCatering", dat.idCatering);
      localStorage.setItem("greyCatering", true);
      localStorage.setItem("catering", JSON.stringify(dat));
      this.componentDidMount();
    }
  };

  render() {
    // this.componentDidMount();
    const { selectedStyle, selectedPortion, selectedPrice } = this.state;
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container>
            <Row>
              <Col md="3">
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
              <Col md="3">
                <Select
                  value={selectedStyle}
                  onChange={this.handleChangeStyle}
                  options={style}
                  placeholder="Select your preference"
                />
              </Col>
              <Col md="3">
                <Select
                  value={selectedPortion}
                  onChange={this.handleChangePortion}
                  options={portion}
                  placeholder="Portion"
                />
              </Col>
              <Col md="3">
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
              {this.state.catering
                ? this.state.catering.map((c, index) => (
                    <Col
                      lg="3"
                      md="6"
                      sm="12"
                      key={index}
                      style={{ display: "inline-grid" }}
                    >
                      <Card className="card-hover-shadow-2x mb-3">
                        <img
                          src={`http://localhost:1212/v1/app/downloadFile/${c.imageCatering}`}
                          alt={c.nameCatering}
                          style={{
                            width: "100%",
                            height: "255px",
                            objectFit: "cover",
                          }}
                        />
                        <CardBody>
                          <h5
                            className="text-center"
                            style={{ fontWeight: "500" }}
                          >
                            {c.nameCatering}
                          </h5>
                          <hr />
                          <p className="text-center">{c.styleCatering}</p>
                          <hr />
                          <p className="text-center">
                            {c.portionCatering} Portions
                          </p>
                          <p className="text-center">{c.detailCatering}</p>
                        </CardBody>
                        <CardFooter className="d-block">
                          <div>
                            <span
                              style={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                              <CurrencyFormat
                                value={c.priceCatering}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR. "}
                              />
                            </span>
                            <Button
                              style={{
                                float: "right",
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                              onClick={() => this.setData(c)}
                            >
                              <FontAwesomeIcon
                                icon={faHeart}
                                color={
                                  c.idCatering ===
                                  parseInt(localStorage.getItem("keyCatering"))
                                    ? "red"
                                    : "grey"
                                }
                                size="lg"
                              />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                  ))
                : ""}
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
