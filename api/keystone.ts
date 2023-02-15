import { config } from "@keystone-6/core";
import { lists } from "./schema";

import { session, withAuth } from "./modules/auth/auth";

export default withAuth(
	config({
		db: {
			provider: "sqlite",
			url: "file:./data/keystone.db",
		},
		lists,
		session,
	}),
);
