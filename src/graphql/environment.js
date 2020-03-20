const tables = {
  development: {
    Offer: "OfferDev",
    Student: "StudentDev",
    Company: "CompanyDev",
    Location: "LocationDev"
  },
  production: {
    Offer: "Offer",
    Student: "Student",
    Company: "Company",
    Location: "Location"
  }
};

const env = process.env.API_ENV || "development";

export const TABLES = tables[env];
