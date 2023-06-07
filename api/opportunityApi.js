const rootEndpoint =
  "https://app.idfuse.fr/api/crm/opportunity/1?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class Opportunity {
  constructor(name, companyName) {
    this.name = name;
    this.companyName = companyName;
  }
}

class OpportunityApi {
  async fetchOpportunity() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && response.success === 1 && response.pipeline) {
      const opportunity = this.createOpportunity(response);
      return [opportunity];
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

  createOpportunity(data) {
    const pipeline = data.pipeline;
    if (!pipeline) {
      console.error("Invalid Opportunity data");
      return null;
    }
  
    const { name, companyName } = pipeline;
    return new Opportunity(name, companyName);
  }
  
  createSingleOpportunity(opportunityItem) {
    return new Opportunity(opportunityItem.name, opportunityItem.companyName);
  }
}

export default new OpportunityApi();