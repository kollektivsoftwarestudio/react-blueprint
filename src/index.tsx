import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./styles/global.css";
import { initMocks } from "./test/server";

initMocks().then(() => {
	const rootDivEl = document.getElementById("root");

	if (!rootDivEl) {
		throw new Error("Root element not found");
	}

	const root = ReactDOM.createRoot(rootDivEl);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
