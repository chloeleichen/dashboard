var LineChart = React.createClass({
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
    var lineChart = LineChartGenerator().autoWidth(true).height(100);

    var options = this.props.options;

    if("type" in options.horizontal_axis) {
      if(options.horizontal_axis.type === "date" || options.horizontal_axis.type === "datetime") {
        var format;
        if(options.horizontal_axis.type === "date") {
          format = d3.time.format("%Y-%m-%d");
        } else {
          format = d3.time.format.iso;
        }

        lineChart.xAxisFormat(d3.time.format("%d %b '%y"));

        lineChart.x(d3.time.scale());
        this.props.data.forEach(function(line) {
          line.value.forEach(function(point) {
            point[0] = format.parse(point[0]);
          });
        });
      } else {
        UnimplementedCodePath();
      }
    }

    if("always_show_zero" in options.vertical_axis) {
      lineChart.yShowZero(options.vertical_axis.always_show_zero);
    }

    if("lines" in options.display_options) {
      if(options.display_options.lines === "bezier") {
        lineChart.interpolate("cardinal");
      } else if(options.display_options.lines === "straight") {
        lineChart.interpolate("linear");
      } else {
        UnimplementedCodePath();
      }
    }

    if("points" in options.display_options) {
      if(options.display_options.points === "none") {
        lineChart.showPoints(false);
      } else {
        UnimplementedCodePath();
      }
    }

    if("single_graph" in options.display_options) {
      if(!options.display_options.single_graph) {
        UnimplementedCodePath();
      }
    }

    if("shaded" in options.display_options) {
      lineChart.fillArea(options.display_options.shaded);
    }

    d3.select(this.refs.svg.getDOMNode()).datum(this.props.data).call(lineChart);
  },

  render: function() {
    return (
      <svg className="line-chart" ref="svg" />
    );
  }
});

module.exports = LineChart;
