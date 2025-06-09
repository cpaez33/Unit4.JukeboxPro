import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user1 = await createUser("christopherP", "abcd123");

  const user2 = await createUser("edwardP", "xyz4321");

  for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
      await createPlaylist(
        "Playlist " + i,
        "lorem ipsum playlist description",
        user2.id
      );
    } else {
      await createPlaylist(
        "Playlist " + i,
        "lorem ipsum playlist description",
        user1.id
      );
    }
    // await createPlaylist("Playlist " + i, "lorem ipsum playlist description");
    await createTrack("Track " + i, i * 50000);
  }
  for (let i = 1; i <= 15; i++) {
    if (i <= 10) {
      const playlistIdOneOrTwo = i % 2 === 0 ? 2 : 1;
      await createPlaylistTrack(playlistIdOneOrTwo, i);
    }
    const playlistId = i + 1;
    await createPlaylistTrack(playlistId, i);
  }
}
