// Import necessary modules
import pool from '../config/db.js'; // Ensure to include the .js extension
// Create User Table
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE
    );
  `;
  
  await pool.query(query);
  console.log('Users table created successfully'); // Move this message inside the function after successful creation
};

createUserTable();

// Add a new user to the DB (for signup)
const addUser = async (name, email, hashedPassword, isAdmin = false) => {
  const query = `INSERT INTO users (fullname, username, email, password, isAdmin) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  
  const values = [name ,email, hashedPassword, isAdmin];
  const result = await pool.query(query, values);
  
  return result.rows[0];
};

// Find a user by username (for login)
const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1`;
  
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

// Export functions using ES module syntax
export { addUser, findUserByUsername };
