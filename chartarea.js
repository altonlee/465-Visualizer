/*   
 *  CHARTAREA.JS
 *  Functions + Data needed for Visualizer 465
 *  Credit: Alton Lee
 */

var chartNames= [['Population']];
var chartData = [[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]];
var chartCols = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];

var chart = Highcharts.chart('chartarea', {
    data: {
      table: 'datatable'
    },
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
        categories: chartCols
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
        data: chartData[0]
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

/*********************************************************
 *  CHART UPDATE FUNCTIONS
*********************************************************/

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
// Changes subtitle to source link
$('button [class="ui blue icon button"]').click(function () {
  var link = '<a href="' + $(this).val() + '" target="blank">' + "Source" + '</a>';
  chart.update({ subtitle: { text: link } });
});
// Changes graph type to selected type
$('input[name="chart-select"]').on('change', function() {
  chart.update({ chart: { type: this.value } });
});

// updates data table
function updateChartTable() {
  var table = "";
  
  // get table header
  table += "<thead><tr>" + '<th></th>';
  // get series names
  for (var i = 0; i < chartNames.length; i++) {
    table += "<th>" + chartNames[i] + "</th>";
  }
  table += "</tr></thead>";
  
  // create table via a string
  table += "<tbody>";
  for (var i = 0; i < chartCols.length; i++) {
    // table column
    table += "<tr>" + "<td>" + chartCols[i] + "</td>";
    for (var j = 0; j < chartData.length; j++) {
      // series data
      table += "<td>" + chartData[j][i] + "</td>";
    }
    table += "</tr>";
  }
  table += "</tbody>";
  
  $('#datatable').html(table);

}

/*********************************************************
 *  FORM FUNCTIONS
 *********************************************************/

// load variables when document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  $('.ui.dropdown').dropdown({ on: 'hover' });
  updateChartTable();
});

// clears form, resets local series data
function clearForm() {
  seriesData = [];
  seriesCols = [];
  $('#series-table').html("");
  $('#series-name').val("");
  $('#series-form-name').val("");
  $('#series-form-val').val("");
  $('#del-button').css("display", "none");
}

// grabs form input
function grabForm(length) {
  // grab add form data
  for (var i = 0; i < length; i++) {
    var colName = "#series-name-" + i;
    var valName = "#series-val-" + i;
    
    if ($(valName).val() != null) {
      seriesData.push(Number($(valName).val()));
      seriesCols.push($(colName).val());
    }
  }
}

// deleting a series row
$('#series-table').on('click', 'i[class="close icon"]', function(e) {
  // get row parent element
  var val = $(this).closest('tr');
  // remove data from being pushed
  seriesData.splice(seriesData.indexOf(val.find('input[type="number"]')[0].value), 1);
  seriesCols.splice(seriesCols.indexOf(val.find('input[type="text"]')[0].value), 1);
  // remove table row
  val.remove();
});

// deleting a series
$('#del-button').click(function () {
  if (chartData.length == 1) {
    newChart();
  } else {
    chartNames.splice(curr, 1);
    chartData.splice(curr, 1);
    chartCols.splice(curr, 1);
    clearForm();
    updateChartTable();
    chart.series[curr].remove(true);
  }

  $('#series-modal').modal('hide');
});

$('#new-button').click(function () {
  newChart();
});

// new graph
function newChart() {
  $('#datatable').html("");
  chartData = [];
  chartCols = [];
  chartNames = [];
  while (chart.series.length > 0) {
    chart.series[0].remove(true);
  }
}

/*********************************************************
 *  ADD SERIES FUNCTIONS
 *********************************************************/
var x = 0;
var curr = "";
var seriesData = [];
var seriesCols = [];

// toggle add modal
$('#add-button').click(function () {
  $('#modal-header').html("Add Series");
  clearForm();

  for (var i = 0; i < chartCols.length; i++) {
    //populate table with column names
    $('#series-table').append(
      '<tr>' + 
        '<td><div class="ui input"><input type="text"' + 
          ' name="series-name-' + i + '"' + 
          ' id="series-name-' + i + '"' + 
          ' value="' + chartCols[i] + '"></input></div></td>' + 
        '<td><div class="ui input"><input type="number"' + 
          ' name="series-val-' + i + '"' + 
          ' id="series-val-' + i + '"' + 
          ' value="0"></input></div></td>' + 
        '<td><a><i class="close icon"></i></a></td>' + 
      '</tr>');
      x = i;
  }
  x++;
  
  $('#series-modal').modal('show');
});

// add row
$('#add-row-icon').click(function () {
  if ($('#series-name').val() === "") {
    alert("Series name cannot be empty.");
  } else if ($('#series-form-name').val() === "") {
    alert("Row name cannot be empty.");
  } else if (!$.isNumeric($('#series-form-val').val())) {
    alert("Value must be a number.");
  } else {
    seriesData.push($('#series-form-val').val());
    seriesCols.push($('#series-form-name').val());

    // appends input as table row
    $('#series-table').append(
      '<tr>' + 
        '<td><div class="ui input"><input type="text" name="series-name-' + x + '" id="series-name-' + x + 
            '" value="' + $('#series-form-name').val() + '"></input></div></td>' + 
        '<td><div class="ui input"><input type="number" name="series-val-' + x + '"id="series-val-' + x + 
            '" value="' + $('#series-form-val').val() + '"></input></div></td>' + 
        '<td><a><i class="close icon"></i></a></td>' + 
      '</tr>');

    // reset input fields
    $('#series-form-name').val("");
    $('#series-form-val').val("");
    x++;
  }
});

/*********************************************************
 *  EDIT SERIES FUNCTIONS
**********************************************************/

// edit series via dropdown
$('input[name="edit-select"]').on('change', function() {
  curr = this.value;

  $('#modal-header').html("Edit Series");
  clearForm();
  
  if (curr != undefined) {
    $('#series-name').val(chartNames[curr]);
    $('#del-button').css("display", "block");
    // 
    for (var i = 0; i < chartData[curr].length; i++) {
      //populate table with current series data
    $('#series-table').append(
      '<tr>' + 
        '<td><div class="ui input"><input type="text"' + 
          ' name="series-name-' + i + '"' + 
          ' id="series-name-' + i + '"' + 
          ' value="' + chartCols[i] + '"></input></div></td>' + 
        '<td><div class="ui input"><input type="number"' + 
          ' name="series-val-' + i + '"' + 
          ' id="series-val-' + i + '"' + 
          ' value="' + chartData[curr][i] + '"></input></div></td>' + 
        '<td><a><i class="close icon"></i></a></td>' + 
      '</tr>');
    }
    $('#series-modal').modal('show');
  }
});

/*********************************************************
 *  SAVE TABLE VALS FUNCTIONS
**********************************************************/

// save add/edit modal
$('#save-button').click(function() {
  // if we're adding data...
  if ($('#modal-header').html() === "Add Series") {
    grabForm(x);
    
    // if form was not empty
    if (seriesData[0] != null) {
      if ($('#series-name').val() === "") {
        alert("Series name cannot be empty.");
        return;
      } else {
        // push series into chart data
        chartNames.push($('#series-name').val());
        chartData.push(seriesData);
        chartCols = [];
        chartCols = seriesCols;
        // add series into edit menu
        curr = chartData.length;
        $('#edit-menu').append(
          '<div class="item" data-value="' + (curr - 1) + '">Series ' + curr + '</div>'
        );

        curr -= 1;
        x = 0;
        
        // add series into chart
        chart.addSeries({
          name: chartNames[curr],
          data: chartData[curr]
        }, false);
      }
    }
  // else, we're saving data
  } else if ($('#modal-header').html() === "Edit Series") {
    grabForm(chartData[curr].length);
    
    // if form was not empty
    if (seriesData[0] != null) {
      if ($('#series-name').val() === "") {
        alert("Series name cannot be empty.");
        return;
      } else {
        // save into series data
        chartNames.splice(curr, 1, $('#series-name').val());
        chartData.splice(curr, 1, seriesData);
        chartCols = [];
        chartCols = seriesCols;
        // draw series onto graph
        for (var i = 0; i < chartData.length; i++) {
          chart.series[i].setName(chartNames[i], false);
          chart.series[i].setData(chartData[i], false);
        }
      }
    }
  }

  // reset form, close modal
  clearForm();
  $('#series-modal').modal("hide");
  updateChartTable();
  chart.redraw();
});


/*********************************************************
 *  MISC
**********************************************************/

$('#settings-button').click(function () {
  $('#settings-modal').modal('show');
});

