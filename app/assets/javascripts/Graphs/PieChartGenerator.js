const PieChartGenerator = function() {
  var width = 125;
  var height = 125;

  function my(selection) {
    var radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
        .value(function(d) { return d.value; })
        .sort(null);

    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius);

    selection.each(function(data) {
      var svg = d3.select(this)
          .attr("width", width)
          .attr("height", height);

      svg.selectAll("*").remove();

      svg = svg.append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      svg.datum(data).selectAll("path")
          .data(pie)
          .enter().append("path")
          .attr("shape-rendering", "geometricPrecision")
          .attr("class", function(d) { return classNames(d.data.options.colour, "theme-colour"); })
          .attr("d", arc);
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

  return my;
}

module.exports = PieChartGenerator;
