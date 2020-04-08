// global variable for chart
var chart = Highcharts.chart('chartarea', {
    chart: {
      type: "column",
    }, 
    title: {
        text: 'Title'
    },
    subtitle: {
        text: 'Subtitle'
    },
    xAxis: {
        title: {
          text: 'Months',
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
        },
        labels: {
            overflow: 'justify'
        }
    },
    series: [{
        colorByPoint: true,
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        showInLegend: false
    }], 
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          },
          credits: {
            enabled: false
          }
        }
      }]
    }
});

var defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];

// load variables when document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  $('.ui.dropdown').dropdown({ on: 'hover' });
});

// Changes title to value typed in Title box
$('input[name="title"]').keyup(function() {
  chart.update({ title: { text: this.value } });
});
// Changes subtitle to value typed in Subtitle box
$('input[name="subtitle"]').keyup(function() {
  chart.update({ subtitle: { text: this.value } });
});
// Changes title to value typed in X-Axis box
$('input[name="xaxis"]').keyup(function() {
  chart.update({ xAxis: { title: { text: this.value } } });
});
// Changes title to value typed in Y-Axis box
$('input[name="yaxis"]').keyup(function() {
  chart.update({ yAxis: { title: { text: this.value } } });
});
// Changes graph type to selected type
$('input[name="chart-type"]').on('change', function() {
  chart.update({ chart: { type: this.value } });
});

$('#add-button').click(function () {
  $('#add-modal').modal('show');
});

$('#settings-button').click(function () {
  $('#settings-modal').modal('show');
});

