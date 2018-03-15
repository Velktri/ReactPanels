import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Panel from './Panel'
import PanelDivider from './PanelDivider';

function clearTextSelection()
{
    let sel = window.getSelection ? window.getSelection() : document.selection;
    if (sel)
    {
        if (sel.removeAllRanges)
        {
            sel.removeAllRanges(); // Firefox
        }
        else if (sel.empty)
        {
            sel.empty(); // Chrome
        }
    }
}

/** 
 *  This class acts as container and will hold two children
 *  inside of it.  The children can be more panel Containers
 *  or other components.  The panel container class is also 
 *  incharge of controlling the splitter sizes for it's children.
 */
class PanelContainer extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            panelOneSize: [],
            panelTwoSize: [],
            panelRatio: this.props.panelRatio,
            bIsDragging: false,
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    initSubPanelSizes()
    {
        let newPanelOne = [];
        let newPanelTwo = [];
        if (this.props.orientation === 'vertical')
        {
            newPanelOne = [Math.floor(this.props.parentSize[0] * this.state.panelRatio), this.props.parentSize[1]];
            newPanelTwo = [this.props.parentSize[0] - newPanelOne[0], this.props.parentSize[1]];
        }
        else
        {
            newPanelOne = [this.props.parentSize[0], Math.floor(this.props.parentSize[1] * this.state.panelRatio)];
            newPanelTwo = [this.props.parentSize[0], this.props.parentSize[1] - newPanelOne[1]];
        }

        this.setState({ panelOneSize: newPanelOne, panelTwoSize: newPanelTwo });
    }

    updatePanelSizes(bIsOne)
    {
        let currentPanelSize = (bIsOne) ? this.state.panelOneSize : this.state.panelTwoSize;
        let newPanelSize = [];
        if (this.props.orientation === 'vertical')
        {
            newPanelSize = [(currentPanelSize[0]) - this.props.dividerSize, currentPanelSize[1]];
        }
        else
        {
            newPanelSize = [currentPanelSize[0], (currentPanelSize[1]) - this.props.dividerSize];
        }

        return newPanelSize;
    }

    componentWillReceiveProps(newProps)
    {
        this.initSubPanelSizes();
    }

    componentWillMount() 
    {
        this.initSubPanelSizes();
    }

    componentDidMount()
    {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount()
    {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(event)
    {
        clearTextSelection();
        this.setState({bIsDragging: true});
    }

    onMouseUp(event)
    {
        this.setState({bIsDragging: false});
    }

    onMouseMove(event)
    {
        if (this.state.bIsDragging && this.isWithinBounds([event.movementX, event.movementY]))
        {
            clearTextSelection();
            let positionDelta = [event.movementX, event.movementY];
            if (this.props.orientation === 'vertical')
            {
                this.setState({ panelOneSize: [this.state.panelOneSize[0] + positionDelta[0], this.state.panelOneSize[1]],
                                panelTwoSize: [this.state.panelTwoSize[0] - positionDelta[0], this.state.panelTwoSize[1]],
                                panelRatio: ((this.state.panelOneSize[0] + positionDelta[0]) / this.props.parentSize[0])
                });
            }
            else
            {
                this.setState({ panelOneSize: [this.state.panelOneSize[0], this.state.panelOneSize[1] + positionDelta[1]],
                                panelTwoSize: [this.state.panelTwoSize[0], this.state.panelTwoSize[1] - positionDelta[1]],
                                panelRatio: ((this.state.panelOneSize[1] + positionDelta[1]) / this.props.parentSize[1])
                });
            }
        }
    }

    isWithinBounds(positionDelta)
    {
        let index = (this.props.orientation === 'vertical') ? 0 : 1;
        return  (this.state.panelOneSize[index] + positionDelta[index] > this.props.minPanelSize) && 
                (this.state.panelTwoSize[index] - positionDelta[index] > this.props.minPanelSize) &&
                ((this.state.panelOneSize[index] + this.state.panelTwoSize[index]) > this.props.minPanelSize);
    }

    buildPanel(childArray, bIsOne)
    {
        let NewPanel = null;
        if (childArray.Component === 'Container')
        {
            NewPanel =  <PanelContainer 
                            orientation = { childArray.orientation }
                            panelSplit = { 0.5 }
                            parentSize = { this.updatePanelSizes(bIsOne) }
                            children = { childArray.children }
                            dividerSize = { this.props.dividerSize }
                        />
        }
        else
        {
            NewPanel =  <Panel 
                            PanelComponent = { childArray.Component }
                            panelSize = { this.updatePanelSizes(bIsOne) }
                        />
        }

        return NewPanel;
    }

    render()
    {
        let containerStyles = {};
        let dividerStyle = {};
        if (this.props.orientation === 'vertical')
        {
            containerStyles = {
                flexDirection: 'row',
                left: 0,
                right: 0,
                display: 'flex',
                height: this.props.parentSize[1],
            };

            dividerStyle = {
                height: "100%",
                width: this.props.dividerSize * 2,
            };
        }
        else
        {
            containerStyles = {
                flexDirection: 'column',
                bottom: 0,
                top: 0,
                width: this.props.parentSize[0],
            };

            dividerStyle = {
                width: "100%",
                height: this.props.dividerSize * 2,
            };
        }

        const PanelOne = this.buildPanel(this.props.children[0], true);
        const PanelTwo = this.buildPanel(this.props.children[1], false);

        const classes = ['panelDivider', this.props.orientation];
        return (
            <div className="panelContainer" style={containerStyles}>

                { PanelOne }

                <PanelDivider 
                    className= { classes.join(' ') }
                    style={ dividerStyle }
                    onMouseDown = { this.onMouseDown }
                    onMouseUp = { this.onMouseUp }
                />

                { PanelTwo }
            </div>
        )
    }
}


/**  Prop Types  */
PanelContainer.propsTypes = {
    children: propsTypes.arrayOf(propsTypes.object).isRequired,
    dividerSize: propsTypes.number.isRequired,
    orientation: propsTypes.oneOf(['vertical', 'horizontal']).isRequired,
    parentSize: propsTypes.arrayOf(propsTypes.number).isRequired,
    panelRatio: propsTypes.number,
    minPanelSize: propsTypes.number,
}

PanelContainer.defaultProps = {
    panelRatio: 0.5,
    minPanelSize: 10,
}



export default PanelContainer;