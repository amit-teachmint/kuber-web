import React from "react";
import "./loader.scss";

export default class Loader extends React.Component {
    render() {
        return this.props.show ? (
            <div
                className="deleteModal"
                style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    zIndex: "10000000000",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="loader" />
            </div>
        ) : null;
    }
}
