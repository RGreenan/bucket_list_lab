const PubSub = require('../helpers/pub_sub.js');

const BucketView = function (container) {
  this.container = container;
};

BucketView.prototype.render = function (entry) {
  const entryContainer = document.createElement('div');
  entryContainer.id = 'entry';

  const activity = this.createHeader(entry.activity);
  entryContainer.appendChild(activity);

  const age = this.createDetail('Age', entry.age);
  entryContainer.appendChild(age);

  const location = this.createDetail('Location', entry.location);
  entryContainer.appendChild(location);

  const deleteButton = this.createDeleteButton(entry._id);
  entryContainer.appendChild(deleteButton);

  this.container.appendChild(entryContainer);
};

BucketView.prototype.createHeader = function (textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

BucketView.prototype.createDetail = function (label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  return detail;
};

BucketView.prototype.createDeleteButton = function (entryId) {
  const button = document.createElement('button');
  button.classList.add('delete-button');
  button.value = entryId;

  button.addEventListener('click', (event) => {
    PubSub.publish('BucketEntry:delete-clicked', event.target.value);
  });

  return button;
};
// add delete button!!!!!

module.exports = BucketView;
