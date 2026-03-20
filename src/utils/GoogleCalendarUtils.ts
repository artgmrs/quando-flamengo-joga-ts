import { addHours } from "./DateUtils";

const generateGoogleCalendarLink = (nomeRival: string, dateString: string, mandante: boolean) => {
  const date = new Date(dateString);
  if (nomeRival !== undefined && date !== undefined)
  {
    const baseUrl = 'https://calendar.google.com/calendar/render';

    const eventTitle = mandante ? `Flamengo x ${nomeRival}` : `${nomeRival} x Flamengo`;
    const title = encodeURIComponent(eventTitle);
  
    const startDate = date.toISOString().replace(/[.]\d+/, '').replace(/[^a-zA-Z0-9]/g, '');
    const endDate = addHours(date, 2).toISOString().replace(/[.]\d+/, '').replace(/[^a-zA-Z0-9]/g, '');
    const timeZone = 'America/Sao_Paulo';
  
    const url = `${baseUrl}?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&ctz=${timeZone}`;

    return url;
  }
}

export { generateGoogleCalendarLink };