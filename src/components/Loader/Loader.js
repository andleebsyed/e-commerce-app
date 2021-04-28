import './Loader.css'
export function Loader({ loader }) {
    let visibilityStatus;
    console.log("yahaaa tk to aarahaa hu")
    if (loader === true) {
        visibilityStatus = 'flex'
    }
    else {
        visibilityStatus = 'none'

    }
    console.log("hey see i ran")

    return (
        <div className="loader" style={{ display: visibilityStatus }}>
            <span className="first-span"></span>
            <span className="second-span"></span>
            <span className="third-span"></span>
        </div>
    )

}