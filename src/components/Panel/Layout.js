import React, { Component } from 'react';
import propTypes from 'prop-types';
import PanelContainer from './PanelContainer';

/**
 *  The layout component holds all the
 *  panels components indside of itself.
 *  A tree structure is held to represent 
 *  how the UI will be rendered.
*/
class Layout extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            layoutTree: { Component: '',
                          orientation: '',
                          children: null,
                        },
        }
    }

    componentWillMount()
    {
        this.getLayout();
    }

    getLayout()
    {
        var NewLayout = {
            Component: 'Container',   // non-leaf node
            orientation: 'horizontal',
            children: [
                {
                    Component: 'Debugger',   // leaf node
                },
                {
                    Component: 'Container',   // non-leaf node
                    orientation: 'vertical',
                    children: [
                        {
                            Component: 'Debugger',   // leaf node
                        },
                        {
                            Component: 'Container',   // leaf node
                            orientation: 'horizontal',
                            children: [
                                {
                                    Component: 'Debugger'
                                },
                                {
                                    Component: 'Debugger'
                                }
                            ]
                        },
                    ]
                }
            ]
        }

        var LayoutJSON = {
            "Component": "Container",
            "orientation": "horizontal",
            "children": [
                {
                    "Component": "Debugger"
                },
                {
                    "Component": "Container",
                    "orientation": "vertical",
                    "children": [
                        {
                            "Component": "Debugger"
                        },
                        {
                            "Component": "Container",
                            "orientation": "horizontal",
                            "children": [
                                {
                                    "Component": "Debugger"
                                },
                                {
                                    "Component": "Debugger"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        //var jsonObject = JSON.parse(LayoutJSON);
        console.log(LayoutJSON);
        console.log(' ');
        console.log(NewLayout);

        this.setState({ layoutTree: NewLayout });
    }

    render() 
    {
        var layoutStyles = {
            width: this.props.panelSize[0],
            height: this.props.panelSize[1],
        };

        return(
            <div className="layout" style={ layoutStyles }>
                <PanelContainer 
                    orientation = { this.state.layoutTree.orientation }
                    parentSize = { this.props.panelSize }
                    children = { this.state.layoutTree.children }
                    dividerSize = { this.props.dividerSize }
                />
            </div>

        )
    }
}

Layout.propTypes = {
    panelSize: propTypes.arrayOf(propTypes.number).isRequired,
    dividerSize: propTypes.number,
}

Layout.defaultProps = {
    dividerSize: 2,
}

export default Layout;