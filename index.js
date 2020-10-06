const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

let db = new Array();

class Channel {
    constructor(data){
        this.channel = data
        this.channelId = data.id;
        this.isGaming = false;
        this.isMeeting = false;
        this.time = 135;
        this.dead_members = Array();
        this.timer;
    }

	unMuteAll() {
		for (let member of this.channel.members) {
			if (!this.dead_members.includes(member[0])){
				member[1].voice.setMute(false);
			}   
		}   
	}

	muteAll() {
		for (let member of this.channel.members) {
			if (!this.dead_members.includes(member[0])){
				member[1].voice.setMute(true);
			}   
		}   
	}
    
    meet(msgChannel){
        return new Promise((resolve, reject) => {
            if (!this.isGaming)
                return reject("\nThe game has not started yet.");
            if (this.isMeeting)
                return reject("\nAlready in meeting.");

            this.isMeeting = true;
            this.unMuteAll();
            this.timer = setTimeout(() => {
                this.endMeeting(msgChannel);
            }, this.time*1000);
            return resolve("\nStarts the meeting. It ends after "+this.time+" seconds."
                    +"\nhttps://tenor.com/view/among-us-digibyte-dgb-meme-button-gif-18569623");
        });
    }

    endMeeting(msgChannel){
        this.isMeeting = false;
        this.muteAll();
        msgChannel.send("\nThe meeting has ended."
            +"\nhttps://tenor.com/view/among-us-gif-18540350");
    }

    start(){
        return new Promise((resolve, reject) => {
            if (this.isGaming)
                return reject("\nThe game has already started.");

            this.isGaming = true;
            this.dead_members.length = 0;
            this.muteAll();
            return resolve("\nThe game begins. SHHHHHHH!"
                    +"\nhttps://tenor.com/view/among-us-discord-gif-18555996");
        });
    }

    end(){
        return new Promise((resolve, reject) => {
            if (!this.isGaming)
                return reject("\nThe game has not started yet.");

            this.isGaming = false;
            this.dead_members.length = 0;
            this.unMuteAll();
            return resolve("\nThe game ended."
                    +"\nhttps://tenor.com/view/among-us-among-us-victory-just-some-plastic-gif-18613647");
        });
    }

    setTime(time){
        this.time = time;
    }

    applyDead(personId, voice){
        return new Promise((resolve, reject) => {
            if (!this.isGaming)
                return reject("\nThe game has not started yet.");

            if (this.dead_members.includes(personId))
                return reject("\nAlready dead :(");

            this.dead_members.push(personId);
            voice.setMute(true);
            return resolve("\nhttps://tenor.com/view/among-us-gif-18355819");
        });
    }
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    let content = msg.content;
    let voiceChannel = msg.member.voice.channel;

    if (msg.content[0] === '!')
    {
        content = content.slice(1);

        if (!voiceChannel){
            msg.reply("\nPlease join voice channel.");
            return;
        }
        
        let obj = db.find(ch => ch.channelId === voiceChannel.id);
        if (!obj){
            db.push(new Channel(voiceChannel));
            obj = db.find(ch => ch.channelId === voiceChannel.id);
        }
        
        if (content === "help")
        {
            msg.reply("\n!config N : set meeting time to N\n!status : return current status\n!meet : start meeting\n!start : start game\n!end : end game\n!dead : broadcast your death");
        } 
        else if (content.startsWith("config "))
        {
            let time = parseInt(content.slice(7));
            obj.setTime(time);
            msg.reply("\nMeeting after this message will lasts for "+time+" seconds.");
        }
        else if (content === "status")
        {
            let retMsg = "";
            if (obj.isGaming) {
                retMsg += "\nIn Gaming...";
            } else {
                retMsg += "\nNot in Gaming...";
            }
            if (obj.isMeeting) {
                retMsg += "\nIn Meeting...";
            } else {
                retMsg += "\nNot in Meeting...";
            }
            retMsg += "\nMeeting lasts for "+obj.time+" seconds.";
            msg.reply(retMsg);
        }
        else if (content === "meet") 
        {
            obj.meet(msg.channel).then(retMsg => {
                msg.channel.send(retMsg);
            }).catch(err => {
                msg.channel.send(err);
            });
        }
        else if (content === "start")
        {
            obj.start().then(retMsg => {
                msg.channel.send(retMsg);
            }).catch(err => {
                msg.channel.send(err);
            });
        }
        else if (content === "end")
        {
            obj.end().then(retMsg => {
                msg.channel.send(retMsg);
            }).catch(err => {
                msg.channel.send(err);
            });
        }
        else if (content === "dead")
        {
            obj.applyDead(msg.author.id, msg.member.voice).then(retMsg => {
                msg.channel.send(retMsg);
            }).catch(err => {
                msg.channel.send(err);
            });
        }
    }
});

client.login(config.token);

