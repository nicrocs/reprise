export function createWistiaModernAdapter(player) {
    return {
        getCurrentTime: () => player.currentTime,
        setCurrentTime: (t) => {
            player.currentTime = t;
        },
        getPlaybackRate: () => player.playbackRate,
        setPlaybackRate: (r) => {
            player.playbackRate = r;
        },
        play: () => {
            void player.play();
        },
        pause: () => {
            player.pause();
        },
    };
}
//# sourceMappingURL=wistia-modern.js.map