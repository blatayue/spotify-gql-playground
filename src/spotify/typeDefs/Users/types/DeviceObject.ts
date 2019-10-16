import { gql } from "apollo-server-micro";

export const DeviceObject = gql`
  type DeviceObject {
    id: String
    is_active: Boolean
    is_private_session: Boolean
    is_restricted: Boolean
    name: String
    type: String
    volume_percent: Int
  }
`;
