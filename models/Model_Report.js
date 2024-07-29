const connection = require('../config/database');

class Model_Report {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM report ORDER BY id_report DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM report WHERE id_report = ?' + id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO report SET ?', Data, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    console.log(err)
                }   
            });
        });
    }
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE report SET ? WHERE id_report = ' + id, Data, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM report WHERE id_report = ' + id, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Report;