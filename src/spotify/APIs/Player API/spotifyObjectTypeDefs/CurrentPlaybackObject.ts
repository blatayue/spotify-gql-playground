import {gql} from 'apollo-server-micro'

export const CurrentPlaybackObject = gql`
    type CurrentPlayback {
    timestamp: Float,
    device: DeviceObject,
    progress_ms: Float,
    is_playing: Boolean,
    currently_playing_type: String,
    item: PagingItems,
    shuffle_state: Boolean,
    repeat_state: String,
    context: ContextObject
}
`
