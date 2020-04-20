// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var pieChart, barChart;

// last two weeks days array
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getDates(startDate, nDays) {
  var dateArray = new Array();
  var currentDate = new Date(startDate)
  for (var c =0;c<nDays; c++) {
      var month = currentDate.toLocaleString('default', { month: 'short' })
      dateArray.unshift(currentDate.getDate()+"-"+month);
      currentDate = currentDate.addDays(-1);
  }
  return dateArray;
}
var barChartData = {
  labels: getDates(new Date(), 14),
  datasets: [{
    label: 'Social Distancing',
    backgroundColor: "#e74a3b",
    data: [
      1,2,4,3,4,5,6,
      2,4,2,4,1,2,3
    ]
  }, {
    label: 'Masks',
    backgroundColor: "#858796",
    data: [
      1,2,0,3,0,1,2,
      2,1,2,0,0,2,3
    ]
  }, {
    label: 'Temperature',
    backgroundColor: "#f6c23e",
    data: [
      1,2,0,0,1,1,2,
      2,1,2,1,0,2,0
    ]
  }]

};

var barChartData2 = {
  labels: getDates(new Date(), 14),
  datasets: [{
    label: 'Social Distancing',
    backgroundColor: "#e74a3b",
    data: [
      0,1,1,0,2,2,1,
      1,0,2,2,1,0,0
    ]
  }, {
    label: 'Masks',
    backgroundColor: "#858796",
    data: [
      1,2,0,1,0,1,0,
      2,1,1,0,0,2,1
    ]
  }, {
    label: 'Temperature',
    backgroundColor: "#f6c23e",
    data: [
      0,2,0,0,1,1,1,
      1,1,1,1,0,0,0
    ]
  }]

};

function loadBarChart(data){
  var ctx = document.getElementById("myAreaChart");

  barChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      title: {
        display: false,
        text: ''
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
}

var pieData = [15, 30, 55]
var pieData2 = [10, 20, 25]
var titles = ["Temperture", "Masks", "Social distancing"];
function loadPie(data, titles){
// Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: titles,
      datasets: [{
        data: data,
        backgroundColor: ['#f6c23e', '#858796', '#e74a3b'],
        hoverBackgroundColor: ['#a78327', '#94490b', '#82281f'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}

loadBarChart(barChartData);
loadPie(pieData, titles)

$("#business-list").on("change", function(){
  $("#legend").removeClass("invisible");
  pieChart.destroy();
  barChart.destroy();
  var this_val = $(this).val();
  if(this_val == "all"){
    loadBarChart(barChartData);
    loadPie(pieData, titles);
  }
  else{
    loadBarChart(barChartData2)
    loadPie(pieData2, titles)
  }
  
});
$("#social-dist").on("click", function(){
  pieChart.destroy();
  $("#legend").addClass("invisible");
  var d = [15, 20, 0];
  loadPie(d, ["Plant Quebec", "Plant Montreal", ""]);
});
