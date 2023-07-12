const rootEndpoint =
  "https://app.idfuse.fr/api/crm/company/{id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class Company {
  constructor(
    id,
    name,
    street,
    city,
    postal_code,
    country,
    customer_address,
    effectif,
    secteur,
    company_status,
    produit,
    registration_number,
    solution_crm
  ) {
    this.id = id;
    this.name = name;
    this.addresses = [
      {
        street: street,
        city: city,
        postal_code: postal_code,
        country: country,
        customer_address: customer_address,
      },
    ];
    // ...
  }
}

export async function editCompanyApi({ id, name, street, city, country }) {
  const endpoint = rootEndpoint.replace("{id}", id);

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      addresses: [
        {
          id: 24, // ID de l'adresse à modifier
          street,
          city,
          country,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("La modification de l'entreprise a échoué.");
  }
}
