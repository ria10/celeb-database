const db = require('../dbConfig');

class Cat {
    constructor(data) {
        this.id = data.id,
        this.name = data.name,
        this.breed = data.breed
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const catsData = await db.query(`SELECT * FROM cats;`)
                console.log(catsData);
                const cats = catsData.rows.map(d => new Cat(d))
                resolve(cats);
            } catch (err) {
                reject('error retrieving cattos');
            }
        })
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let catsData = await db.query(`SELECT * FROM cats WHERE id = $1;`, [id]);
                let cat = new Cat(catsData.rows[0]);
                resolve(cat);
            } catch (err) {
                reject('error retrieving catto');
            }
        })
    }

    static findByOwner(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let catsData = await db.query(`SELECT * FROM cats WHERE ownerId = $1;`, [id]);
                let cat = new Cat(catsData.rows[0]);
                resolve(cat);
            } catch (err) {
                reject('error retrieving owner\'s catto');
            }
        })
    }

    static create(name, breed) {
        return new Promise(async (resolve, reject) => {
            try {
                let catsData = await db.query(`INSERT INTO cats (name, breed) VALUES ($1, $2) RETURNING *;`, [name, breed]);
                let newCat = new Cat(catsData.rows[0]);
                resolve(newCat);
            } catch (err) {
                reject('error creating catto');
            }
        })
    }

    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query(`DELETE FROM cats WHERE id = $1;`, [this.id]);
                resolve('catto was deleted');
            } catch (err) {
                reject('error deleting catto');
            }
        })
    }
}

module.exports = Cat;