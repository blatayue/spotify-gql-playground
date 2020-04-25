import { gql } from "apollo-server-micro";

export const PlaylistObject = gql`
  type PlaylistObject {
    collaborative: Boolean
    description: String
    external_urls: ExternalUrlObject
    followers: FollowersObject
    href: String
    id: String
    images: [ImageObject]
    name: String
    owner: PublicUserObject
    primary_color: String
    public: Boolean
    snapshot_id: String
    tracks: PagingObject #
    type: String # playlist
    uri: String
  }
`;
