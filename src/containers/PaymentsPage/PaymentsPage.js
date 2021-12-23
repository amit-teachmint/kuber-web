import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import "../../assets/styles/payments.scss";
import logo from "../../assets/images/common/teachmint-logo.svg";

import Loader from "../common/Loader/Loader";
import { useParams } from "react-router";
import InvalidLinkPage from "./InvalidLinkPage";
import PaymentSuccess from "./PaymentSuccess";
import { useEffect } from "react";
export default function PaymentsPage() {
    const [userData, setUserData] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [status, setStatus] = useState("NOT_INTI");
    const [linkInvalid, setLinkInvalid] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const { showInvalidLink } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { order_id: orderId } = useParams();

    useEffect(() => {}, []);

    return (
        <>
            <div className="payment-main">
                <Loader show={showLoading} />
                <div className="py-nav">
                    <img src={logo} alt="teachmint"></img>
                </div>
                {linkInvalid ? (
                    <InvalidLinkPage />
                ) : status === "SUCCESS" ? (
                    <PaymentSuccess />
                ) : (
                    <div className="py-body">
                        <div className="py-paybox ">
                            <div className="py-paybox-nav ">
                                <div className="py-paybox-det">
                                    <div className="insti-name">
                                        {userData && userData.institute_name
                                            ? userData.institute_name
                                            : "Fee Deatils"}
                                    </div>
                                    <div className="teacher-name">
                                        {userData && userData.teacher_name}
                                    </div>
                                </div>
                                <a
                                    href={`tel:${
                                        userData && userData.teacher_number
                                    }`}
                                >
                                    <div className="py-call-btn ">
                                        {/* <img src={callIcon}></img> */}
                                    </div>
                                </a>
                            </div>
                            <div className="py-paybox-pay-cont">
                                <div className="py-paybox-pay">
                                    <div className="tm-para2">
                                        Requested on:{" "}
                                        {/* {moment(
                                            userData
                                                ? userData.creationTime * 1000
                                                : 0
                                        ).format("LL")} */}
                                    </div>
                                    <div className="py-amount">
                                        &#x20b9; {userData && userData.amount}
                                    </div>
                                    {status === "PENDING" ? (
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
                                            {status === "RETRY" && (
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
                                                {/* <img
                                                    src={secureIcon}
                                                    alt="secure"
                                                ></img> */}
                                                &nbsp;
                                                <span className="tm-para2">
                                                    Safe and secure payments
                                                </span>
                                            </div>
                                            <div
                                                className="tm-btn1-blue py-pay-btn"
                                                onClick={() => {
                                                    // getToken();
                                                }}
                                            >
                                                Pay &#x20b9;
                                                {userData && userData.amount}
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
                                    {/* <img src={callIconGreen} alt="call"></img> */}
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
                                    {/* <img src={whatsapp} alt="call"></img> */}
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
                    {/* <img src={rajkumarRao} alt="Rajkumar Rao"></img> */}
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
        </>
    );
}
