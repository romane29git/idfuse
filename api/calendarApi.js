const rootEndpoint =
  "https://app.idfuse.fr/api/crm/calendar/campaign?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class CalendarApi {
  async fetchCalendar() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && typeof response === "object") {
      const calendar = response.calendar;
      return this.createCalendar(calendar);
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

  createCalendar(calendarData) {
    return calendarData.map((item) => {
      const { start, end, title, description } = item;
      return new Calendar(start, end, title, description);
    });
  }
}

export default new CalendarApi();
