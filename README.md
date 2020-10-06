# Among Us Helper
Discord bot for Among Us.

## Getting Started
If you just want to add this bot to your server,
Please visit https://bots.ondiscord.xyz/bots/760535068824436769

## Commands
* **!help**
Print available commands.
* **!config N**
Set conversation time(which includes voting time) to N seconds. default is 135sec.
* **!status**
Return meeting status and current setting for conversation time.
* **!start**
Start game. SHHHHHHH!
* **!meet**
*Please type this when the meeting starts.* It unmutes every alive person. Automatically mutes all after the conversation ends.
* **!dead**
*Please type this when you are dead and the next meeting starts.*
* **!end**
*Please type this when the game ends.* It unmutes every person.

## Common Usage
After installation and configuration, including `node index.js`,
1. Join a voice channel with your friends.
2. Using `!config N`, set conversation time as same as your game setting.
3. When you start game, type `!start`.
4. When you are killed by imposter, type `!dead`. But after next meeting starts!(because you should not inform others that you're dead.)
5. When you meeting starts, type `!meet`.
6. When the game ends, type `!end`.

## Getting Started for developer
```
git clone https://github.com/YangSeungWon/AmongUsHelper.git
cd AmongUsHelper
npm install
```
Then you can start AmongUsHelper using `node index.js`(Don't forget to configure!).

## Configuration for developer
1. Follow [Discord Bot Token Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
2. Then copy your bot's TOKEN, and paste it to `config.json`(You can see `HERE!!!` in that file).
3. Follow [Discord Bot Add Guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).
    **You have to add `Send Messages` in TEXT PERMISSIONS, and `Mute Members` in VOICE PERMISSIONS.**

