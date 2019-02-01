//////////////////////////////////////////////////////
// Basic configuration
//////////////////////////////////////////////////////
var margin = {top: 40, right: 20, bottom: 60, left: 60};
var width = 600 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

//////////////////////////////////////////////////////
// Set up X and Y axis scales
//////////////////////////////////////////////////////
var x = d3.scaleLinear()
    .range([0,  width])
    .domain([0, document.getElementById("n_observations").value]);
var xAxis = d3.axisBottom()
    .scale(x);
    // .ticks(7)
    // .tickValues([0,24,24*2,24*3,24*4,24*5,24*6,24*7,24*8,24*9]);
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 1]);
var yAxis = d3.axisLeft()
    .scale(y);

//////////////////////////////////////////////////////
// Initialize simulation charts
//////////////////////////////////////////////////////
var svg = d3.select("#simulated_experiment").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "svg_1")
      .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
          .attr("id", "group_1");

  // x axis
  svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .attr('class', 'x-axis')
        .attr('id', 'x-axis-simulation')
      .append("text")
        .text("Observations")
        .attr("dy", "3em")
        .attr("text-align", "center")
        .attr("x", width / 2 - margin.right - margin.left);

  // y axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("dy", "-2em")
      .text("Percent successful");

  // Title
  svg.append("text")
    .attr("id", "title_" + 1)
    .text("Simulation results")
    .attr("x", x(500))
    .attr("y", y(1))
    .attr("font-size", "40px")
    .attr("font-weight", "bold")
    .style("text-anchor", "middle")


  var plot_original = d3.line()
    .x(function(d) {return x(+d.observation); })
    .y(function(d) {return y(+d.original_pct_success); });

  var plot_variation1 = d3.line()
    .x(function(d) {return x(+d.observation); })
    .y(function(d) {return y(+d.variation1_pct_success); });

  var linegrp = d3.select('#group_1').append("g")
                  .attr("class", "linegroup")
                  .attr("id", "linegroup_1")

  var original_line = d3.select('#linegroup_1').append("path")
                        .attr("class", "daily_performance")
                        .attr("id", "original-line" )
                        .attr("stroke", "blue")
                        .attr("stroke-width", 2)
                        .attr("fill", "none")
                        .style("opacity", 0)
  var variation1_line = d3.select('#linegroup_1').append("path")
                          .attr("class", "daily_performance")
                          .attr("id", "variation1-line" )
                          .attr("stroke", "red")
                          .attr("stroke-width", 2)
                          .attr("fill", "none")
                          .style("opacity", 0)

  function update_graphs(data){
      // console.log(data)

      d3.select('#original-line')
        .transition()
        .attr("d", plot_original(data))
        .duration(500)
        .style("opacity",0.8);

      d3.select('#variation1-line')
        .transition()
        .attr("d", plot_variation1(data))
        .duration(500)
        .style("opacity",0.8);
        }



//////////////////////////////////////////////////////
// Initialize Legend
//////////////////////////////////////////////////////
  var legendRectSize = 18;                                  // NEW
  var legendSpacing = 4;                                    // NEW

  var legend_data = [{"name":"original", "color":"red"},{"name":"variation1","color":"blue"}]
  var legend = svg.selectAll('.legend')                     // NEW
            .data(legend_data)                                   // NEW
            .enter()                                                // NEW
            .append('g')                                            // NEW
            .attr('class', 'legend')                                // NEW
            .attr('transform', function(d, i) {                     // NEW
              var l_width = legendRectSize + legendSpacing;          // NEW
              var offset =  l_width * legend_data.length / 2;     // NEW
              var n = document.getElementById("n_observations").value;
              var horz = x(0.85*n);                       // NEW
              var vert = y(1 - 0.1*i) //i * l_width - offset;                       // NEW
              return 'translate(' + horz + ',' + vert + ')';        // NEW
            });                                                     // NEW

          legend.append('rect')                                     // NEW
            .attr('width', legendRectSize)                          // NEW
            .attr('height', legendRectSize)                         // NEW
            .style('fill', function (d) {return d.color;})                                   // NEW
            .style('stroke', function (d) {return d.color;});                                // NEW

          legend.append('text')                                     // NEW
            .attr('x', legendRectSize + legendSpacing)              // NEW
            .attr('y', legendRectSize - legendSpacing)              // NEW
            .text(function(d) { return d.name; });                       // NEW





//////////////////////////////////////////////////////
// Initialize significance charts
//////////////////////////////////////////////////////


  var svg2 = d3.select("#simulated_experiment").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "svg_2")
        .append("g")
                    .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")")
                      .attr("id", "group_2");

    // x axis
    svg2.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .attr('class', 'x-axis')
        .append("text")
          .text("Observations")
          .attr("dy", "3em")
          .attr("text-align", "center")
          .attr("x", width / 2 - margin.right - margin.left);

    // y axis
    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("dy", "-2em")
        .text("Percent successful");

    // Title
    svg2.append("text")
      .attr("id", "title_" + 1)
      .text("Significance level (p)")
      .attr("x", x(500))
      .attr("y", y(1.05))
      .attr("font-size", "40px")
      .attr("font-weight", "bold")
      .style("text-anchor", "middle")

    var plot_p = d3.line()
      .x(function(d) {return x(+d.observation); })
      .y(function(d) {return y(+d.p); });
    var plot_alpha = d3.line()
      .x(function(d) {return x(+d.observation); })
      .y(function(d) {return y(+d.alpha); });

    var linegrp_p = d3.select('#group_2').append("g")
                    .attr("class", "linegroup")
                    .attr("id", "linegroup_2")

    var p_line = d3.select('#linegroup_2').append("path")
                          .attr("class", "daily_performance")
                          .attr("id", "p-line" )
                          .attr("stroke", "blue")
                          .attr("stroke-width", 2)
                          .attr("fill", "none")
                          .style("opacity", 0);

    var alpha_line = d3.select('#linegroup_2').append("path")
                          .attr("class", "daily_performance")
                          .attr("id", "alpha-line" )
                          .attr("stroke", "orange")
                          .attr("stroke-width", 2)
                          .attr("fill", "none")
                          .style("opacity", 0);

    var area_of_significance = d3.area()
                                .x0(function (d) {return x(d.observation - 2.5)}) //console.log(d);
                                .x1(function (d) {return x(d.observation + 2.5)})
                                .y0(y(0))
                                .y1(y(1));

    function update_p_graphs(data){
        // console.log(data)
        var significant = data.filter(function (el) {
          return el.p <= 0.05;
        });
        // console.log(significant)

        var n_observations = document.getElementById("n_observations").value;
        var alpha_data = [{'observation':0, 'alpha':0.05}, {'observation':n_observations, 'alpha':0.05}]

        d3.select('#p-line')
          .transition()
          .attr("d", plot_p(data))
          .duration(500)
          .style("opacity",0.8);

        d3.select('#alpha-line')
          .transition()
          .attr("d", plot_alpha(alpha_data))
          .duration(500)
          .style("opacity",0.8);

          // MANUALLY CHECK THIS AND ADD A DATASET FOR VALIDATING
        // testdata = [
        //   {"observation":100, "p":0.002},
        //   {"observation":101, "p":0.002}
        // ]
        // testdata2 = Object.keys(testdata).map(function(key) {
        //       return [testdata[key]];})
        // enter
        // a.enter()
        //   .append("path")
        //   .attr("class", "area")
        //   .transition()
        //   .duration(250)
        //   .attr("d", area_of_significance)
        //   .style("opacity",0.8)
        //   .style("fill", "red");

        significant2 = Object.keys(significant).map(function(key) {
              return [significant[key]];})
        // console.log(significant2)

        var a = d3.select("#group_2").selectAll('.area')
           .data(significant2); // must cast as array -- [testdata]



        if (typeof significant != "undefined"){
            // console.log('Not undefined')

            d3.select("#group_2").selectAll(".significant-shading").remove()

            var shaded = d3.select("#group_2").selectAll(".significant-shading")
              .data(significant2)

            shaded.exit().remove()
              // .exit()
            shaded.enter()
              .append("path")
              .attr('d', area_of_significance)
              .attr("class", "significant-shading")
              .style("opacity",0)
              .transition()
              .duration(500)
              .style("opacity",0.2)
              .style("fill", "red")
              .style("stroke", "red");
            }
      }




//////////////////////////////////////////////////////
// Updating axis
//////////////////////////////////////////////////////


  function update_axes(){
    x.domain([0, document.getElementById("n_observations").value])
    d3.select("#svg_1")
          .transition()
          .select(".x-axis")
          .duration(750)
          .call(xAxis);
    d3.select("#svg_2")
          .transition()
          .select(".x-axis")
          .duration(750)
          .call(xAxis);
      }



//////////////////////////////////////////////////////
// Update rules
//////////////////////////////////////////////////////

  function update_simulation(station){
    n_observations =  document.getElementById("n_observations").value;
    p_original =  document.getElementById("p_original").value;
    p_variation1 =  document.getElementById("p_variation1").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            // console.log(data);
            update_axes()
            update_graphs(data)
            update_p_graphs(data)
        }
    };

    // Debugging test
    // xhttp.open("POST", "http://0.0.0.0:5000/echo_payload")
    // xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    // xhttp.send(JSON.stringify({"n_observations":n_observations,
    //                            "p_original":p_original,
    //                            "p_variation1":p_variation1})

     // xhttp.open("POST", "http://0.0.0.0:5000/update_simulation")
     xhttp.open("POST", "/update_simulation")
     xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
     xhttp.send(JSON.stringify({"n_observations":n_observations,
                                "p_original":p_original,
                                "p_variation1":p_variation1}))

  }

  update_simulation()
