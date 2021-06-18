import { Place } from "./types";

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0 || password.length <= 6)
    return "Password cannot be empty and needs at least 6 symbols.";

  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const ageValidator = (date: Date) => {};

export const licensePlateValidator = (licensePlate: string) => {
  console.log("mike gay");

  const re = new RegExp("([A-Z]){2}-([0-9]){2}-([0-9]){2}");
  const re2 = new RegExp("([0-9]){2}-([A-Z]){2}-([0-9]){2}");
  const re3 = new RegExp("([0-9]){2}-([0-9]){2}-([A-Z]){2}");
  const re4 = new RegExp("([A-Z]){2}-([0-9]){2}-([A-Z]){2}");
  const re5 = new RegExp("([A-Z]){2}-([A-Z]){2}-([0-9]){2}");
  const re6 = new RegExp("([0-9]){2}-([A-Z]){2}-([A-Z]){2}");

  console.log(re.test(licensePlate));
  console.log(licensePlate);
  if (!re.test(licensePlate) && !re2.test(licensePlate) &&!re3.test(licensePlate) &&!re4.test(licensePlate) && !re5.test(licensePlate) &&!re6.test(licensePlate)) return "Invalid license plate!";

  return "";
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const dateValidator = (date: Date) => {
  const d_now = new Date();
  return d_now.getTime() <= date.getTime();
};

export const validateLocation = ({
  latitude,
  longitude,
  description,
}: Place) => {
  if (latitude !== undefined && longitude !== undefined && description !== undefined) return true;
  return false;
};
