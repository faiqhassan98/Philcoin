/* eslint-disable @typescript-eslint/no-explicit-any */
import  sendGrid  from "@sendgrid/mail";

export const sendEmail = (
  recipientEmail: string,
  // subject: string,
  // body: string
): Promise<any> => {
  console.log("AAAAAAAAAAAAAAAAA",recipientEmail)
  sendGrid.setApiKey("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");
  // setApiKey(process.env.PHILCOIN_KEY_SENDGRID as string);
  const params = {
    from: "marketing@philcoin.io",
    // from: process.env.FROM_EMAIL as string,
    to: recipientEmail,
    subject: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    html: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  };
  return sendGrid.send(params).then((result) => {
    console.log(result)
    return result;
  });
};
