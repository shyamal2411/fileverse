import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  EntitySchema,
} from "typeorm";
import { User } from "./User.js";
import secretValueGet from "../services/secretService.js";

const secretValue = "termassignment-b00958501-secretname";

const secretValueRes = await secretValueGet(secretValue);
console.log(
  "----------------- Secret Value -------------------",
  secretValueRes?.Table_Name_Document
);

export const Document = new EntitySchema({
  name: "document",
  tableName: secretValue?.Table_Name_Document || "document",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    url: {
      type: "varchar",
    },
    userId: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    user: {
      target: "user",
      type: "many-to-one",
      joinColumn: { name: "userId" },
      inverseSide: "documents",
    },
  },
});
