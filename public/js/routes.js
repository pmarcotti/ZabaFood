import about from "../pages/about.js";
import contact from "../pages/contact.js";
import home from "../pages/home.js";
import login from "../pages/login.js";
import notFound from "../pages/notFound.js";
import register from "../pages/register.js";

const urlPageTitle = "ZabaFood";

// Cria um escutador de evento de clique e verifica os links de navegação
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("nav a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// Cria um objeto para mapear a url para o page, titulo e descrição
const urlRoutes = {
	notFound: {
		page: notFound,
		title: "Not Found | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
		page: home,
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/about": {
		page: about,
		title: "Quem Somos | " + urlPageTitle,
		description: "This is the about page",
	},
	"/contact": {
		page: contact,
		title: "Contato | " + urlPageTitle,
		description: "This is the contact page",
	},
	"/login": {
		page: login,
		title: "Login | " + urlPageTitle,
		description: "This is the login page",
	},
	"/register": {
		page: register,
		title: "Register | " + urlPageTitle,
		description: "This is the register page",
	},
};

// Cria uma função que verifica a url e chama o urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event;
	event.preventDefault();

	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// Cria uma função para lidar com a localização da url
const urlLocationHandler = async () => {
	const location = window.location.pathname;

	if (location.length == 0) {
		location = "/";
	}

	const route = urlRoutes[location] || urlRoutes["notFound"];

	const root = document.getElementById("root");

	root.innerHTML = "";

	root.appendChild(await route.page());

	document.title = route.title;
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;
urlLocationHandler();