const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = getRandomThought(10);

  for (let i = 0; i < 10; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const email = `${first}${last}@gmail.com`;

    users.push({
      username: fullName,
      email,
    });
  }

  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete!');
  process.exit(0);
});