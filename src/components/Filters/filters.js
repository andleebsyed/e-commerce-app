import { useEcom } from "../ecom-context/ecom-context";
import "./filters.css";
import "../Sort/Sort.css";
// just a check
import { useState } from "react";
export function Filters() {
  const { dispatch } = useEcom();
  const [isVisible, setVisible] = useState("none");
  return (
    <div className="filters-main-outer">
      <div className="container-of-sort-and-filter">
        <div className="sort-container">
          <div className="sort-box">
            <small>
              <i className="material-icons">sort</i> Sort by :{" "}
            </small>
            <select
              className="drop-down-box"
              name="cars"
              id="cars"
              defaultValue="relevant"
              onChange={(event) => dispatch({ type: "SORT", payload: event })}
            >
              <option value="relevant" disabled hidden>
                Relevance
              </option>
              <option value="low_to_high">Low to High</option>
              <option value="high_to_low">High to Low</option>
            </select>
          </div>
        </div>
        <div className="main-of-filters">
          <button
            className="filter-button"
            onClick={() =>
              isVisible === "inline" ? setVisible("none") : setVisible("inline")
            }
          >
            {" "}
            <i className="material-icons">add</i>Filters
          </button>
        </div>
      </div>
      <div className="filter-container" style={{ display: isVisible }}>
        <ul className="sort-radio-buttons">
          <li>
            <input
              type="checkbox"
              onClick={(event) =>
                dispatch({
                  type: "REMOVE_OUT_OF_STOCK",
                  payload: event.target.checked,
                })
              }
            />
            <label>In Stock</label>
          </li>

          <li>
            <input
              type="checkbox"
              onClick={(event) =>
                dispatch({
                  type: "SHOW_FAST_DELIVERY_ONLY",
                  payload: event.target.checked,
                })
              }
            />
            <label>Fast Delivery</label>
          </li>
          {/* <li>
            <button
              className="clear-button"
              onClick={() => dispatch({ type: "REMOVE_ALL_CONDITIONS" })}
            >
              Clear All
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
