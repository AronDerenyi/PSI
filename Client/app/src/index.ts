import Vue from "vue";
import App from "src/view/App.vue";

const agentRegex = /.*/;
const agentSupported = agentRegex.test(navigator.userAgent);

if (agentSupported) {
	const styleContext = require.context("res", true, /\.css$/);
	styleContext.keys().forEach(style => styleContext(style));

	const vue = new Vue({
		render: createElement => createElement(App),
	})

	document.write(`<div id="app"></div>`)
	vue.$mount("#app");
} else {
	document.write(`
		<h1 style="padding: 56px; text-align: center; font-family: sans-serif;">
			Your browser isn't supported.<br>Use Google Chrome instead.
		</h1>
	`);
}
