export function createVideoElementAdapter(video) {
    return {
        getCurrentTime: () => video.currentTime,
        setCurrentTime: (t) => {
            video.currentTime = t;
        },
        getPlaybackRate: () => video.playbackRate,
        setPlaybackRate: (r) => {
            video.preservesPitch = true;
            video.playbackRate = r;
        },
        play: () => video.play(),
        pause: () => video.pause(),
    };
}
//# sourceMappingURL=video-element.js.map