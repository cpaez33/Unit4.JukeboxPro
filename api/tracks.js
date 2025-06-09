import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistsByTrackAndUser } from "#db/queries/playlists";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.route("/:id/playlists").get(async (req, res) => {
  const playlists = await getPlaylistsByTrackAndUser(
    req.params.id,
    req.user.id
  );
  if (playlists.length === 0) {
    return res.status(404).send("track does not exist");
  }
  res.send(playlists);
});
