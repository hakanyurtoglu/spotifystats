const spotifyApiUrl = "https://api.spotify.com/v1";

const spotifyApiRequest = async (
  accessToken: string,
  endPoint: string,
  options?: object
) => {
  const res = await fetch(`${spotifyApiUrl}/${endPoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    ...options,
    // next: { revalidate: 3 * 60 },
  });

  return res.json();
};

const getSpotifyProfile = async (accessToken: string) => {
  const res = await spotifyApiRequest(accessToken, "me");

  const data: SpotifyUser = {
    displayName: res["display_name"],
    images: res.images,
  };
  return data;
};

type SpotifyUser = {
  displayName: string;
  images: string[];
};

export { spotifyApiRequest, getSpotifyProfile };
