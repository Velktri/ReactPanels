import React, { Component } from 'react';
import propTypes from 'prop-types';
import PanelHeader from './PanelHeader';
import PanelTypes from './PanelTypes';


/**
 * Panel class holds the components that will be
 * displayed on the page.  The class also holds an
 * optional header component that can be used to 
 * display a navigation bar for the component.
 */
class Panel extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            contents: props.PanelComponent,
        }

        this.updateMenu = this.updateMenu.bind(this);
    }

    updateMenu(newMenu)
    {
        this.setState({ contents: newMenu })
    }

    render()
    {
        var panelStyle = {
            width: this.props.panelSize[0],
            height: this.props.panelSize[1] - 30,
        };

        const ComponentContent = PanelTypes[this.state.contents];
        return (
            <div className="panel">
                <PanelHeader 
                    MenuUpdate={ this.updateMenu }
                    Contents= { this.state.contents }
                />

                <div className="panelContent" style= {panelStyle}>
                    <ComponentContent 
                        panelWidth = { this.props.panelSize[0] }
                        panelHeight = { this.props.panelSize[1] }
                    />
                </div>
            </div>
        )
    }
}


/**  Prop Types  */
Panel.propTypes = {
    PanelComponent: propTypes.string.isRequired,
    panelSize: propTypes.arrayOf(propTypes.number).isRequired,
}



export default Panel;