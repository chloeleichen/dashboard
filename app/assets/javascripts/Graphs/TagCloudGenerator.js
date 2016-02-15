const TagCloudGenerator = function TagCloudGenerator() {
  var autoWidth = true,
    width = 500,
    height = 200;

  function my(selection) {
    selection.each(function(data) {
      // console.log("tagcloud data", data);
      var div = d3.select(this);
      if(autoWidth) {
        width = div.node().parentNode.clientWidth;
      }

      var extent = d3.extent(data, function(d) { return d.value; });

      var size = d3.scale.sqrt()
      .domain(extent)
      .range([10, 35]);

      var opacity = d3.scale.linear().domain(extent).range([1, 0.5]);

      var layout = d3.layout.cloud()
          .size([width, height])
              .words(data.sort(function(a, b) { return b.value - a.value; }))
              .text(function(d) { return d.label; })
              .padding(1)
              .rotate(0)
              .font("Helvetica")
              .fontSize(function(d) { return size(d.value); })
              .spiral("rectangular")
              .on("end", draw);

      layout.start();
      function draw(words) {
        div.append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter()
            .append("a")
            .attr("xlink:href", function(d) {
              return "https://www.google.com.au/?q=" + d.text;
            })
            .attr("target", "_blank")
            .append("text")
            .attr("class", "theme-colour")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Helvetica")
            .style("opacity", function(d) { return opacity(d.value); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      }
    });
  }

  return my;
}
module.exports = TagCloudGenerator;

