export const generateRandomString = (myLength: number) => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    () => chars[Math.floor(Math.random() * chars.length)]
  );
  const randomString = randomArray.join("");
  return randomString;
};
