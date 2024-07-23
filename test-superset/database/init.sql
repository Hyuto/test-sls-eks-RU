DROP DATABASE IF EXISTS spotify;
CREATE DATABASE spotify;
\c spotify;

DROP TABLE IF EXISTS main;
CREATE TABLE main (
  id SERIAL,
  track VARCHAR(300),
  album_name VARCHAR(200),
  artist VARCHAR(100),
  release_date DATE,
  isrc VARCHAR(50),
  all_time_rank INT,
  track_score FLOAT,
  spotify_streams BIGINT,
  spotify_playlist_count BIGINT,
  spotify_playlist_reach BIGINT,
  spotify_popularity INT,
  youtube_views BIGINT,
  youtube_likes BIGINT,
  tiktok_posts BIGINT,
  tiktok_likes BIGINT,
  tiktok_views BIGINT,
  youtube_playlist_reach BIGINT,
  apple_music_playlist_count INT,
  airplay_spins BIGINT,
  siriusxm_spins INT,
  deezer_playlist_count INT,
  deezer_playlist_reach BIGINT,
  amazon_playlist_count INT,
  pandora_streams BIGINT,
  pandora_track_stations BIGINT,
  soundcloud_streams BIGINT,
  shazam_counts BIGINT,
  explicit_track INT,
  PRIMARY KEY (id)
);

COPY main(track,album_name,artist,release_date,isrc,all_time_rank,track_score,spotify_streams,spotify_playlist_count,spotify_playlist_reach,spotify_popularity,youtube_views,youtube_likes,tiktok_posts,tiktok_likes,tiktok_views,youtube_playlist_reach,apple_music_playlist_count,airplay_spins,siriusxm_spins,deezer_playlist_count,deezer_playlist_reach,amazon_playlist_count,pandora_streams,pandora_track_stations,soundcloud_streams,shazam_counts,explicit_track)
FROM '/docker-entrypoint-initdb.d/data-2.csv'
DELIMITER ','
CSV HEADER;