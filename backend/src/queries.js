const Pool = require('pg').Pool;
const configDB = require('./config');

const pool = new Pool(configDB);

const getItemsCount = (request, response) => {
  pool.query('SELECT count(*) AS exact_count FROM "ITEMS"', (error, res) => {
    if (error) {
      console.log(error)
      return response.json({
        "error": "Something went wrong",
        "status": false
      })
    }

    if (res.rows.length > 0) {
      return response.json(res.rows)
    } else {
      return response.json({
        "error": "No items found",
        "status": false
      })
    }
  })
}

const getItems = (request, response) => {
  const limit = parseInt(request.query.limit);
  const offset = parseInt(request.query.offset);

  pool.query('SELECT * FROM "ITEMS" LIMIT $1 OFFSET $2', [limit, offset], (error, res) => {
    if (error) {
      console.log(error)
      return response.json({
        "error": "Something went wrong",
        "status": false
      })
    }

    if (res.rows.length > 0) {
      return response.json({
        "status": true,
        items: res.rows
      })
    } else {
      return response.json({
        "error": "No items found",
        "status": false
      })
    }
  })
}

module.exports = {
  getItems,
  getItemsCount
}