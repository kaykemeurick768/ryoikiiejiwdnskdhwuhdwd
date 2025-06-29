const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enviarregistro')
    .setDescription('Envia o menu fixo de registro ilegal no canal atual.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🚨 Registro Ilegal – SantaRJ')
      .setDescription('Clique no botão abaixo para iniciar o processo de **registro da facção ilegal**.\n\n📌 **Atenção:** Preencha corretamente com seus dados do FiveM.\n\n📝 Você vai precisar de:\n• Seu ID (FiveM)\n• Nome da Facção\n• Cargo (01 ou 02)')
      .setColor('Red')
      .setThumbnail('https://i.imgur.com/HrYxE84.png') // ou sua logo
      .setFooter({ text: `Santa RJ © Todos os direitos reservados • ${new Date().toLocaleDateString()}` });

    const button = new ButtonBuilder()
      .setCustomId('abrir_modal_registro')
      .setLabel('Registrar')
      .setStyle(ButtonStyle.Success)
      .setEmoji('📝');

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ content: '✅ Menu enviado com sucesso!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed], components: [row] });
  }
};
