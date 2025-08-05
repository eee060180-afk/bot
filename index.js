const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// On interaction
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '? There was an error executing this command.', ephemeral: true });
  }
});

client.once('ready', () => {
  console.log(`? Logged in as ${client.user.tag}`);
});

client.login('MTQwMjAxODg0MTA4NDU2MzU5Ng.G2nPno.Xmoq-Ydn6ZK39KgJoU3tVFtYgSnTTz9r35asAk');