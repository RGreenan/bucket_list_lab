const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BucketList =  function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.entries = [];
};

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe('Bucket:entry-submitted', (event) => {
    this.postEntry(event.detail);
  });
  PubSub.subscribe('BucketEntry:delete-clicked', (event) => {
    this.deleteEntry(event.detail);
  });
  PubSub.subscribe('Bucket:status-changed', (event) => {
    this.updateStatus(event.detail);
  });
};

BucketList.prototype.getData = function () {
  this.request.get()
  .then((entries) => {
    this.entries = entries;
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

BucketList.prototype.deleteEntry = function (entryId) {
  this.request.delete(entryId)
  .then((entries) => {
    PubSub.publish('BucketList:data-loaded', entries);
  })
  .catch(console.error);
};

BucketList.prototype.updateStatus = function (entryId) {
  const entryToUpdate = this.entries;
  console.log(entryToUpdate);
  const payload = entryToUpdate.isComplete = !entryToUpdate.isComplete;
  this.request.update(entryId, payload)
  then((entries) => {
    PubSub.publish('BucketList:data-loaded', entries);
    console.log(entries);
  })
  .catch(console.error);
};

module.exports = BucketList;
