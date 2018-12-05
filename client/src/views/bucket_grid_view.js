const PubSub = require('../helpers/pub_sub.js');
const BucketView = require('./bucket_view.js');

const  BucketGridView = function (container) {
  this.container = container;
};

BucketGridView.prototype.bindEvents = function () {
  PubSub.subscribe('BucketList:data-loaded', (event) => {
    this.render(event.detail);
  });
};

BucketGridView.prototype.render = function (entries) {
  this.container.innerHTML = '';
  const bucketView = new BucketView(this.container);
  entries.forEach((entry) => bucketView.render(entry));
};

module.exports = BucketGridView;
