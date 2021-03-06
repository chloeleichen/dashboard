import React from 'react';
import c3 from 'c3';

const LineChart = React.createClass({
    // this._element is updated by the ref callback attribute, https://facebook.github.io/react/docs/more-about-refs.html
    _element: undefined,

    _lineChart: undefined,

    _renderChart(data) {
        this._lineChart = c3.generate({
            bindto: this._element,
            data: {
                columns: []
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
            this._lineChart.load(this.props.data);
        }
    },

    componentDidUpdate() {
        this._lineChart.load(this.props.data);
    },

    componentWillUnmount() {
        this._lineChart.destroy();
    },

    render() {
        return (
            <div className={this.props.classNames} ref={element=>{this._element = element;}}></div>
        );
    }
});

module.exports = LineChart;
