import React from "react";
import "./payment.scss";
import callIcon from "../components/callBlue.svg";
import secureIcon from "../components/secureGreen.svg";
import rajkumarRao from "../components/rajkumarRao.svg";
import callIconGreen from "../components/callGreen.svg";
import whatsapp from "../components/dashboard/whatsapp.svg";
import logo from "../components/logo-teach1.svg";
import Gateway from "./components/gateway";
import axios from "axios";
import successImg from "../components/paymentSuccess.svg";
import errorImg from "../components/errorImg.svg";
// import FunGateway from "./components/funGateway";
import { api } from "../constants/envVariables";
import Loader from "../components/Loader/loader";
import moment from "moment";

const headers = {
    Accept: "application/json",
};

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gateway: false,
            teacher_data: null,
            payment_info: null,
            status: "NOT_INTI",
            link_invalid: false,
            showLoading: false,
        };
    }
    getToken = () => {
        this.setState({ showLoading: true });
        let params = new FormData();
        params.append(
            "uuid",
            this.props.match.params && this.props.match.params.id
        );
        axios({
            method: "POST",
            url: `${api}get/payment/link/token`,
            headers: {
                Accept: "application/json",
                authkey: "F15C74E5411A1D11666B1AE548E6B",
            },
            data: params,
        })
            .then((response) => {
                this.setState({
                    payment_info: response.data && response.data.obj,
                    gateway: true,
                });
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({ showLoading: false });
            });
    };
    getDetails = () => {
        this.setState({ showLoading: true });
        let params = new URLSearchParams();
        params.append(
            "uuid",
            this.props.match.params && this.props.match.params.id
        );
        axios({
            method: "GET",
            url: `${api}get/fee_entry/details`,
            headers: {
                Accept: "application/json",
                authkey: "F15C74E5411A1D11666B1AE548E6B",
            },
            params,
        })
            .then((response) => {
                if (response && response.data && response.data.status) {
                    let data = response.data.obj;
                    let status = null;
                    if (data.status === "NOT_INIT") {
                        status = "NOT_INIT";
                    } else if (
                        data.status === "INCOMPLETE" ||
                        data.status === "FAILED" ||
                        data.status === "TRY_AGAIN"
                    ) {
                        status = "RETRY";
                    } else if (
                        data.status === "SUCCESS" ||
                        data.status === "ALREADY_PAID"
                    ) {
                        status = "SUCCESS";
                    } else status = "PENDING";
                    this.setState({
                        teacher_data: response.data.obj,
                        status: status,
                    });
                } else {
                    this.setState({ link_invalid: true });
                }
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({ showLoading: false });
            });
    };

    componentDidMount = () => {
        this.getDetails();
    };
    render() {
        return this.state.gateway ? (
            <Gateway
                payment_info={this.state.payment_info}
                uid={this.props.match.params && this.props.match.params.id}
            />
        ) : (
            <div className="payment-main">
                <Loader show={this.state.showLoading} />
                <div className="py-nav">
                    <img src={logo} alt="teahcmint"></img>
                </div>
                {this.state.link_invalid ? (
                    <div className="py-body">
                        <div className="py-success-box">
                            <div className="py-success">
                                <img src={errorImg} alt="error"></img>
                                <div style={{ color: "#FF5E5E" }}>
                                    This link has expired!
                                </div>
                            </div>
                        </div>
                    </div>
                ) : this.state.status === "SUCCESS" ? (
                    <div className="py-body">
                        <div className="py-success-box">
                            <div className="py-success">
                                <img src={successImg} alt="success"></img>
                                <div>Payment Successful!</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-body">
                        <div className="py-paybox ">
                            <div className="py-paybox-nav ">
                                <div className="py-paybox-det">
                                    <div className="insti-name">
                                        {this.state.teacher_data &&
                                        this.state.teacher_data.institute_name
                                            ? this.state.teacher_data
                                                  .institute_name
                                            : "Fee Deatils"}
                                    </div>
                                    <div className="teacher-name">
                                        {this.state.teacher_data &&
                                            this.state.teacher_data
                                                .teacher_name}
                                    </div>
                                </div>
                                <a
                                    href={`tel:${
                                        this.state.teacher_data &&
                                        this.state.teacher_data.teacher_number
                                    }`}
                                >
                                    <div className="py-call-btn ">
                                        <img src={callIcon}></img>
                                    </div>
                                </a>
                            </div>
                            <div className="py-paybox-pay-cont">
                                <div className="py-paybox-pay">
                                    <div className="tm-para2">
                                        Requested on:{" "}
                                        {moment(
                                            this.state.teacher_data
                                                ? this.state.teacher_data.c *
                                                      1000
                                                : 0
                                        ).format("LL")}
                                    </div>
                                    <div className="py-amount">
                                        &#x20b9;{" "}
                                        {this.state.teacher_data &&
                                            this.state.teacher_data.amount}
                                    </div>
                                    {this.state.status === "PENDING" ? (
                                        <div className="py-processing-box">
                                            <div>Payment processing!</div>

                                            <div
                                                className="tm-para3"
                                                style={{ marginTop: "1rem" }}
                                            >
                                                It may take up to 3 days to
                                                process
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {this.state.status === "RETRY" && (
                                                <div className="py-processing-box">
                                                    <div
                                                        style={{
                                                            color: "#FF5E5E",
                                                        }}
                                                    >
                                                        Payment failed!
                                                    </div>
                                                </div>
                                            )}
                                            <div className="py-secure">
                                                <img
                                                    src={secureIcon}
                                                    alt="secure"
                                                ></img>
                                                &nbsp;
                                                <span className="tm-para2">
                                                    Safe and secure payments
                                                </span>
                                            </div>
                                            <div
                                                className="tm-btn1-blue py-pay-btn"
                                                onClick={() => {
                                                    this.getToken();
                                                }}
                                            >
                                                Pay &#x20b9;
                                                {this.state.teacher_data &&
                                                    this.state.teacher_data
                                                        .amount}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="py-cntct-box">
                            <div className="py-cntct-title">
                                In case of any payment related issues
                            </div>
                            <div className="py-cntct-numb ">
                                <div className="py-call-numb">
                                    <img src={callIconGreen} alt="call"></img>
                                    &nbsp;&nbsp;&nbsp; 8048363966{" "}
                                    <span
                                        className="py-call-opt "
                                        onClick={() => {
                                            window.open(
                                                `tel:${8048363966}`,
                                                "_blank"
                                            );
                                        }}
                                    >
                                        Call Teachmint
                                    </span>
                                </div>
                                <div className="py-call-numb">
                                    <img src={whatsapp} alt="call"></img>
                                    &nbsp;&nbsp; 8867703410
                                    <span
                                        className="py-call-opt "
                                        onClick={() =>
                                            window.open(
                                                `https://wa.me/918867703410`,
                                                "_blank"
                                            )
                                        }
                                    >
                                        Chat with Teachmint
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="py-btm-bar">
                    <img src={rajkumarRao} alt="Rajkumar Rao"></img>
                    <div className="py-btm-dwl">
                        <div className="tm-para1 tm-color-text-primary py-install-txt">
                            Start using Teachmint - Free <br /> live teaching
                            app
                        </div>
                        <div
                            className="tm-btn2-white-blue"
                            style={{
                                width: "10rem",
                                backgroundColor: "rgba(29, 161, 242, 0.1)",
                            }}
                            onClick={() =>
                                window.open(
                                    "https://play.google.com/store/apps/details?id=com.teachmint.teachmint&referrer=utm_source%3Dwebsite%26utm_medium%3Dorganic"
                                )
                            }
                        >
                            Install Now
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
