module.exports = {
  async predict(request, response) {
    const { files } = request;

    const imageRequest = [];
    for (const file of files) {
      imageRequest.push({ id: file.originalname, chunk_data: file.buffer })
    }

    request.grpcClients.Valentina.Resize({ imageRequest }, (error, info) => {
      if (error) {
        console.log(error);
        response.send(error);
      } else {
        console.info("Connection appears to be stablished")
      }

      response.send(info)
    });
  }
};