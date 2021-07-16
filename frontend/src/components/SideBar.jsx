import React from 'react';

function SideBar({ setOrdering, setQuery, ordering }) {

    function handleChange(e) {
        setOrdering(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setQuery(document.getElementById("title").value)
    }

    return (
        <div className="side-bar-container p-3">
            <form className="search-input" onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Search"
                    name="title"
                    id="title"
                    className="search-input" />
                <button type="submit">
                    <i className="fas fa-search fa-2x"></i>
                </button>
            </form>
            <div className="filters">
                <h3 className="mt-3">
                    Filters
                    <i className="fas fa-sliders-h"></i>
                </h3>
                <select className="form-select"
                    aria-label="Apply Filter"
                    value={ordering}
                    onChange={handleChange}
                >
                    <option defaultValue="best">Best</option>
                    <option value="month-best">Top(Month)</option>
                    <option value="year-best">Top(Year)</option>
                    <option value="all-time-best">Top(All time)</option>
                </select>
            </div>
        </div>
    )
}

export default SideBar
