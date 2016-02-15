const LineChartGenerator = function() {
  var autoWidth = true;
  var yShowZero = null;
  var interpolate = "linear";
  var showPoints = true;
  var fillArea = true;
  var margin = {top: 10, right: 30, bottom: 20, left: 40};
  var width = 500 - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;
  var xAxisFormat = null;
  var x = d3.scale.linear();
  var y = d3.scale.linear();

  function my(selection) {
    selection.each(function(data) {
      if(autoWidth) {
        width = d3.select(this).node().parentNode.getBoundingClientRect().width - margin.left - margin.right;
        x.range([0, width]);
      }

      x.range([0, width]);
      y.range([0, height]);

      var allDataPoints = [];
      data.forEach(function(line) {
        line.value.forEach(function(point) {
          allDataPoints.push(point);
        });
      });

      var yMin = d3.min(allDataPoints, function(d) { return d[1]; });
      var yMax = d3.max(allDataPoints, function(d) { return d[1]; });

      if(yShowZero) {
        y.domain([yMax, 0]);
      } else {
        y.domain([yMax, yMin]);
      }

      var xExtent = d3.extent(allDataPoints, function(d) { return d[0]; });
      x.domain(xExtent);

      var yExtent = d3.extent(allDataPoints, function(d) { return d[1]; });
      var yMedian = d3.median(allDataPoints, function(d) { return d[1]; });

      var line;
      if(fillArea) {
        line = d3.svg.area()
            .x(function(d) { return x(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .y0(height);
      } else {
        line = d3.svg.line()
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); });
      }

      line.interpolate(interpolate);

      var svg = d3.select(this)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

      svg.selectAll("*").remove();

      svg = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      if(svg.select("g.lines-container").empty()) {
        var xAxis = d3.svg.axis().scale(x).tickValues(xExtent).tickSize(-10).tickPadding(8);
        if(xAxisFormat) {
          xAxis.tickFormat(xAxisFormat);
        }

        var yTickValues = [yExtent[0]];
        if((y(yExtent[0]) - y(yMedian)) > 15 &&
           (y(yMedian) - y(yExtent[1])) > 15) {
          yTickValues.push(yMedian);
        }
        yTickValues.push(yExtent[1]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"))
            .tickValues(yTickValues)
            .tickSize(-width);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("g").attr("class", "lines-container");

        svg.append("g").attr("class", "label-container")
            .attr("transform", "translate(" + [width + 10, 0] + ")");
      }

      var lineGroup = svg.select("g.lines-container").selectAll("g").data(data)
        .enter().append("g")
          .attr("class", function(d) { return classNames(d.options.colour, "theme-colour", fillArea ? "fill" : "no-fill"); });

      lineGroup.append("path")
      .attr("d", function(d) { return line(d.value); });

      if(showPoints) {
        var points = lineGroup.selectAll("circle").data(function(d) { return d.value; });
        points.enter().append("circle");

        points
            .attr("cx", function(d) { return x(d[0]); })
            .attr("cy", function(d) { return height - y(d[1]); })
            .attr("r", 3);
      }
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

  my.yShowZero = function(_) {
    if(!arguments.length) return yShowZero;
    yShowZero = _;
    return my;
  };

  my.autoWidth = function(_) {
    if (!arguments.length) return autoWidth;
    autoWidth = _;
    return my;
  };

  my.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return my;
  };

  my.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    interpolate = _;
    return my;
  };

  my.showPoints = function(_) {
    if (!arguments.length) return showPoints;
    showPoints = _;
    return my;
  };

  my.fillArea = function(_) {
    if (!arguments.length) return fillArea;
    fillArea = _;
    return my;
  };

  my.xAxisFormat = function(_) {
    if(!arguments.length) return xAxisFormat;
    xAxisFormat = _;
    return my;
  };

  return my;
}

module.exports = LineChartGenerator;
