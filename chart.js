function addData(chart, label, data) {
	chart.data.labels.splice(0, 1); // remove first label
    chart.data.datasets.forEach(function(dataset) {
        dataset.data.splice(0, 1); // remove first data point
    });
	chart.update();
	
	chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
	
}

// function loopChart() {
	// console.log("asdas");
	// addData(chart1," ",Math.floor(Math.random() * 90)+1);
	// addData(chart2," ",Math.floor(Math.random() * 30)+10);
	// setTimeout("loopChart()",400);
// }

function createEmptyChart(canvasID,labelName,chartColor) {
	
	var chrt = document.getElementById(canvasID).getContext("2d");
	
	var data = {
		labels:["","","","","","","","","","","","","","","","","","","","",] , //x-axis
		datasets: [
			{
				label: labelName, //optional
				backgroundColor: chartColor,
				data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] // y-axis
			}
		]
	};
	
	var options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
	
	var myPieChart = new Chart(chrt,{
    type: 'line',
    data: data,
	options: options,
	});
	
	return myPieChart;
	
}

NetworkTables.addKeyListener('/SmartDashboard/value1', (key,value) => {
	//function addData(chart1," " , value);
	addData(chart1," ",value);

	
});

NetworkTables.addKeyListener('/SmartDashboard/value2', (key,value) => {
	//function addData(chart1," " , value);
	addData(chart2," ",value);

	
});

NetworkTables.addKeyListener('/SmartDashboard/value3', (key,value) => {
	//function addData(chart1," " , value);
	addData(chart3," ",value);

	
});

NetworkTables.addKeyListener('/SmartDashboard/value4', (key,value) => {
	//function addData(chart1," " , value);
	addData(chart4," ",value);

	
});