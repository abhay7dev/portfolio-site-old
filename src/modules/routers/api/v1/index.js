import express from "express";
const router = express.Router();

import fetch from "node-fetch";

import github from "../../../misc/github.js";

router.use(({ query: { code, state } }, res, next) => {

	if(!code) return res.send("No code in query parameters");
	if(!state) return res.send("No state in query parameters");
	if(global.stateCache.indexOf(state) < 0) return res.send("Invalid state in query parameters. Potential CSRF attack.");

	next();

});

router.get("/oauth", async (req, res) => {
	
	const { code, state } = req.query;
	
	delete global.stateCache[global.stateCache.indexOf(state)];
	
	try {
		const { access_token } = await github.getToken(code);
		const userData = await github.userData(access_token);
		if(userData.id) {
			res.json(userData);
		} else {
			throw new Error({message: `User data not returned`, info: userData});
		}
	} catch(err) {
		console.log(err);
		return res.send(err);
	}
});

export default router;