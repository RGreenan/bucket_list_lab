use bucketlist;
db.dropDatabase();

db.entries.insertMany([
  {
    activity: "Drive Route 66",
    age: "50",
    location: "America"
  },
  {
    activity: "Sky-Dive",
    age: "40",
    location: "Australia"
  },
  {
    activity: "Go to Harry Potter World",
    age: "30",
    location: "Orlando"
  }
]);
