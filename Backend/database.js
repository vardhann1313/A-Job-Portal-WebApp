const mysql = require("mysql2/promise");
require('dotenv').config()

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      Database.instance = this;
    }
  }

  async getConnection() {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.log("Error while getting connection ", error);
      throw error;
    }
  }
}

module.exports = new Database();
