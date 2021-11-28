export default () => {
	loginListeners();
	logoutListeners();
}

export const loginListeners = (selector = ".github_login") => {
	document.querySelectorAll(selector).forEach((button) => {
		button.addEventListener("click", () => {
			location.pathname = "/login";
		});
	});
}

export const logoutListeners = (selector = ".github_login") => {
	document.querySelectorAll(".github_logout").forEach((button) => {
		button.addEventListener("click", () => {
			fetch("/logout", {
				method: "POST"
			}).then((resp) => {
				console.log(resp);
				location.reload();
			}).catch((err) => {
				console.err(err);
				location.reload();
			});
		});
	});
}