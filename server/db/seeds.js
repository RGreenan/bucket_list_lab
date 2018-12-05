use bucketlist;
db.dropDatabase();

db.entries.insertMany([
  {
    activity: "Drive Route 66",
    age: "50",
    location: "America",
    isComplete: "false"
  },
  {
    activity: "Sky-Dive",
    age: "40",
    location: "Australia",
    isComplete: "false"
  },
  {
    activity: "Go to Harry Potter World",
    age: "30",
    location: "Orlando",
    isComplete: "false"
  }
]);
