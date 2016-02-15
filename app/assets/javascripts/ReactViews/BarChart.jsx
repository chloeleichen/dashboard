var BarChart = React.createClass({
  propTypes: {
    barData: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this.update();
  },

  componentDidUpdate: function() {
    this.update();
  },

  update: function() {
    var colours = this.props.barData.colours.sort(function(a, b) { return a.min_value - b.min_value; });
    var colourScale = d3.scale.threshold()
      .domain(colours.filter(function(d) { return d.min_value; }).map(function(d) { return d.min_value; }))
      .range(colours.map(function(d) { return d.colour; }));
    var data = this.props.barData.value;

    var xFormat = d3.time.format.iso;
    data.forEach(function(datum) {
      datum[0] = xFormat.parse(datum[0]);
    });

    var barChart = BarChartGenerator().colour(colourScale).autoWidth(true).height(35);

    if(this.props.maxY) {
      barChart.yDomain([0, this.props.maxY]);
    }

    d3.select(this.refs.svg.getDOMNode()).datum(data).call(barChart);
  },

  render: function() {
    return (
      <svg ref="svg" />
    );
  }
});

module.exports = BarChart;
