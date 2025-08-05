const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken('MTQwMjAxODg0MTA4NDU2MzU5Ng.G2nPno.Xmoq-Ydn6ZK39KgJoU3tVFtYgSnTTz9r35asAk');

(async () => {
  try {
    console.log('?? Refreshing application (/) commands...');

    await rest.put(
      Routes.applicationCommands('1402018841084563596'),
      { body: commands },
    );

    console.log('? Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();