const addHours = (date: Date, hours: number) => {
  const dateCopy = new Date(date);

  dateCopy.setHours(dateCopy.getHours() + hours);

  return dateCopy;
}

const formatFullDate = (stringDate: string) => {
  const newDate = new Date(stringDate);
  return newDate.toLocaleString();
}

const formatDate = (stringDate: string) => {
  const newDate = new Date(stringDate);
  return newDate.toLocaleDateString("pt-BR");
}

const formatTime = (stringDate: string) => {
  const newDate = new Date(stringDate);
  return newDate.toLocaleTimeString("pt-BR").slice(0, 5);
}

export { addHours, formatFullDate, formatDate, formatTime };