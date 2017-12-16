var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {

    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

});

bot.on('message', function (user, userID, channelID, message, evt) {

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    if (message.substring(0, 1) == '!') {

        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var arg1 = args[1];
        var arg2 = args[2];
       

        args = args.splice(1);
        switch(cmd) {

            // !ping
            case 'ralph':
                arg1 = String(arg1);

                if (arg1 === 'bomb') {
                    var max = 10;
                    var handsflag = false;

                    // check if next argument is a number
                    if (!isNaN(arg2)) {
                        max = arg2;
                        if (max > 10) {
                            max = 10;
                            handsflag = true;
                        }
                    } 
                   
                    for (var i = 0; i < max; i++) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'https://imgur.com/gallery/Pts5d'
                        });                        
                    }

                    if (handsflag) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Ralph only have two hands'
                        });                        
                    }
                } else {

                    bot.sendMessage({
                        to: channelID,
                        message: 'arf'
                    });
                }


            break;

            
            case 'birthday':
                var name = String(arg1);
                if (name === 'weilon' || name === 'Weilon' || name === 'whale') {
                    bot.sendMessage({
                        to: channelID,
                        message: 'https://i.pinimg.com/originals/58/a9/41/58a941c56e9cf84178c34f05622409fc.jpg' // Nice picture of a whale saying "Happy Birthday"
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'It whale birthday. Not yours. *Sniffling dimwit*'
                    });
                }
                
            break;

            case 'sing':
               bot.sendMessage({
                   to: channelID,
                   message: '*happy birthday to you*'
               });

               bot.sendMessage({
                   to: channelID,
                   message: '*you smell like a poo*'
               });

               bot.sendMessage({
                   to: channelID,
                   message: '*you look like purple scum*'
               });

               bot.sendMessage({
                   to: channelID,
                   message: '*\*spits\**'
               });
            break;

         }

     }

});
