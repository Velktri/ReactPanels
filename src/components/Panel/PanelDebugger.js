import React from 'react';
import propTypes from 'prop-types';

/**
 * Diplay component used to show information about
 * the parent panel.
 */
var PanelDebugger = (props) => {
    return(
        <div>
            Panel Width: {props.panelWidth} <br />
            Panel Height: {props.panelHeight}
        </div>
    )
}


/**  Prop Types  */
PanelDebugger.propTypes = {
    panelHeight: propTypes.number.isRequired,
    panelWidth: propTypes.number.isRequired,
}



export default PanelDebugger;