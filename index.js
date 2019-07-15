//load dotENV
require("dotenv").config();

const TwitterClient = require("./src/lib/Client");

const client = new TwitterClient();

//cmd arguments
var args = process.argv.slice(2);
if ((arg = undefined)) {
	console.log("No arguments included. Starting bot as normal.");
} else {
	console.log(`Parsing argument "${arg}"...`);
}
switch (args[0]) {
	case undefined:
		client.start();
		break;
	case "start":
		console.log("Starting Napolitan bot by Cappuchino...");
		client.start();
		break;
	default:
		if ((args = undefined)) console.log("No Arguments detected...");
		else console.log(`Argument: ${args}`);
		console.log("Starting Napolitan bot by Cappuchino...");
		client.start();
		break;
}
