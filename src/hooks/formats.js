export const formatPhone = (value) => {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  let formatted = "+998";
  if (digits.length > 0) formatted += " " + digits.slice(0, 2);
  if (digits.length > 2) formatted += " " + digits.slice(2, 5);
  if (digits.length > 5) formatted += " " + digits.slice(5, 7);
  if (digits.length > 7) formatted += " " + digits.slice(7, 9);
  return formatted;
};

export const formatCarNumber = (value) => {
  let v = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let formatted = "";
  if (v.length > 0) formatted += v.slice(0, 2);
  if (v.length > 2) formatted += v.slice(2, 3);
  if (v.length > 3) formatted += v.slice(3, 6);
  if (v.length > 6) formatted += v.slice(6, 8);
  return formatted;
};
