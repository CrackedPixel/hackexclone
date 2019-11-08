const config = {
  server_port: 5000,
  jwt_secret: "secret_phrase",
  jwt_expires: 300,
  access: {
      student: 0,
      instructor: 1,
      administrator: 2,
      super: 3
  }
};

module.exports = config
