export function createWistiaLegacyAdapter(video) {
    return {
        getCurrentTime: () => video.time(),
        setCurrentTime: (t) => {
            video.time(t);
        },
        getPlaybackRate: () => video.playbackRate(),
        setPlaybackRate: (r) => {
            video.playbackRate(r);
        },
        play: () => {
            video.play();
        },
        pause: () => {
            video.pause();
        },
    };
}
//# sourceMappingURL=wistia-legacy.js.map