import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "Scintel",      // database name
  "postgres",     // username
  "kathir373",// postgres password
  {
    host: "localhost",
    dialect: "postgres"
  }
);

export default sequelize;