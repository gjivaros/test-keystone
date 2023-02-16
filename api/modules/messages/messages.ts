import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
export const Message = list({
	access: allowAll,
	fields: {
		content: document({
			formatting: true,
			dividers: true,
			links: true,
			layouts: [
				[1, 1],
				[1, 1, 1],
			],
		}),
		createAt: timestamp({ defaultValue: { kind: "now" } }),
		user: relationship({ ref: "User.messages" }),
		groupe: relationship({
			ref: "Groupe.messages",
			isFilterable: true,
		}),
	},
});
