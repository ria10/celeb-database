const db = connect("mongodb://localhost:27017/celebs");

db.celebs.drop()

db.celebs.insertMany([
    {name: 'Madonna', age: 63, birthplace: 'Bay City, Michigan', awards: 256},
    {name: 'Beyoncé', age: 40, birthplace: 'Houston, Texas', awards: 594},
    {name: 'Rihanna', age: 33, birthplace: 'Saint Michael, Barbados', awards: 234},
    {name: 'Jay Z', age: 51, birthplace: 'Brookyln, New York', awards: 250},
    {name: 'Drake', age: 34, birthplace: 'Toronto, Canada', awards: 192}
])

