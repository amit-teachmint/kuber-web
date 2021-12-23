export default function InvalidLinkPage() {
    return (
        <div className="py-body">
            <div className="py-success-box">
                <div className="py-success">
                    {/* <img src={errorImg} alt="error"></img> */}
                    <div style={{ color: "#FF5E5E" }}>
                        This link has expired!
                    </div>
                </div>
            </div>
        </div>
    );
}
