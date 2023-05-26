const rootEndpoint =
  "https://app.idfuse.fr/api/crm/company/all?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&api=1";

export class Company {
  constructor(id, name, city, postal_code) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.postal_code = postal_code;
  }
}

class companiesApi {
  async fetchCompanies() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && typeof response === "object") {
      const companies = response.companies;
      return this.createCompanies(companies);
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  }

  async findCompanyById(id) {
    const companies = await this.fetchFromApi(`${rootEndpoint}/${id}`);

    return this.createCompany(companies[0]);
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

  async addCompany(newCompany) {
    try {
      const response = await fetch("https://app.idfuse.fr/api/crm/company?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });
  
      if (response.ok) {
        console.log("Entreprise ajoutée avec succès");
      } else {
        throw new Error("Erreur lors de l'ajout de l'entreprise. Statut de la réponse : " + response.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
      throw error;
    }
  }
  


  createCompany(company) {
    return new Company(
      company.id,
      company.name,
      company.city,
      company.postal_code
    );
  }

  createCompanies(companies) {
    if (!Array.isArray(companies)) {
      console.error("Invalid companies data");
      return [];
    }

    return companies.map((company) => this.createCompany(company));
  }
}

export default new companiesApi();
