import axios from "axios";

const rootEndpoint =
  "https://app.idfuse.fr/api/crm/company?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class Company {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}

export async function addCompany(newCompany) {
  try {
    console.log("Données de l'entreprise à ajouter :", newCompany);
    const response = await axios.post(rootEndpoint, newCompany, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Entreprise ajoutée avec succès");
    } else {
      throw new Error(
        "Erreur lors de l'ajout de l'entreprise. Statut de la réponse : " +
          response.status
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'entreprise :", error);
    throw error;
  }
}

class AddCompaniesApi {
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

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await axios.get(query, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  createCompany(company) {
    return new Company(company.id, company.name, company.address);
  }

  createCompanies(companies) {
    if (!Array.isArray(companies)) {
      console.error("Invalid companies data");
      return [];
    }

    return companies.map((company) => this.createCompany(company));
  }

  async getCompanyById(id) {
    const response = await this.fetchFromApi(`${rootEndpoint}&id=${id}`);

    if (response && typeof response === "object") {
      const company = response.company;
      return this.createCompany(company);
    } else {
      console.error("Invalid API response:", response);
      return null;
    }
  }
}

export async function getCompanyById(id) {
  const api = new AddCompaniesApi();
  const company = await api.getCompanyById(id);
  return company;
}

export default new AddCompaniesApi();
