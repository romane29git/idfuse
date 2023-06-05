const API_URL = "https://app.idfuse.fr/api/crm/calendar/campaign?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data.tasks;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    return [];
  }
};
