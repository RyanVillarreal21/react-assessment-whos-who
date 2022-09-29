import React, { useEffect, useState } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import styled from "styled-components";

import ProgressBar from "../components/ProgressBar";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import fetchFromSpotify from "../services/api";
import Loading from "../components/Loading";
import { Howl } from "howler";

const TOKEN_KEY = "whos-who-access-token";
const GENRE_KEY = "genreKey";
const SONGS_KEY = "songsKey";
const ARTISTS_KEY = "artistsKey";
const RESULTS_KEY = "RESULTS_KEY";
const ROUNDS_KEY = "roundsKey";

const StyledContainer = styled.div`
  & header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }
  & header h1 {
    margin: 0;
  }
  & div.flex-row {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
    margin: 1rem;
  }
`;

const randomLetter = () =>
  "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));

const randomChoices = (arr, count) =>
  arr.sort(() => Math.random() - 0.5).slice(0, count);

const Game = () => {
  const [renderOverride, updateRenderOverride] = useState();
  const [token, setToken] = useState("");
  const [initialSong, updateInitialSong] = useState();
  const [songs, updateSongs] = useState();
  const [artists, updateArtists] = useState();

  const [config, updateConfig] = useState({
    retrievedGenre: JSON.parse(localStorage.getItem(GENRE_KEY)),
    retrievedSongs: Number.parseInt(
      JSON.parse(localStorage.getItem(SONGS_KEY))
    ),
    retrievedArtists: Number.parseInt(
      JSON.parse(localStorage.getItem(ARTISTS_KEY))
    ),
    retrievedRounds: Number.parseInt(
      JSON.parse(localStorage.getItem(ROUNDS_KEY))
    ),
  });

  if (
    config.retrievedGenre === null ||
    config.retrievedSongs === null ||
    config.retrievedArtists === null ||
    config.retrievedRounds === null
  )
    return <Redirect to="/" />;

  /* * * Game * * */
  const [game, updateGame] = useState({
    tries: Math.max(config.retrievedArtists - 2, 1) * config.retrievedRounds,
    rounds: config.retrievedRounds,
    results: [],
  });

  const testCorrect = (artist, correct) => (event) => {
    if (correct && game.results.length === game.rounds - 1) {
      const newGameState = {
        ...game,
        results: [...game.results, config.retrievedArtists - artists.length],
      };

      localStorage.setItem(
        RESULTS_KEY,
        JSON.stringify({ game: newGameState, win: true })
      );
      updateRenderOverride(<Redirect to="result" />);
    } else if (correct) {
      updateGame({
        ...game,
        results: [...game.results, config.retrievedArtists - artists.length],
      });

      updateInitialSong(undefined);
    } else {
      updateArtists(artists.filter((a) => a.artist !== artist));
      updateGame({ ...game, tries: game.tries - 1 });

      if (game.tries <= 0) {
        localStorage.setItem(RESULTS_KEY, JSON.stringify({ game, win: false }));
        updateRenderOverride(<Redirect to="result" />);
      }
    }
  };

  const play = (audio) => (event) => {
    songs.forEach(({ audio }) => audio.stop());
    audio.play();
  };

  const stop = (audio) => (event) => {
    audio.stop();
  };
  /* * * Game * * */

  const getRandomSong = async (genre) => {
    const response = await fetchFromSpotify({
      token,
      endpoint: "search",
      params: {
        q: `${randomLetter()} genre:${genre}`,
        type: "track",
        offset: Math.floor(Math.random() * 4),
        limit: "50",
      },
    });

    songs?.forEach(({ audio }) => audio.stop());

    updateInitialSong(response.tracks.items[Math.floor(Math.random() * 20)]);
    setTimeout(() => {
      updateArtists(null);
      updateSongs(null);
    }, 300);
  };

  const getArtists = async () => {
    const originalArtist = await fetchFromSpotify({
      token,
      endpoint: `artists/${initialSong.artists[0].id}`,
    });

    const artistsResponse = await fetchFromSpotify({
      token,
      endpoint: `artists/${initialSong.artists[0].id}/related-artists`,
    });

    updateArtists(
      randomChoices(artistsResponse.artists, config.retrievedArtists - 1)
        .map((artist) => ({ correct: false, artist }))
        .concat([{ correct: true, artist: originalArtist }])
        .sort(() => Math.random() - 0.5)
    );
  };

  const getSongs = async () => {
    const songsResponse = await fetchFromSpotify({
      token,
      endpoint: `search`,
      params: {
        q: `artist:${initialSong.artists[0].name}`,
        type: "track",
      },
    });

    const audio = (songSrc) =>
      new Howl({
        src: songSrc,
        html5: true,
      });

    const song_choices = randomChoices(
      songsResponse.tracks.items.filter((song) => song.preview_url !== null),
      config.retrievedSongs
    );

    if (song_choices.length < config.retrievedSongs) {
      updateInitialSong(undefined);
    } else {
      updateSongs(
        song_choices.map((song) => ({
          song,
          audio: audio(song.preview_url),
        }))
      );
    }
  };

  useEffect(() => {
    if (!token) {
      const storedTokenString = localStorage.getItem(TOKEN_KEY);
      if (storedTokenString) {
        const storedToken = JSON.parse(storedTokenString);
        if (storedToken.expiration > Date.now()) {
          setToken(storedToken.value);
        } else {
          return updateRenderOverride(<Redirect to="/" />);
        }
      } else {
        return updateRenderOverride(<Redirect to="/" />);
      }
    }

    if (token && !initialSong) getRandomSong(config.retrievedGenre);
    if (token && initialSong && artists === null) getArtists();
    if (token && initialSong && songs === null) getSongs();
  });

  if (renderOverride) {
    songs?.forEach(({ audio }) => audio.stop());
  }

  return renderOverride ? (
    renderOverride
  ) : !initialSong || !songs || !artists ? (
    <Loading />
  ) : (
    <StyledContainer>
      <Route path="/" />
      <header>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h1 style={{ position: "relative" }}>
            Who's Who?
            <span
              style={{
                position: "absolute",
                fontSize: "0.5em",
                bottom: "-0.7em",
                right: "0.25em",
              }}
            >
              {config.retrievedGenre}
            </span>
          </h1>
        </Link>
        <ProgressBar
          round={game?.results?.length}
          rounds={game?.rounds}
          tries={game?.tries}
        />
      </header>
      <main>
        <div className="flex-row" id="songs">
          {songs === null || songs === undefined
            ? Array(config.retrievedSongs)
                .fill(null)
                .map((none, idx) => <SongCard key={idx} />)
            : songs.map(({ song, audio }, idx) => (
                <SongCard
                  key={idx}
                  title={song.name}
                  onPlay={play(audio)}
                  onStop={stop(audio)}
                />
              ))}
        </div>
        <div className="flex-row" id="artists">
          {artists === null || artists === undefined
            ? Array(config.retrievedArtists)
                .fill(null)
                .map((none, idx) => <ArtistCard key={idx} />)
            : artists.map(({ artist, correct }, idx) => (
                <ArtistCard
                  key={idx}
                  picSrc={artist?.images[0]?.url}
                  name={artist.name}
                  onClick={testCorrect(artist, correct)}
                />
              ))}
        </div>
      </main>
    </StyledContainer>
  );
};

export default Game;
