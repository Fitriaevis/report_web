const connection = require('../config/database');

class Model_Users {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users ORDER BY id_user DESC', (err, rows) => {
                if (err) {
                    console.error("Error fetching users:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', data, (err, result) => {
                if (err) {
                    console.error("Error storing user:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    // bagian login di cek lagi
    static async login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // tidak menemukan id_user untuk melakukan login.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id_user = ?', [id], (err, rows) => {
                if (err) {
                    console.error("Error fetching user by ID:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id_user = ?', [data, id], (err, result) => {
                if (err) {
                    console.error("Error updating user:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id_user = ?', [id], (err, result) => {
                if (err) {
                    console.error("Error deleting user:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Users;
