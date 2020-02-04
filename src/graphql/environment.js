const tables = {
  development: {
    Offer: "OfferDev",
    Bonus: "BonusDev",
    Student: "StudentDev",
    Company: "CompanyDev",
    Location: "LocationDev"
  },
  production: {
    Offer: "Offer",
    Bonus: "Bonus",
    Student: "Student",
    Company: "Company",
    Location: "Location"
  }
};

const env = process.env.NODE_ENV || "development";

export const TABLES = tables[env];
