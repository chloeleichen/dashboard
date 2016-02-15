import React from 'react';
import c3 from 'c3';

const PieChart = React.createClass({
    // this._element is updated by the ref callback attribute, https://facebook.github.io/react/docs/more-about-refs.html
    _element: undefined,

    _pieChart: undefined,

    _renderChart(data) {
        this._pieChart = c3.generate({
            bindto: this._element,
            data: {
                columns: [],
                type: 'pie',
                onclick: (d, i)=>{ console.log("onclick"); },
                onmouseover: (d, i)=>{ console.log("onmouseover"); },
                onmouseout: (d, i)=>{ console.log("onmouseout"); }
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
            this._pieChart.load(this.props.data);
        }
    },

    componentDidUpdate() {
        this._pieChart.load(this.props.data);
    },

    componentWillUnmount() {
        this._pieChart.destroy();
    },

    render() {
        return (
            <div className={this.props.classNames} ref={element=>{this._element = element;}}></div>
        );
    }
});

module.exports = PieChart;
