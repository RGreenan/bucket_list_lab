const BucketFormView = require('./views/bucket_form_view.js');
const BucketGridView = require('./views/bucket_grid_view.js');
const BucketList = require('./models/bucket_list.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const url = 'http://localhost:3000/api/entries';
  const entries = new BucketList(url);
  entries.bindEvents();
  entries.getData();

  const entryContainer = document.querySelector('div#entries');
  const bucketGridView = new BucketGridView(entryContainer);
  bucketGridView.bindEvents();

  const entriesForm = document.querySelector('form#entries-form');
  const entriesFormView = new BucketFormView(entriesForm);
  entriesFormView.bindEvents();
});
