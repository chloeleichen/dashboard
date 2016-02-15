import React from 'react';
import c3 from 'c3';

const GaugeChart = React.createClass({
    // this._element is updated by the ref callback attribute, https://facebook.github.io/react/docs/more-about-refs.html
    _element: undefined,

    _gaugeChart: undefined,

    _renderChart(data) {
        this._gaugeChart = c3.generate({
            bindto: this._element,
            data: {
                columns: [],
                type: 'gauge',
                onclick: (d, i)=>{ console.log("onclick", d, i); },
                onmouseover: (d, i)=>{ console.log("onmouseover", d, i); },
                onmouseout: (d, i)=>{ console.log("onmouseout", d, i); }
            }
          });
    },

    propTypes: {
        colors: React.PropTypes.array,
        data: React.PropTypes.object,
        height: React.PropTypes.number
    },

    componentDidMount() {
        this._renderChart();
        if (this.props.data) {
            this._gaugeChart.load(this.props.data);
        }
    },

    componentDidUpdate() {
        this._gaugeChart.load(this.props.data);
    },

    componentWillUnmount() {
        this._gaugeChart.destroy();
    },

    render() {
        return (
            <div className={this.props.classNames} ref={element=>{this._element = element;}}></div>
        );
    }
});

module.exports = GaugeChart;
