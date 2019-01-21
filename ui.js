// Define UI elements
var ui = {
    timer: document.getElementById('timer'),
	
    robotState: document.getElementById('robotstatus'),
	
	gyro: {
        container: document.getElementById(''),
        val: 0,
        offset: 0,
        visualVal: 0,
        arm: document.getElementById(''),
        number: document.getElementById('')
    },
	
	arm-position: document.getElementById('point'),
	
	battery: document.getElementById(''),
	
	rioCPUuse: document.getElementById(''),
	
	powerDraw: document.getElementById(''),
	
	rioRAMuse: document.getElementById(''),

};

// Key Listeners

function onRobotConnection(connected) {
	var state = connected ? 'Robot connected!' : 'Robot disconnected.';
	console.log(state);
	ui.robotState.innerHTML = state;
}


// This button is just an example of triggering an event on the robot by clicking a button.
NetworkTables.addKeyListener('/SmartDashboard/', (key,value) => {
	ui.rioCPUuse.innerHTML = value;
});

NetworkTables.addKeyListener('/SmartDashboard/', (key,value) => {
	ui.battery.innerHTML = value;
});

NetworkTables.addKeyListener('/SmartDashboard/', (key,value) => {
	ui.powerDraw.innerHTML = value;
});

NetworkTables.addKeyListener('/SmartDashboard/', (key,value) => {
	ui.rioRAMuse.innerHTML = value;
});

NetworkTables.addKeyListener('/SmartDashboard/RPRed', (key, value) => {
    ui.RPRed.innerHTML = value;
});

NetworkTables.addKeyListener('/SmartDashboard/RPBlue', (key, value) => {
    ui.RPBlue.innerHTML = value;
});

NetworkTables.addKeyListener('SmartDashboard/elevatorSpeed',(key, value) => {
	ui.arm-position.innerHTML = value*100 + 100;
	
	// raczej nie zadziała ale kto wie
	
}

NetworkTables.addKeyListener(''), (key, value) => {
	ui.gyro.val = value;
    ui.gyro.visualVal = Math.floor(ui.gyro.val - ui.gyro.offset);
    ui.gyro.visualVal %= 360;
    if (ui.gyro.visualVal < 0) {
        ui.gyro.visualVal += 360;
    }
    ui.gyro.arm.style.transform = `rotate(${ui.gyro.visualVal}deg)`;
    ui.gyro.number.innerHTML = ui.gyro.visualVal + 'ยบ';
});

NetworkTables.addKeyListener('/SmartDashboard/timer', (key, value) => {
    // This is an example of how a dashboard could display the remaining time in a match.
    // We assume here that value is an integer representing the number of seconds left.
    ui.timer.innerHTML = parseInt(value) < 0 ? '0:00' : Math.floor(parseInt(value) / 60) + ':' + (parseInt(value) % 60 < 10 ? '0' : '') + parseInt(value) % 60;
});


