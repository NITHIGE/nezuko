
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const lang = require('../loadlanguage.js'); 
const musicIcons = require('../UI/icons/musicicons.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('playsong')
    .setDescription(lang.playDescription) 
    .addStringOption(option => option.setName('song').setDescription('The song to play').setRequired(true)),
  async execute(interaction, client) {
    const song = interaction.options.getString('song');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle() 
        .setAuthor({ 
          name: lang.playErrorTitle, 
          iconURL: musicIcons.wrongIcon,
          url: "https://discord.gg/xQF9f9yUEM"
        })
        .setDescription(lang.playErrorNotInVoiceChannel);
      return interaction.reply({ embeds: [embed] });
    }

    client.distube.play(voiceChannel, song, {
      textChannel: interaction.channel,
      member: interaction.member,
    });

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setAuthor({ 
        name: lang.playSearchingTitle, 
        iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1252165467842416680/1667-yellow-gears.gif?ex=66adde77&is=66ac8cf7&hm=8d3ba3715a31cb5742cc5f3363742000cf559dfe01254e32af3fbad8f5c789a6&',
        url: "https://discord.gg/xQF9f9yUEM"
      })
      .setDescription(lang.playSearchingForSong.replace('{song}', song)); 

    await interaction.reply({ embeds: [embed] });
  },
};
