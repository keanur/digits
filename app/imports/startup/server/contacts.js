import { Contacts } from '../../api/contacts/contacts.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const contactSeeds = [
  {
    first: 'Matthew',
    last: 'Murdock',
    address: '2248 Forest Avenue, New York, NY',
    phone: '646-888-2637',
    email: 'murdock@law.com',
  },
  {
    first: 'Jessica',
    last: 'Jones',
    address: '3364 Angus Road, New York, NY',
    phone: '718-594-9645',
    email: 'alias@gmail.com',
  },
  {
    first: 'Luke',
    last: 'Cage',
    address: '293 Redbud Drive, New York, NY',
    phone: '646-388-4099',
    email: 'heroes@hire.com',
  },
  {
    first: 'Danny',
    last: 'Rand',
    address: '4814 Morningview Lane, New York, NY',
    phone: '646-216-5373',
    email: 'danny@rand.com',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Contacts.find().count() === 0) {
  _.each(contactSeeds, function seedContacts(stuff) {
    Contacts.insert(stuff);
  });
}
