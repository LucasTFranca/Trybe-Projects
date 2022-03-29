const { sale } = require('../database/models');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('changeStatus', async ({ id, status }) => {
    await sale.update({ status }, { where: { id } });

    const { dataValues } = await sale.findByPk(id);

    io.emit('refreshStatus', { id: dataValues.id, status: dataValues.status });
  });
});
