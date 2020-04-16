import { gql } from "apollo-server-micro";

export const UserPlaylistObject = gql`
  type UserPlaylistObject {
    collaborative: Boolean
    description: String
    external_urls: ExternalUrlObject
    href: String
    id: String
    images: [ImageObject]
    name: String
    owner: PublicUserObject
    primary_color: String
    public: Boolean
    snapshot_id: String
    tracks: UserPlaylistTrackObject # delta: this/missing followers prop
    type: String # playlist
    uri: String
  }
`;
