const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    case "update":
      const changedContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.table(changedContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.table(deleteContact);
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
