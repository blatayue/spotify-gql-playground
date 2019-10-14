import { gql } from "apollo-server-micro";

export const PlaylistObject = gql`
  type PlaylistObject {
    collaborative: Boolean
    external_urls: ExternalUrlObject
    href: String
    id: String
    images: [ImageObject]
    name: String
    owner: PublicUserObject
    public: Boolean
    snapshot_id: String
    tracks: [Tracks]
    type: String # playlist
    uri: String
  }
`;
