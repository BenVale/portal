export default function (req, res, next) {
  var users = [
    {name: 'Bob Joe', id: 'sjd63jd7dme9', email: 'bobjoe@fakeemail.com'},
    {name: 'Jimmy Joe', id: 'd8fhdj37fy54', email: 'jimmyjoe@fakeemail.com'}
  ];

  // send a string as the response
  res.end(JSON.stringify(users));
}