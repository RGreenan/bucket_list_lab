const PubSub = require('../helpers/pub_sub.js');

const BucketFormView = function (form) {
  this.form = form;
};

BucketFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
};

BucketFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newEntry = this.createEntry(event.target);
  PubSub.publish('Bucket:entry-submitted', newEntry);
  event.target.reset();
};

BucketFormView.prototype.createEntry = function (form) {
  const newEntry = {
    activity: form.activity.value,
    age: form.age.value,
    location: form.location.value,
    isComplete: form.isComplete.value
  };
  return newEntry;
  console.log(newEntry);
};

module.exports = BucketFormView;
