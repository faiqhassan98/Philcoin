import { createLogger } from "winston";
import config from "../config/winston";

export const serverLogger = createLogger(config("Server"));

export const dbLogger = createLogger(config("Database"));
export const usersLogger = createLogger(config("User"));
export const adminsLogger = createLogger(config("Admin"));
export const categoryLogger = createLogger(config('Category'));
// export const contactUsLogger = createLogger(config('ContactUs'));
// export const faqsLogger = createLogger(config('Faqs'));
// export const settingLogger = createLogger(config('Settings'));
// export const categoriesLogger = createLogger(config('Categories'));
export const validatorLogger = createLogger(config("Validator"));
// export const requestsLogger = createLogger(config('Requests'));
