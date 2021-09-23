const db = require('../dbConfig');

const Cat = require('./cats');

class Owner {
    constructor(data) {
        this.id = data.id,
        this.name = data.name, 
        this.city = data.city
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let ownerData = await db.query(`SELECT * FROM owners WHERE id = $1;`, [id]);
                let owner = new Owner(ownerData.rows[0]);
                resolve(owner);
            } catch (err) {
                reject('can\'t find owner');
            }
        })
    }

    get cats() {
        return new Promise(async (resolve, reject) => {
            try {
                const catsData = await db.query(`SELECT * FROM cats WHERE owner_id = $1;`, [this.id]);
                const cats = catsData.rows[0].map(d => new Cat(d));
                resolve(cats);
            } catch (err) {
                reject('owner\'s catto cannot be found')
            }
        })
    }
}

module.exports = Owner;