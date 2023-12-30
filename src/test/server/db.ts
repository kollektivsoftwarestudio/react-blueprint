import { ENTITY_TYPE, PRIMARY_KEY, factory, primaryKey } from "@mswjs/data";

const models = {
	user: {
		id: primaryKey(String),
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		teamId: String,
		role: String,
		bio: String,
		createdAt: Number,
	},
	team: {
		id: primaryKey(String),
		name: String,
		description: String,
		createdAt: Number,
	},
	discussion: {
		id: primaryKey(String),
		title: String,
		body: String,
		teamId: String,
		createdAt: Number,
	},
	comment: {
		id: primaryKey(String),
		body: String,
		authorId: String,
		discussionId: String,
		createdAt: Number,
	},
};

export const db = factory(models);

export type Model = keyof typeof models;

export type DbEntity<Key extends keyof typeof db> = Omit<
	ReturnType<(typeof db)[Key]["create"]>,
	typeof ENTITY_TYPE | typeof PRIMARY_KEY
>;

export const loadDb = () =>
	Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));

export const persistDb = (model: Model) => {
	if (process.env.NODE_ENV === "test") {
		return;
	}
	const data = loadDb();
	data[model] = db[model].getAll();
	window.localStorage.setItem("msw-db", JSON.stringify(data));
};

export const initializeDb = () => {
	const database = loadDb();
	// biome-ignore lint/complexity/noForEach: <explanation>
	Object.entries(db).forEach(([key, model]) => {
		const dataEntres = database[key];
		if (dataEntres) {
			// biome-ignore lint/complexity/noForEach: <explanation>
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			dataEntres?.forEach((entry: Record<string, any>) => {
				model.create(entry);
			});
		}
	});
};

export const resetDb = () => {
	window.localStorage.clear();
};

initializeDb();
