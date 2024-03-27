import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("book_tags", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("book_tags");
}

