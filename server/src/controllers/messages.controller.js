const messageFactory = require("../DAOs/factoryDAO/MessageDAOfactory.class");
const DAO = messageFactory.get();
const logger = require("../logger/logger");

async function addMessage(from, msg) {
  try {
    const data = await DAO.addMessage(from, msg);
    return data
  } catch (error) {
    logger.error(error);
  }
}

async function getAllMessages() {
  try {
    const data = await DAO.getAllMessages();
    return data
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { addMessage, getAllMessages };
