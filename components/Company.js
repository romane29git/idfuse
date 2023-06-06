import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CompanyApi from "../api/companyApi";

const companyApi = new CompanyApi();

const Company = ({ route }) => {
  const [company, setCompany] = useState(null);
  const { name } = route.params;
  const companyId = route.params.id;
  console.log("Company ID:", companyId);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const fetchedCompany = await companyApi.getCompanyById(companyId);
        setCompany(fetchedCompany);
      } catch (error) {
        console.log("Error fetching company data:", error);
      }
    }

    fetchCompanyData();
  }, []);


  return (
    <View>
      {company ? (
        <>
          <Text>Entreprise : {name}</Text>
          <Text>Adresse : {company.address}</Text>
          <Text>Ville : {company.city}</Text>
          <Text>Code postal : {company.postal_code}</Text>
          <Text>Nb contacts : {company.nb_contacts}</Text>
        </>
      ) : (
        <Text>Loading company data...</Text>
      )}
    </View>
  );
};

export default Company;
