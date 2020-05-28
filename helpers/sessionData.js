const sessionData = [];

console.log('hello! im session data')

function addSessionData(request, response, sessionId) {
  sessionData.push({ request, response, sessionId });
}

function removeSessionData(sessionId) {
  const index = sessionData.findIndex(element => element.sessionId === sessionId);
  sessionData.splice(index, 1);
}

function getSessionData(sessionId) {
  return sessionData.find(element => element.sessionId === sessionId);
}

module.exports = {
  addSessionData,
  removeSessionData,
  getSessionData
};