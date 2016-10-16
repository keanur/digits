import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Contacts = new Mongo.Collection('Contacts');

/**
 * Create the schema for Stuff
 */
export const ContactsSchema = new SimpleSchema({
  first: {
    label: 'first',
    type: String,
    optional: false,
    max: 100,
  },
  last: {
    label: 'last',
    type: String,
    optional: false,
    max: 100,
  },
  address: {
    label: 'address',
    type: String,
    optional: false,
    max: 100,
  },
  phone: {
    label: 'phone',
    type: String,
    optional: false,
    max: 100,
  },
  email: {
    label: 'email',
    type: String,
    optional: false,
    max: 100,
  },
});

Contacts.attachSchema(ContactsSchema);
