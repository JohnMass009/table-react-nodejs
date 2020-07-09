const queries = require('./queries');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({
  'extended': true
}))

app.get('/items', queries.getItems);
app.get('/items-count', queries.getItemsCount);

const PORT = process.env.PORT || 6003;
app.listen(PORT, () => {
  console.log('Server is running')
})

