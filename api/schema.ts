import type { Lists } from ".keystone/types";
import { Groupe } from "./modules/goupe/groupe";
import { Message } from "./modules/messages/messages";
import { User } from "./modules/user/user";

export const lists: Lists = {
	User,
	Groupe,
	Message,
};
