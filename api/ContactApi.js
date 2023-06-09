class ContactApi {
  async fetchContactById(id) {
    try {
      const response = await fetch(
        `https://app.idfuse.fr/api/crm/contact/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching company data: ${error}`);
    }
  }

  async getContactById(id) {
    const contactData = await this.fetchContactById(id);
    return this.createContact(contactData);
  }

  createContact(contactData) {
    const contact = {
      id: contactData.contact.id,
      last_name: contactData.contact.name,
      first_name: contactData.contact.name,
      companies: contactData.contact.companies
        ? contactData.contact.companies.map((company) => {
            return {
              name: company.name,
            };
          })
        : [],
    };
    return contact;
  }
}

export default ContactApi;
