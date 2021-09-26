import fetch from "node-fetch";
import { CRYPTUM_TOKEN} from "../../config.js";

const getRand = (min = 1, max = 19) => {
	return Math.floor(Math.random() * (max - min) + min);
}

export default Object.freeze({
	/**
	 * Fetches image showing Halo MCC XP and returns body
	*/
	xp: async () => {
		return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/epicgamer007313/xp.jpg?v=1&bg=${getRand()}`)).body;
	},
	/**
	 * Fetches image showing Halo MCC game ranks and returns body
	*/
	ranks: async () => {
		return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/epicgamer007313/ranks.jpg?v=1&bg=${getRand()}`)).body;
	},
	/**
	 * Fetches Halo mcc statistics
	*/
	stats: async () => {
		return await (await fetch("https://halo.api.stdlib.com/mcc@0.1.0/stats?gamertag=epicgamer007313")).json();
	},
	/**
	 * Fetches Halo Clips
	*/
	clips: async () => {
		return await (await fetch("https://cryptum.halodotapi.com/games/hmcc/media/players/EpicGamer007313/clips", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Cryptum-Token ${CRYPTUM_TOKEN}`
			}
		})).json();
	},
	/**
	 * Returns the url for a halo clip
	 * @param {string} id - The id of the clip
	*/
	clip: (id) => {
		return `https://cryptum.halodotapi.com/games/hmcc/media/clips/901f660249eca-${id}`;
	}
});

/* async function getThumbnailForVideo(videoUrl) {
  const video = document.createElement("video");
  const canvas = document.createElement("canvas");
  video.style.display = "none";
  canvas.style.display = "none";

  // Trigger video load
  await new Promise((resolve, reject) => {
    video.addEventListener("loadedmetadata", () => {
      video.width = video.videoWidth;
      video.height = video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      // Seek the video to 25%
      video.currentTime = video.duration * 0.25;
    });
    video.addEventListener("seeked", () => resolve());
    video.src = videoUrl;
  });

  // Draw the thumbnail
  canvas
    .getContext("2d")
    .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const imageUrl = canvas.toDataURL("image/png");
  return imageUrl;
}
const image = document.createElement("img")
getThumbnailForVideo("video.mp4").then(res => {image.src = res;document.body.appendChild(image);}); */