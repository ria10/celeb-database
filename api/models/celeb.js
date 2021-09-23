const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');

class Celeb {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.age = data.age
        this.birthplace = data.birthplace
        this.awards = data.awards
    }
    static get all() {
        return new Promise( async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection('celebs').find().toArray();
                const celebs = data.map(d => new Celeb({...d, id: d._id}))
                resolve(celebs);
            } catch (err) {
                console.warn(err);
                reject("error retrieving celebs")
            }
        });
    }

    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let data = await db.collection('celebs').find({_id: ObjectId(id)}).toArray();
                let celeb = new Celeb({...data[0], id: data[0]._id});
                resolve(celeb);
            } catch (err) {
                console.warn(err);
                reject('can\'t find celeb');
            }
        });
    }

    static create(name, age, birthplace, awards) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('celebs').insertOne({name, age, birthplace, awards});
                let data = await db.collection('celebs').find({...birthplace, awards: awards})
                let newCeleb = new Celeb(data);
                resolve(newCeleb);
            } catch (err) {
                console.warn(err);
                reject('error creating celeb');
            }
        });
    }

    updateAge(age) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let updatedData = await db.collection('celebs').findOneAndUpdate({_id: ObjectId(this.id)}, {$set: {"age": age}}, {returnDocument: "after"}, {returnOriginal: false})
                let updatedCeleb = new Celeb(updatedData.value);
                resolve(updatedCeleb);
            } catch (err) {
                console.warn(err);
                reject('error updating celeb age');
            }
        })
    }

    updateAwards(awards) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let updatedData = await db.collection('celebs').findOneAndUpdate({_id: ObjectId(this.id)}, {$set : {awards: awards}}, {returnDocument: "after"}, {returnOriginal: false})
                let updatedCeleb = new Celeb(updatedData.value);
                resolve(updatedCeleb);
            } catch (err) {
                console.warn(err);
                reject('error updating celeb awards');
            }
        })
    }

    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('celebs').deleteOne({_id: ObjectId(this.id)});
                resolve('celeb was deleted');
            } catch(err) {
                console.warn(err);
                reject('error deleting celeb')
            }
        })
    }
}

module.exports = Celeb;

