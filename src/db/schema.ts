
import {
  pgTable,
  serial,
} from "drizzle-orm/pg-core";


export const bids = pgTable("bidder_bids", {
  id: serial("id").primaryKey(),
});
