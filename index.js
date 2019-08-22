const server = require('./server.js');

const db = require('./data/dbConfig.js')

const PORT = process.env.PORT || 4000;

server.get('/accounts', (req, res) => {
  db('accounts')
  .then(accounts => {
    res.status(200).json(accounts);
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to get accounts' })
  })
});

server.post('/accounts', (req, res) => {
  const newPost = req.body;

  if(!newPost.name || !newPost.budget){
    res.status(400).json({ error: "Need Body Data" })
  }else{
    db('accounts')
      .insert(newPost)
      .then(newAccountID => {
        res.status(201).json(newAccountID);
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to get accounts' })
      });
  }
});

server.put('/accounts/:id', (req, res) => {
  const changes = req.body;

  if(!changes.name || !changes.budget){
    res.status(400).json({ error: "Need Body Data" })
  }else{
    db('accounts')
      //can also be .where({id}) if { id } = req.params
      .where({ id: req.params.id })
      .update(changes)
      .then(updatedCount => {
        res.status(201).json(updatedCount)
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to get accounts' })
      })
  }
});



server.delete('/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(deletedCount => {
      res.status(200).json(deletedCount)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to get accounts' })
    })
});



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});