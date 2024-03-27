import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("order_items", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table
      .uuid("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("orders");
    table
      .uuid("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("books");

    table.integer("quantity").notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("order_items");
}
