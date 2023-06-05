const rootEndpoint =
  "https://app.idfuse.fr/api/crm/opportunity/1?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class Devis {
  constructor(name, companyName) {
    this.name = name;
    this.companyName = companyName;
  }
}

class DevisApi {
  async fetchDevis() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && response.success === 1 && response.pipeline) {
      const devis = this.createDevis(response);
      return [devis];
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
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

  createDevis(data) {
    const pipeline = data.pipeline;
    if (!pipeline) {
      console.error("Invalid devis data");
      return null;
    }
  
    const { name, companyName } = pipeline;
    return new Devis(name, companyName);
  }
  
  

  createSingleDevis(devisItem) {
    return new Devis(devisItem.name, devisItem.companyName);
  }
}

export default new DevisApi();