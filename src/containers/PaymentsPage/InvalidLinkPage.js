export default function InvalidLinkPage({ msg }) {
    return (
        <div className="py-body">
            <div className="py-success-box">
                <div className="py-success">
                    {/* <img src={errorImg} alt="error"></img> */}
                    <div style={{ color: "#FF5E5E" }}>{msg}</div>
                </div>
            </div>
        </div>
    );
}
