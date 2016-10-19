import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Contacts, ContactsSchema } from '../../api/contacts/contacts.js';

/* eslint-disable object-shorthand, no-unused-vars */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Contact_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Contacts');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ContactsSchema.namedContext('Edit_Contacts_Page');
});


Template.Edit_Contact_Page.helpers({
  contactField(fieldName) {
    const contact = Contacts.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return contact && contact[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Edit_Contact_Page.events({
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const first = event.target.first.value;
    const last = event.target.last.value;
    const address = event.target.address.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    const updatedContact = { first, last, address, phone, email };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ContactsSchema.clean(updatedContact);
    // Determine validity.
    instance.context.validate(updatedContact);
    if (instance.context.isValid()) {
      Contacts.update(FlowRouter.getParam('_id'), { $set: updatedContact });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Home_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});