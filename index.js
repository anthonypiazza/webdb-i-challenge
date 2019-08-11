const server = require('./server.js');

const db = require('./data/dbConfig.js')

const PORT = process.env.PORT || 4000;

server.get('/accounts', async (req, res) => {
  try{
    const accounts = await db('accounts');
    res.json(accounts);
  } catch(err){
    req.statusCode(500).json({ error: 'Failed to get accounts' })
  }
});

server.post('/accounts', async (req, res) => {
  try{
    const newUser = await db('accounts').insert({ name: 'Jake', budget: 100 });
    res.json(newUser);
  } catch(err){
    req.statusCode(500).json({ error: 'Failed to get accounts' })
  }
});

server.put('/accounts/:id', async (req, res) => {

  try{
    const updatedUser = await db('accounts').where({ id: 1 }).update({ name: 'James', budget: 16 });
    res.json(updatedUser);
  } catch(err){
    req.statusCode(500).json({ error: 'Failed to get accounts' })
  }
});



server.delete('/accounts/:id', async (req, res) => {
  try{
    const deletedUser = await db('accounts').where({ id: 1 }).del();
    res.json(deletedUser);
  } catch(err){
    req.statusCode(500).json({ error: 'Failed to get accounts' })
  }
});



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});