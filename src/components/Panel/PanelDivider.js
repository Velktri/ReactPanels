import React from 'react';
import propTypes from 'prop-types';

/**
 *  Splitter component that is used to change the
 *  size of the panel container's child components.
 */
var PanelDivider = (props) => {
    return(
        <div 
        className = { props.className }
        style = { props.style }
        onMouseDown = { (event) => props.onMouseDown(event) }
        onMouseUp = { (event) => props.onMouseUp(event) }
        >
        
        </div>
    )
}


/**  Prop Types  */
PanelDivider.propTypes = {
    className: propTypes.string,
    onMouseDown: propTypes.func.isRequired,
    onMouseUp: propTypes.func.isRequired,
    style: propTypes.object,
}


export default PanelDivider;