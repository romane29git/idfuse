const rootEndpoint =
  "https://app.idfuse.fr/api/crm/contact/search_email/?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&q=neva.dupont@idfuse.fr";

export class Contact {
  constructor(last_name, first_name, q) {
    this.last_name = last_name;
    this.first_name = first_name;
    this.q = q;
  }
}

class ContactsApi {
  async fetchContacts() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && typeof response === "object") {
      const contacts = response.contacts;
      return this.createContacts(contacts);
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  }

  async findContactById(q) {
    const contacts = await this.fetchFromApi(`${rootEndpoint}/${q}`);

    return this.createContact(contacts[0]);
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

  createContact(contact) {
    return new Contact(
      contact.last_name,
      contact.first_name,
      contact.q,
    );
  }

  createContacts(contacts) {
    if (!Array.isArray(contacts)) {
      console.error("Invalid contacts data");
      return [];
    }

    return contacts.map((contact) => this.createContact(contact));
  }
}

export default new ContactsApi();
