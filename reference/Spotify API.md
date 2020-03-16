# API Reference

## Albums API

- ### Calls
    - Get Multiple Albums
        - #### `GET https://api.spotify.com/v1/albums`
    - Get an Album
        - #### `GET https://api.spotify.com/v1/albums/{id}`
    - Get an Album's Tracks
        - #### `GET https://api.spotify.com/v1/albums/{id}/tracks`
## Artists API

- ### Calls
    - Get Multiple Artists
        - #### `GET https://api.spotify.com/v1/artists`
    - Get an Artist
        - #### `GET https://api.spotify.com/v1/artists/{id}`
    - Get an Artist's Albums
        - #### `GET https://api.spotify.com/v1/artists/{id}/albums`
    - Get an Artist's Top Tracks
        - #### GET `https://api.spotify.com/v1/artists/{id}/top-tracks`
    - Get an Artist's Related Artists
        - #### `GET https://api.spotify.com/v1/artists/{id}/related-artists`

## Browse API

- ### Calls
    - Get All Categories
        - #### `GET https://api.spotify.com/v1/browse/categories`
    - Get a Category
        - #### `GET https://api.spotify.com/v1/browse/categories/{category_id}`
    - Get a Category's Playlists
        - #### `GET https://api.spotify.com/v1/browse/categories/{category_id}/playlists`
    - Get Recommendations
        - #### `GET https://api.spotify.com/v1/recommendations`
    - Get Recommendation Genres
        - #### `GET https://api.spotify.com/v1/recommendations/available-genre-seeds`
    - Get All New Releases
        - #### `GET https://api.spotify.com/v1/browse/new-releases`
    - Get All Featured Playlists
        - #### `GET https://api.spotify.com/v1/browse/featured-playlists`

## Library API

- ### Calls
    - Remove User's Saved Tracks
        - #### `DELETE https://api.spotify.com/v1/me/tracks`
        - #### Scopes: `user-library-modify`
    - Save Albums for Current User
        - #### `PUT https://api.spotify.com/v1/me/albums?ids={ids}`
        - #### Scopes: `user-library-modify`
    - Save Tracks for User
        - #### `PUT https://api.spotify.com/v1/me/tracks`
        - #### Scopes: `user-library-modify`
    - Check User's Saved Albums
        - #### `GET https://api.spotify.com/v1/me/albums/contains`
        - #### Scopes: `user-library-read`
    - Remove Albums for Current User
        - #### `DELETE https://api.spotify.com/v1/me/albums?ids={ids}`
        - #### Scopes: `user-library-modify`
    - Get User's Saved Tracks
        - #### `GET https://api.spotify.com/v1/me/tracks`
        - #### Scopes: `user-library-read`
    - Check User's Saved Tracks
        - #### `GET https://api.spotify.com/v1/me/tracks/contains`
        - #### Scopes: `user-library-read`
    - Get User's Saved Albums
        - #### `GET https://api.spotify.com/v1/me/albums`
        - #### Scopes: `user-library-read`

## Follow API

- ### Calls
    - Get Following State for Artists/Users
        - #### `GET https://api.spotify.com/v1/me/following/contains`
        - #### Scopes: `playlist-read-private` (if requested private playlist)
    - Check if Users Follow a Playlist
        - #### `GET https://api.spotify.com/v1/playlists/{playlist_id}/followers/contains`
    - Follow Artists or Users
        - #### `PUT https://api.spotify.com/v1/me/following`
        - #### Scopes: `user-follow-modify`
    - Follow a Playlist
        - #### `PUT https://api.spotify.com/v1/playlists/{playlist_id}/followers`
        - #### Default Public
        - #### Scopes: (Optional) `playlist-modify-private`
    - Get User's Followed Artists
        - #### `GET https://api.spotify.com/v1/me/following`
        - #### Scopes: `user-follow-modify`
    - Unfollow Artists or Users
        - #### `DELETE https://api.spotify.com/v1/me/following`
        - #### Scopes: `user-follow-modify` 
    - Unfollow Playlist
        - #### `DELETE https://api.spotify.com/v1/playlists/{playlist_id}/followers`
        - #### Scopes:
            - #### Public (-ly followed): playlist-modify-public
            - #### Private (-ly followed): playlist-modify-private

## Personalization API
- ### Calls
    - Get a User's Top Artists and Tracks
        - #### `GET https://api.spotify.com/v1/me/top/{type}`

## Player API

- ### Calls
    - Transfer a User's Playback
        - #### `PUT https://api.spotify.com/v1/me/player`
        - #### Scopes: `user-modify-playback-state`
    - Skip User’s Playback To Next Track
        - #### `POST https://api.spotify.com/v1/me/player/next`
        - #### Scopes: `user-modify-playback-state`
    - Pause a User's Playback
        - #### `PUT https://api.spotify.com/v1/me/player/pause`
        - #### Scopes: `user-modify-playback-state`
    - Seek To Position In Currently Playing Track
        - #### `PUT https://api.spotify.com/v1/me/player/seek`
        - #### Scopes: `user-modify-playback-state`
    - Skip User’s Playback To Previous Track
        - #### `POST https://api.spotify.com/v1/me/player/previous`
        - #### Scopes: `user-modify-playback-state`
    - Get Current User's Recently Played Tracks
        - #### `GET https://api.spotify.com/v1/me/player/recently-played`
        - #### Scopes: `user-read-recently-played`
    - Get Information About The User's Current Playback
        - #### `GET https://api.spotify.com/v1/me/player`
    - Get the User's Currently Playing Track
        - #### `GET https://api.spotify.com/v1/me/player/currently-playing`
        - #### Scopes: `user-read-currently-playing` and/or `user-read-playback-state scope`
    - Get a User's Available Devices
        - #### `GET https://api.spotify.com/v1/me/player/devices`
        - #### Scopes: `user-read-playback-state`
    - Start/Resume a User's Playback
        - #### `PUT https://api.spotify.com/v1/me/player/play`
        - #### Scopes: `user-modify-playback-state`
    - Set Volume For User's Playback
        - #### `PUT https://api.spotify.com/v1/me/player/volume`
        - #### Scopes: `user-modify-playback-state`
    - Toggle Shuffle For User’s Playback
        - #### `PUT https://api.spotify.com/v1/me/player/shuffle`
        - #### Scopes: `user-modify-playback-state`
    - Set Repeat Mode On User’s Playback
        - #### `PUT https://api.spotify.com/v1/me/player/repeat`
        - #### Scopes: `user-modify-playback-state`

## Playlists API

-   ### Calls
    - Get a Playlist's Tracks
        - #### `GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks`
    - Replace a Playlist's Tracks
        - #### `PUT https://api.spotify.com/v1/playlists/{playlist_id}/tracks`
        - #### Scopes:
            - #### Public: `playlist-modify-public`
            - #### Private: `playlist-modify-private`
    - Change a Playlist's Details
        - #### `PUT https://api.spotify.com/v1/playlists/{playlist_id}`
        - #### Scopes:
            - #### Public: `playlist-modify-public`
            - #### Private: `playlist-modify-private`
    - Remove Tracks from a Playlist
        - #### `DELETE https://api.spotify.com/v1/playlists/{playlist_id}/tracks`
        - #### Scopes:
            - #### Public: `playlist-modify-public`
            - #### Private: `playlist-modify-private`
    - Get a Playlist
        - #### `GET https://api.spotify.com/v1/playlists/{playlist_id}`
    - Get a Playlist Cover Image
        - #### `GET https://api.spotify.com/v1/playlists/{playlist_id}/images`
    - Get a List of Current User's Playlists
        - #### `GET https://api.spotify.com/v1/me/playlists`
        - #### Scopes:
            - #### Public: `playlist-read-public`
            - #### Private: `playlist-read-collaborative`
    - Create a Playlist
        - #### `POST https://api.spotify.com/v1/users/{user_id}/playlists`
        - #### Scopes:
            - #### Public: `playlist-modify-public`
            - #### Private: `playlist-modify-private`
    - Reorder a Playlist's Tracks
        - #### `PUT https://api.spotify.com/v1/playlists/{playlist_id}/tracks`
        - #### Scopes:
            - #### Public: `playlist-modify-public`
            - #### Private: `playlist-modify-private`
    - Add Tracks to a Playlist
        - #### `POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks`
        - #### Scopes:
            - #### Public: `playlist-modify-public`
            - #### Private: `playlist-modify-private`
    - Get a List of a User's Playlists
        - #### `GET https://api.spotify.com/v1/users/{user_id}/playlists`
        - #### Scopes:
            - #### Public: `playlist-read-public`
            - #### Private: `playlist-read-collaborative`
    - Upload a Custom Playlist Cover Image
        - #### `PUT https://api.spotify.com/v1/playlists/{playlist_id}/images`
        - #### Scopes:
            - #### Public: `ugc-image-upload` and `playlist-modify-public`
            - #### Private: `ugc-image-upload` and `playlist-modify-private`

## Search API
- ### Calls
    - Search for an Item
        - #### `GET https://api.spotify.com/v1/search`

## Tracks API
- ### Calls
    - Get Audio Features for a Track
        - #### `GET https://api.spotify.com/v1/audio-features/{id}`
    - Get Several Tracks
        - #### `GET https://api.spotify.com/v1/tracks`
    - Get Audio Analysis for a Track
        - #### `GET https://api.spotify.com/v1/audio-analysis/{id}`
    - Get a Track
        - #### `GET https://api.spotify.com/v1/tracks/{id}`
    - Get Audio Features for Several Tracks
        - #### `GET https://api.spotify.com/v1/audio-features`

## User Profile API
- ### Calls
    - Get a User's Profile
        - #### `GET https://api.spotify.com/v1/users/{user_id}`
    - Get Current User's Profile
        - #### `GET https://api.spotify.com/v1/me`
        - #### Scopes: (Optional)
            - #### Scopes: `user-read-email` and/or `user-read-private` 
