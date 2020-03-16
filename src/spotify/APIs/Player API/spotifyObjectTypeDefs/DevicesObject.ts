import { gql } from "apollo-server-micro";
// GET https://api.spotify.com/v1/me/player/devices
export const DevicesObject = gql`
  type DevicesObject {
    devices: [DeviceObject]
  }
`;
