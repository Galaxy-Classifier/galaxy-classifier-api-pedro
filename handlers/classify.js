module.exports = {
  async predict(request, response) {
    console.log('predict fired');
    response.send({ success: true });
  }
};