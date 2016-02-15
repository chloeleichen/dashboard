const BarChartGenerator =function () {
  var width = 100,
    height = 20,
    autoWidth = false,
    yDomain = null,
    y = d3.scale.pow().exponent(0.4),
    colour = null;

  function my(selection) {
    selection.each(function(data) {
      var svg = d3.select(this);
      svg.selectAll("*").remove();

      if(autoWidth) {
        width = svg.node().getBoundingClientRect().width;
      }

      data = data.sort(function(a, b) { return b[0] - a[0]; });

      svg.attr("height", height);

      // var x = d3.time.scale()
      //     .domain(d3.extent(data, function(d) { return d[0]; }))
      //     .rangeRound([0, width]);

      y.rangeRound([height, 0]);

      if(yDomain) {
        y.domain(yDomain);
      } else {
        y.domain([0, d3.max(data, function(d) { return d[1]; })]);
      }

      var bars = svg.selectAll("rect").data(data);
      bars.exit().remove();
      bars.enter().append("rect");

      bars
          .attr("height", function(d) { return height - y(d[1]); })
          .attr("width", 5)
          .attr("x", function(d, i) { return width - ((i + 1) * 6); })
          .attr("y", function(d) { return y(d[1]); })
          .attr("class", function(d) { return colour(d[1]); })
          .classed("no-stroke", true);
    });
  }

  my.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return my;
  };

  my.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return my;
  };

  my.colour = function(_) {
    if(!arguments.length) return colour;
    colour = _;
    return my;
  };

  my.yDomain = function(_) {
    if(!arguments.length) return yDomain;
    yDomain = _;
    y.domain(yDomain);
    return my;
  };

  my.autoWidth = function(_) {
    if(!arguments.length) return autoWidth;
    autoWidth = _;
    return my;
  };

  return my;
}

module.exports = BarChartGenerator;
