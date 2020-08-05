
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);

//func for the 3D pie chart
function drawChart() {
    //Arr of users from different continents of the world
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Asia',     11],
    ['Africa',      9],
    ['Europe',  5],
    ['North America', 3],
    ['South America',    7],
    ['Australia',      3],
    ['Antartica',      8],
  ]);

  var options = {
    title: 'Users from different Continents of the world',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart.draw(data, options);
};

//function for the line chart
function drawChart2() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Gains', 'Losses'],
      ['2017',  600,      400],
      ['2018',  870,      400],
      ['2019',  960,       320],
      ['2020',  1030,      200]
    ]);

    var options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  };

