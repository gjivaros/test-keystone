import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";

export const Groupe = list({
	access: allowAll,
	fields: {
		name: text(),
		users: relationship({
			ref: "User",
			many: true,
		}),
		messages: relationship({
			ref: "Message.groupe",
			many: true,
		}),
	},
});
