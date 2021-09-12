import { github } from "../../config.js";

import fetch from "node-fetch";

export default Object.freeze({
	/**
	 * Gets access token from github api
	 * @param {string} code - The code returned from user accepting oauth request
	 */
	getToken: async (code) => {
		return await (await fetch(`https://github.com/login/oauth/access_token?client_id=${github.CLIENT_ID}&client_secret=${github.CLIENT_SECRET}&code=${code}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		})).json();
	},
	/**
	 * Gets the github user data given the token returned from getToken()
	 * @param {string} access_token The access token
	 */
	userData: async (access_token) => {
		return await (await fetch(
			"https://api.github.com/user",
			{
				headers: {
					"Authorization": `token ${access_token}`,
					"Content-Type": "application/json"
				}
			}
		)).json();
	}
});