import {
  Entity,
  EntitySchema,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import secretValueGet from "../services/secretService.js";

const secretValue = process.env.SECRET_NAME;

const secretValueRes = secretValueGet(secretValue);
console.log(
  "----------------- Secret Value -------------------",
  secretValueRes?.Table_Name_User
);

export const User = new EntitySchema({
  name: "user",
  tableName: secretValue?.Table_Name_User || "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstName: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    documents: {
      target: "document",
      type: "one-to-many",
      inverseSide: "user",
    },
  },
});
