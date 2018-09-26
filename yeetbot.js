const Discord = require("discord.js");
const Attachment = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const battleriteconfig = require("./battleriteconfig.json");

let Battlerite_Dev = require('battlerite-dev');
let api = new Battlerite_Dev({key: config.battlerite.token});

const fs = require("fs");

const prefix = config.discord.prefix;

var args;
var command;

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    // Exit and stop if prefix is not there
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    args = message.content.slice(prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();



    if (message.content.startsWith(config.discord.prefix + "yeetSetprefix")) {
        // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        // change the configuration in memory
        config.prefix = newPrefix;

        // Now we have to save the file.
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    }

    if (command === 'ping') {
        message.channel.send("pong!");
    } else if (command === 'test') {
        message.channel.send("yeet");
    } else if (command === 'Wanneer is bram zijn verjaardag') {
        message.channel.send("Vrijdag 26 oktober (in de herfstvakantie voor de westerse plebs) yeet!");
    } else if (command === 'yeetus') {
        // Create the attachment using Attachment
        const attachment = new Discord.Attachment('https://i.redd.it/jx308gsx5e511.png');
        // Send the attachment in the message channel with a content
        message.channel.send("THAT FETUS", attachment);
    } else if (command === 'brapiversion') {
        try {
            api.status().then(r => console.log(r.data.attributes.version + " " + r.data.attributes.releasedAt));
        }
        catch(exception){
            console.log(exception.message);
        }
        message.channel.send("status checked");
        message.channel.send("check console for status");
    }

});

client.login(config.discord.token);
