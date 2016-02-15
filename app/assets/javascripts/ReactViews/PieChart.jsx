var PieChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  componentDidMount: function() {
    this.update();
  },

  componentDidUpdate: function() {
    this.update();
  },

  update: function() {
    var pieChart = PieChartGenerator();
    d3.select(this.refs.svg.getDOMNode()).datum(this.props.data).call(pieChart);
  },

  render: function() {
    return (
      <svg ref="svg" />
    );
  }
});

module.exports = PieChart;
