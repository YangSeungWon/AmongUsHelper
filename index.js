const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");


let voiceChannel;
let isMeeting = false;
let time = 135;
let dead_members = Array();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    let content = msg.content;

    if (msg.content[0] === '!') {
        content = content.slice(1);
        if (content === "help") {
            msg.reply("\n!meet : 회의 시작(음소거 해제)\n!status : 봇의 현재 상태를 반환합니다.\n!config N : 회의 시간을 N초로 설정합니다.\n!init : 보이스 채널 등록\n!dead : 죽었으면\n!start : 게임 시작\n!end : 게임 끝");
        } else if (content === "meet") {
            if (isMeeting) {
                msg.channel.send("\n이미 회의 중입니다.");
            } else {
                unMuteAll().then(console.log);
                isMeeting = true;
                let timer = setTimeout(() => {
                    isMeeting = false;
                    muteAll().then(console.log);
                    msg.channel.send("\n회의가 끝났습니다. (모두 음소거)");
                    msg.channel.send("\nhttps://tenor.com/view/among-us-gif-18540350");
                }, time*1000);
                msg.channel.send("\n회의를 시작했습니다.(음소거 해제) "+time+"초 후에 종료됩니다.");
                msg.channel.send("\nhttps://tenor.com/view/among-us-digibyte-dgb-meme-button-gif-18569623");
            }
        } else if (content === "start") {
            dead_members.length = 0;
            msg.channel.send("\n게임 시작");
            msg.channel.send("\nhttps://tenor.com/view/among-us-discord-gif-18555996");
            muteAll().then(console.log);
        } else if (content === "end") {
            dead_members.length = 0;
            msg.channel.send("\n게임 끝");
            msg.channel.send("\nhttps://tenor.com/view/among-us-among-us-victory-just-some-plastic-gif-18613647");
            unMuteAll().then(console.log);
        } else if (content === "status") {
            if (isMeeting) {
                msg.reply("\n회의 중입니다.");
            } else {
                msg.reply("\n회의 중이 아닙니다.");
            }
            msg.reply("\n회의는 "+time+"초 동안 진행됩니다.");
        } else if (content.startsWith("config ")) {
            time = parseInt(content.slice(7))
            msg.reply("\n회의 시간을 "+time+"초로 조정했습니다.");
        } else if (content === "init") {
            voiceChannel = msg.member.voice.channel;
            msg.reply("\n당신의 보이스 채널이 어몽어스 채널로 설정되었습니다.");
        } else if (content === "dead") {
            dead_members.push(msg.author.id);
            msg.member.voice.setMute(true);
            msg.reply("\nhttps://tenor.com/view/among-us-gif-18355819");
        }
    }
});

client.login(config.token);

async function unMuteAll() {
    for (let member of voiceChannel.members) {
        if (!dead_members.includes(member[0])){
            await member[1].voice.setMute(false);
        }
    }
    return 1;
}

async function muteAll() {
    for (let member of voiceChannel.members) {
        if (!dead_members.includes(member[0])){
            await member[1].voice.setMute(true);
        }
    }
    return 1;
}
