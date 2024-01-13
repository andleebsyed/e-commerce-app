import './Loader.css'
export function Loader({ loader }) {
    let visibilityStatus;
    if (loader === true) {
        visibilityStatus = 'flex'
    }
    else {
        visibilityStatus = 'none'
    }
    return (
        <div className="overlay" style={{ display: visibilityStatus }}>
            <div className="loader" >
                <span className="first-span"></span>
                <span className="second-span"></span>
                <span className="third-span"></span>
            </div>
        </div>

    )

}