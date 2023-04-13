import {RoomOptions, VideoPresets} from 'livekit-client';

const roomConfig: RoomOptions = {
  adaptiveStream: {
    pixelDensity: 'screen',
  },
  publishDefaults: {
    videoSimulcastLayers: [VideoPresets.h720, VideoPresets.h1080],
    simulcast: false,
  },
  // optimize publishing bandwidth and CPU for published tracks
  dynacast: false,
  videoCaptureDefaults: {
    facingMode: 'environment',
    resolution: VideoPresets.h720,
  },
};
export default roomConfig;
