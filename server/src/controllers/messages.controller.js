const messageFactory = require("../DAOs/factoryDAO/MessageDAOfactory.class");
const DAO = messageFactory.get();
const logger = require("../logger/logger");

async function addMessage(req, res) {
  const { from, msg } = req.body;
  try {
    const data = await DAO.addMessage(from, msg);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(error);
  }
}

async function getAllMessages(req, res) {
  try {
    const data = await DAO.getAllMessages();
    return res.status(200).json(data);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { addMessage, getAllMessages };
