export const initMocks = () => {
	if (process.env.NODE_ENV !== "production") {
		const { worker } = require("./browser");
		return worker.start();
	}
};
