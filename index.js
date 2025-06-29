const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder
} = require('discord.js');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'abrir_modal_registro') {
    const modal = new ModalBuilder()
      .setCustomId('modal_registro')
      .setTitle('📋 Registro Ilegal – SantaRJ');

    const idInput = new TextInputBuilder()
      .setCustomId('id')
      .setLabel('🆔 Seu ID (FiveM)')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const facInput = new TextInputBuilder()
      .setCustomId('fac')
      .setLabel('🪪 Nome Da Facção')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const cargoInput = new TextInputBuilder()
      .setCustomId('cargo')
      .setLabel('🏅 Cargo Na Facção (01 Ou 02)')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const row1 = new ActionRowBuilder().addComponents(idInput);
    const row2 = new ActionRowBuilder().addComponents(facInput);
    const row3 = new ActionRowBuilder().addComponents(cargoInput);

    modal.addComponents(row1, row2, row3);
    await interaction.showModal(modal);
  }

  // TRATAMENTO DO ENVIO DO MODAL
  if (interaction.isModalSubmit() && interaction.customId === 'modal_registro') {
    const id = interaction.fields.getTextInputValue('id');
    const fac = interaction.fields.getTextInputValue('fac');
    const cargo = interaction.fields.getTextInputValue('cargo');

    const canalStaff = '1388538876397879537'; // troque pelo canal da sua staff

    const embed = new EmbedBuilder()
      .setTitle('📥 Novo Registro Ilegal Recebido')
      .addFields(
        { name: '🆔 ID', value: id, inline: true },
        { name: '🪪 Facção', value: fac, inline: true },
        { name: '🏅 Cargo', value: cargo, inline: true },
        { name: '👤 Usuário', value: `<@${interaction.user.id}>`, inline: false }
      )
      .setColor('Red')
      .setTimestamp();

    const canal = interaction.guild.channels.cache.get(canalStaff);
    if (canal) await canal.send({ embeds: [embed] });

    await interaction.reply({ content: '✅ Sua solicitação foi enviada para a staff.', ephemeral: true });
  }
});
