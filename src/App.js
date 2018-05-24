import React, { Component } from 'react';
import './App.css';
import Measure from 'react-measure';
import interact from 'interactjs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        sidebar: {
          width: 0,
          height: 0
        },

        upperPane: {
          width: 0,
          height: 0
        },

        lowerPane: {
          width: 0,
          height: 0
        },
    }
  }

  componentDidMount() {
    interact('.sidebar').resizable({
      edges: { left: false, right: true, bottom: false, top: false},

      restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },

      // minimum size
      restrictSize: {
        min: { width: 150 },
        max: { width: 500 },
      },

      inertia: false,

    }).on('resizemove', event => {
      event.target.style.width = (Math.round(event.rect.width)) + 'px';
    });

    interact('.upper-pane').resizable({
      edges: { left: false, right: false, bottom: true, top: false},

      restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },

      // minimum size
      restrictSize: {
        min: { height: 150 },
        max: { height: 700 },
      },

      inertia: false,

    }).on('resizemove', event => {
      event.target.style.height = (Math.round(event.rect.height)) + 'px';
    });
  }

  render() {
    const {sidebar, upperPane, lowerPane} = this.state;

    return (
      <div className="wrapper">
        <div className="header"><h2>Hello world!</h2></div>
        <div className="content">
            <Measure bounds onResize={(rect) => { this.setState({ sidebar: rect.bounds }) }}>
              {({ measureRef }) =>
                <div ref={measureRef} className="sidebar">{Math.round(sidebar.width)}x{Math.round(sidebar.height)}</div>
              }
            </Measure>

            <div className="main-part">
                <Measure bounds onResize={(rect) => { this.setState({ upperPane: rect.bounds }) }}>
                  {({ measureRef }) =>
                    <div ref={measureRef} className="upper-pane">{Math.round(upperPane.width)}x{Math.round(upperPane.height)}</div>
                  }
                </Measure>

                <Measure bounds onResize={(rect) => { this.setState({ lowerPane: rect.bounds }) }}>
                  {({ measureRef }) =>
                    <div ref={measureRef} className="lower-pane">{Math.round(lowerPane.width)}x{Math.round(lowerPane.height)}</div>
                  }
                </Measure>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
