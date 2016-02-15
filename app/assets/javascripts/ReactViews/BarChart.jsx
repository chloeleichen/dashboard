import React from 'react';
import c3 from 'c3';

const BarChart = React.createClass({
    // this._element is updated by the ref callback attribute, https://facebook.github.io/react/docs/more-about-refs.html
    _element: undefined,

    _barChart: undefined,

    _renderChart(data){
        this._barChart = c3.generate({
            bindto: this._element,
            data: {
                columns: [],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
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
            this._barChart.load(this.props.data);
        }
    },

    componentDidUpdate() {
        this._barChart.load(this.props.data);
    },


    componentWillUnmount() {
        this._barChart.destroy();
    },

    render() {
        return (
            <div className={this.props.classNames} ref={element=>{this._element = element;}}></div>
        );
    }
});

module.exports = BarChart;
