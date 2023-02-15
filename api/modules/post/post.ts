import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const Post = list({
	access: allowAll,
	fields: {
		title: text({ validation: { isRequired: true } }),
		content: document({
			formatting: true,
			layouts: [
				[1, 1],
				[1, 1, 1],
				[2, 1],
				[1, 2],
				[1, 2, 1],
			],
			links: true,
			dividers: true,
		}),

		author: relationship({
			ref: "User.posts",
			ui: {
				displayMode: "cards",
				cardFields: ["name", "email"],
				inlineEdit: { fields: ["name", "email"] },
				linkToItem: true,
				inlineConnect: true,
			},
			many: false,
		}),

		tags: relationship({
			ref: "Tag.posts",
			many: true,
			ui: {
				displayMode: "cards",
				cardFields: ["name"],
				inlineEdit: { fields: ["name"] },
				linkToItem: true,
				inlineConnect: true,
				inlineCreate: { fields: ["name"] },
			},
		}),
	},
});
