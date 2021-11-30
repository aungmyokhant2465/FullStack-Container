import React from 'react'

const FilterPerson = (props) => {
    return (
        <p>
            filter shown with <input value={props.filterName} onChange={props.handlefilterName}/>
        </p>
    )
}

export default FilterPerson