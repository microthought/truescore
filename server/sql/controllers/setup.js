const db = require('../db/db_index');
const animals = require('../../../docs/db_stubs/animals');
const seedDatabase = require('./seedDatabase');
const stats = require('./stats');
const seedWinLoss = require('../../../docs/tests/winloss');


module.exports = {
  dangerwipedatabase: {

    get: function(req, res){
      db.database.dropAllSchemas()
      .then(result => {
        db.User.sync();

        db.Choice.sync();

        db.Prompt.sync()

        .then(() => 
          db.Comparison.sync()
          .then(() => {
            seedDatabase();
            res.send("Done");

          })
        );

      });
    }
  },

  seedwinloss: {

    get: function(req, res){
      seedWinLoss();
      res.send('comparisons seeded');
    }
  },

  testroute: {
    get: function(req, res){
      
      // db.database.query(`select winnerId, count(*) from comparisons 
      // where promptId = 1 group by winnerId`)
      // .spread((results, metadata) => res.send(results))


      db.database.query(`select c.id, c.name, w.wins, l.losses from 
      choices as c left join 
      (select winnerId, count(*) as wins from comparisons where promptId = 1 group by winnerId)
      as w on c.id = w.winnerId
      left join 
      (select loserId, count(*) as losses from comparisons where promptId = 1 group by loserId)
      as l on c.id = l.loserId`)
      .spread((results, metadata) => res.send(results))

  

    }
  
  }

};