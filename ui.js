// Define UI elements
var ui = {
    timer: document.getElementById('timer'),
	
    robotState: document.getElementById('robotstatus'),
	
	armposition: document.getElementById('point'),
	
	testdiv1: document.getElementById('testDiv1'),
	
	testdiv2: document.getElementById('testDiv2'),
	
	robotGyro: document.getElementById('gyro-arm'),
	
	list: document.getElementById('tuning'),

};

// Key Listeners

NetworkTables.addRobotConnectionListener(onRobotConnection, true);

function onRobotConnection(connected) {
	var state = connected ? 'Connected!' : 'Disconnected.';
	console.log(state);
	ui.robotState.innerHTML = state;
}

NetworkTables.addGlobalListener(onValueChanged, true);


//This button is just an example of triggering an event on the robot by clicking a button.
// NetworkTables.addKeyListener('/SmartDashboard/value1', (key,value) => {
	//function addData(chart1," " , value);
	//addData(chart1," ",Math.floor(Math.random() * 90)+1);
	// ui.testdiv1.innerHTML = value;
	
// });

// NetworkTables.addKeyListener('/SmartDashboard/gyro', (key,value) => {
	// ui.robotGyro.style.transform = "rotate(" + value + "deg)";
	
// });

function onValueChanged(key,value,isNew) {
	
	if (value == 'true') {
		value = true;
	} else if (value == 'false') {
		value = false;
	}
	
	switch(key) {
		case '/SmartDashboard/gyro':
			ui.testdiv1.innerHTML = value;
			// ui.robotGyro.style.transform = "matrix(1 0 0 -1 100 100)";
			ui.robotGyro.style.transform = "rotate(" + 30 + "deg)";
			break;
		case '/SmartDashboard/value2':
			//ui.testdiv2.innerHTML = value;
			break;
	}
	
	
	//początek
	
	if (isNew && !document.getElementsByName(key)[0]) {
		// Make a new div for this value
		if(key.substring(0,16) != "/SmartDashboard/") {
				console.log("rasperka wysyła syf");
		} else {
			var div = document.createElement('div'); // Make div
		ui.list.appendChild(div); // Add the div to the page
		
		var p = document.createElement('p'); // Make a <p> to display the name of the property
		p.innerHTML = key; // Make content of <p> have the name of the NetworkTables value
		div.appendChild(p); // Put <p> in div

		var input = document.createElement('input'); // Create input
		input.name = key; // Make its name property be the name of the NetworkTables value
		input.value = value; // Set
		// The following statement figures out which data type the variable is.
		// If it's a boolean, it will make the input be a checkbox. If it's a number,
		// it will make it a number chooser with up and down arrows in the box. Otherwise, it will make it a textbox.
		if (value === true || value === false) { // Is it a boolean value?
			input.type = 'checkbox';
			input.checked = value; // value property doesn't work on checkboxes, we'll need to use the checked property instead
		} else if (!isNaN(value)) { // Is the value not not a number? Great!
			input.type = 'number';
		} else { // Just use a text if there's no better manipulation method
			input.type = 'text';
		}
		// Create listener for value of input being modified
		input.onchange = function() {
			switch (input.type) { // Figure out how to pass data based on input type
				case 'checkbox':
					// For booleans, send bool of whether or not checkbox is checked
					NetworkTables.putValue(key, input.checked);
					break;
				case 'number':
					// For number values, send value of input as an int.
					NetworkTables.putValue(key, parseInt(input.value));
					break;
				case 'text':
					// For normal text values, just send the value.
					NetworkTables.putValue(key, input.value);
					break;
			}
		};
		// Put the input into the div.
		div.appendChild(input);
		}
	} else { // If the value is not new
		// Find already-existing input for changing this variable
		var oldInput = document.getElementsByName(key)[0];
		if (oldInput) { // If there is one (there should be, unless something is wrong)
			if (oldInput.type === 'checkbox') { // Figure out what data type it is and update it in the list
				oldInput.checked = value;
			} else {
				oldInput.value = value;
			}
		} else {
			console.log('Error: Non-new variable ' + key + ' not present in tuning list!');
		}
			
		}
		
	};
	//koniec

//gyro-arm
// NetworkTables.addKeyListener('/SmartDashboard/value1', (key,value) => {
	// ui.testdiv.innerHTML = value;
// });

// NetworkTables.addKeyListener('/SmartDashboard/', (key,value) => {
	// ui.rioRAMuse.innerHTML = value;
// });

// NetworkTables.addKeyListener('/SmartDashboard/RPRed', (key, value) => {
    // ui.RPRed.innerHTML = value;
// });

// NetworkTables.addKeyListener('/SmartDashboard/RPBlue', (key, value) => {
    // ui.RPBlue.innerHTML = value;
//});


// NetworkTables.addKeyListener(''), (key, value) => {
	// ui.gyro.val = value;
    // ui.gyro.visualVal = Math.floor(ui.gyro.val - ui.gyro.offset);
    // ui.gyro.visualVal %= 360;
    // if (ui.gyro.visualVal < 0) {
        // ui.gyro.visualVal += 360;
    // }
    // ui.gyro.arm.style.transform = `rotate(${ui.gyro.visualVal}deg)`;
    // ui.gyro.number.innerHTML = ui.gyro.visualVal + 'ยบ';
// });

// NetworkTables.addKeyListener('/SmartDashboard/timer', (key, value) => {
    //This is an example of how a dashboard could display the remaining time in a match.
    //We assume here that value is an integer representing the number of seconds left.
    // ui.timer.innerHTML = parseInt(value) < 0 ? '0:00' : Math.floor(parseInt(value) / 60) + ':' + (parseInt(value) % 60 < 10 ? '0' : '') + parseInt(value) % 60;
// });


