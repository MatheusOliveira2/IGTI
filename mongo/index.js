const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://matheus:db123456@bootcamp.8o9uh.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});
