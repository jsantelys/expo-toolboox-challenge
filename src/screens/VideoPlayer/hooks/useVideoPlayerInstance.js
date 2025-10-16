import { useEvent } from "expo";
import { useVideoPlayer } from "expo-video";
import { useMemo } from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectDownloadedVideoUri } from "../../../store/slices/downloadsSlice";

const useVideoPlayerInstance = (videoUrl, currentTime) => {
    const localUri = useAppSelector(selectDownloadedVideoUri(videoUrl));

    const resolvedVideoUrl = useMemo(() => {
        if (localUri) {
            return localUri;
        }
        return videoUrl;
    }, [localUri, videoUrl]);

    const player = useVideoPlayer(resolvedVideoUrl, (_player) => {
        _player.timeUpdateEventInterval = 1
        if (currentTime) {
            _player.currentTime = currentTime;
        }
        _player.play();
    });

    useEvent(player, 'playingChange');
    useEvent(player, 'statusChange');
    useEvent(player, 'timeUpdate');

    return {
        player,
    };
};

export default useVideoPlayerInstance;