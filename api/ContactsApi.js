const rootEndpoint =
  "https://app.idfuse.fr/api/crm/contact/search_email/?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&q=neva.dupont@idfuse.fr";

export class Contact {
  constructor(first_name, mail) {
    this.first_name = first_name;
    this.mail = mail;
  }
}

class ContactsApi {
  async fetchContacts() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (
      response &&
      Array.isArray(response.items) &&
      response.items.length > 0
    ) {
      const contactData = response.items[0];
      return this.createContact(contactData);
    } else {
      console.error("No contact found or invalid API response:", response);
      return null;
    }
  }

  async findContactByEmail(email) {
    const contact = await this.fetchFromApi(`${rootEndpoint}/${email}`);
    return this.createContact(contact);
  }

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await fetch(query);
      const content = await response.json();
      return content;
    } catch (e) {
      console.error(e);
    }
  }

  createContact(response) {
    if (response && response.mail) {
      const { mail } = response;
      console.log(response);
      return new Contact("", mail); // Mettez à jour les arguments du constructeur selon vos besoins
    } else {
      console.error("No contact found or invalid API response:", response);
      return null;
    }
  }


  // createContacts(contacts) {
  //   if (!Array.isArray(contacts)) {
  //     console.error("Invalid contacts data");
  //     return [];
  //   }

  //   return contacts.map((contact) => this.createContact(contact));
  // }
}

export default new ContactsApi();
