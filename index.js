require('dotenv').config()
const Wok = require('wokcommands');
const { Client, Intents } = require('discord.js');
const path = require('path');

const client = new Client({
	partials: ["CHANNEL", "MESSAGE", "REACTION"],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_PRESENCES,
	],
	presence: {
		status: 'online',
		activities: [{
			name: require("./package.json").version,
			type: 'WATCHING'
		}]
	}
})

client.on('ready', async () => {
	const wok = new Wok(client, {

		commandsDir: path.join(__dirname, 'Commands'),

		featuresDir: path.join(__dirname, 'Events'),

		showWarns: true,

		delErrMsgCooldown: 5,

		dbOptions: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			keepAlive: true,
		},

		testServers: ['950190034852646912'],

		botOwners: [`326815959358898189`, `875010010583826443`],

		disabledDefaultCommands: [
			'help',
			'prefix',
			'slash',
			'command',
			'language',
			'requiredrole',
			'channelonly'
		], mongoUri: process.env.MongoURL,
	}).setDefaultPrefix('​')
	
	wok.on('databaseConnected', async (connection, state) => {
		console.log('WOKCommands > Database', state)
	})
})
process.on("unhandledRejection", (reason, p) => {
	console.log("[Neko's Anti-Crash] Unhandled Rejection/Catch");
	console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
	console.log("[Neko's Anti-Crash] Uncaught Exception/Catch");
	console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
	console.log("[Neko's Anti-Crash] Uncaught Exception/Catch (MONITOR)");
	console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
	console.log("[Neko's Anti-Crash] Multiple Resolves");
	console.log(type, promise, reason);
});

client.login(process.env.TOKEN)