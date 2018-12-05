const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BucketList =  function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe('Bucket:entry-submitted', (event) => {
    this.postEntry(event.detail);
  });
};

BucketList.prototype.getData = function () {
  this.request.get()
  .then((entries) => {
    PubSub.publish('BucketList:data-loaded', entries);
  })
  .catch(console.error);
};

BucketList.prototype.postEntry = function (entry) {
  console.log(entry);
  this.request.post(entry)
  .then((entries) => {
    PubSub.publish('BucketList:data-loaded', entries);
    console.log(entries);
  })
  .catch(console.error);
};

// publish delete-clicked button

module.exports = BucketList;
