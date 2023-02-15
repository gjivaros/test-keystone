import type { Lists } from ".keystone/types";
import { Tag } from "./modules/Tag/Tag";
import { Post } from "./modules/post/post";
import { Task } from "./modules/task/Task";
import { User } from "./modules/user/user";

export const lists: Lists = {
	User,
	Post,
	Tag,
	Task,
};
