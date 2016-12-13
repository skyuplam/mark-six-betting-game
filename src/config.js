const config = {
  db: {
    url: 'http://146.185.133.230:5984',
  },
}

const env = process.env.NODE_ENV;
if (env !== 'production') {
  config.db.url = 'http://localhost:32769'
}


export default config;
