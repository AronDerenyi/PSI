import Vue from "vue";
import VueRouter from "vue-router";
import App from "src/view/App.vue";

const agentRegex = /.*/;
const agentSupported = agentRegex.test(navigator.userAgent);

if (agentSupported) {
	const styleContext = require.context("res", true, /\.css$/);
	styleContext.keys().forEach(style => styleContext(style));

	Vue.use(VueRouter);
	new Vue({
		router: new VueRouter(),
		render: createElement => createElement(App),
	}).$mount("body");
} else {
	document.write(`
		<h1 style="padding: 56px; text-align: center; font-family: sans-serif;">
			Your browser isn't supported.<br>Use Google Chrome instead.
		</h1>
	`);
}
