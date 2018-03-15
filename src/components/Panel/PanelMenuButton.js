import React, { Component } from 'react';
import PanelTypes from './PanelTypes';
import propTypes from 'prop-types';


/**
 * Button component for the Panel navigation bar.
 * The button shows a dropdown of all available 
 * components that the panel can display. 
 */
class PanelButtonMenu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            activeComponent: this.props.Contents,
            orientation: 'vertical'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({ activeComponent: event.target.value });
        this.props.MenuUpdate(event.target.value);
    }

    render()
    {
        const dropdown = Object.keys(PanelTypes).map(
            (val, i) => {
                return(
                    <option key={i} value={val}>{val}</option>
                )
            }
        )

        return(
            <div className="panelButtonMenu">
                <select 
                    onChange={ this.handleChange }
                    value={ this.state.activeComponent }
                >
                    { dropdown }
                </select>
            </div>
        )
    }
}


/**  Prop Types  */
PanelButtonMenu.propTypes = {
    MenuUpdate: propTypes.func.isRequired,
    Contents: propTypes.string.isRequired,
}


export default PanelButtonMenu;