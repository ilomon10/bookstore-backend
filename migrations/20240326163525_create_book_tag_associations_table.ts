import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("book_tag_associations", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("books");
    table
      .uuid("tag_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("book_tags");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("book_tag_associations");
}
