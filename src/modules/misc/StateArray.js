// https://stackoverflow.com/questions/50066309/how-to-auto-remove-elements-out-of-an-array-after-x-minutes-in-javascript

export default class extends Array {

	constructor(seconds = 300) {
		super(...arguments);
		this.seconds = seconds;
	}

	push() {
		const i1 = this.length;
		const i2 = super.push(...arguments);
		setTimeout(() => {
			for (let i = i1; i < i2; i++) delete this[i];
		}, this.seconds * 1000);
		return i2;
	}
}