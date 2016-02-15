import React from 'react';
import c3 from 'c3';

const DonutChart = React.createClass({
    // this._element is updated by the ref callback attribute, https://facebook.github.io/react/docs/more-about-refs.html
    _element: undefined,

    _donutChart: undefined,

    _renderChart(data) {
        this._donutChart = c3.generate({
            bindto: this._element,
            data: {
                columns: [],
                type : 'donut',
                onclick: (d, i)=>{ console.log("onclick"); },
                onmouseover: (d, i)=>{ console.log("onmouseover"); },
                onmouseout: (d, i)=>{ console.log("onmouseout"); }
            },
            donut: {
                title: "dummy donut"
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
            this._donutChart.load(this.props.data);
        }
    },

    componentDidUpdate() {
        this._donutChart.load(this.props.data);
    },

    componentWillUnmount() {
        this._donutChart.destroy();
    },

    render() {
        return (
            <div className={this.props.classNames} ref={element=>{this._element = element;}}></div>
        );
    }
});

module.exports = DonutChart;
