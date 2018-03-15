import React from 'react';
import PanelButtonMenu from './PanelMenuButton';

/**
 * Optional Panel navigation bar used to swap the parent
 * panel's component.
 */
var PanelHeader = (props) => {
    return(
        <div className="panelHeader">
            <PanelButtonMenu 
                MenuUpdate={ props.MenuUpdate }
                Contents = { props.Contents }
            />
        </div>
    );
}

export default PanelHeader;