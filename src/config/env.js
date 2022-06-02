const env = {
  database: 'p2p',
  username: 'root',
  password: '1',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
  key: {
    SECRET: "09f26e402586e2faa8da4c98a35f1b20d6b033c60 ",
    REFRESH_SECRET: "qweqhchaose1231casdq09wd9123"
  }
};
module.exports = env;