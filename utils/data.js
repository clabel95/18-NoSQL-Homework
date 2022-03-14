const names = [
    'Clay',
    'Bob',
    'Frank',
    'Joe',
    'Jack',
    'Grace',
    'Jeff',
    'Lucas',
    'Guy',
    'Dude',
    'Buddy',
    'Pal',
    'Mark'
  ];
  
const text = [
  'I dont know what I am doing',
  'Do any of us even know who we really are?',
  'What is the point of all of this',
  'I love coding!',
  'I wish I could just get a job',
  'Last week of class!'
];

const possibleReactions = [
  'This was awesome',
  'Thank you for that',
  'I dont quite understand',
  'You are wrong and the wost kind of person',
  'I agree whole heartedly',
];
 
 

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
const getRandomThought = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(text),
      username: getRandomName(),
      reactions: [...getThoughtReactions(2)],
    });
  }
  return results;
};
const getThoughtReactions = (int) => {
 if (int === 1) {
   return getRandomArrItem(possibleReactions);
 }
 let results = [];
 for (let i = 0; i < int; i++) {
   results.push({
     reactionBody: getRandomArrItem(possibleReactions),
     username: getRandomName(),
   });
 }
 return results;
};

module.exports = { getRandomName, getRandomThought };