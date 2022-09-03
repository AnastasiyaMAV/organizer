const { NODE_ENV, PROD_DB } = process.env;
const DEV_DB = 'mongodb://localhost:27017/organizerdb';

module.exports.URL_DB = NODE_ENV === 'production' ? PROD_DB : DEV_DB;

module.exports.SETUP_DB = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports.messages = {
  deletedMovie: 'Удаление фильма прошло успешно',
};