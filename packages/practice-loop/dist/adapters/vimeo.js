function ignoreRejection(promise) {
    void promise.catch(() => undefined);
}
export function createVimeoAdapter(player) {
    let currentTime = 0;
    let playbackRate = 1;
    void player.getCurrentTime().then((time) => {
        currentTime = time;
    }).catch(() => undefined);
    void player.getPlaybackRate().then((rate) => {
        playbackRate = rate;
    }).catch(() => undefined);
    const onTimeUpdate = (data) => {
        if (typeof data.seconds === "number")
            currentTime = data.seconds;
    };
    const onPlaybackRateChange = (data) => {
        if (typeof data.playbackRate === "number")
            playbackRate = data.playbackRate;
    };
    player.on("timeupdate", onTimeUpdate);
    player.on("playbackratechange", onPlaybackRateChange);
    return {
        getCurrentTime: () => currentTime,
        setCurrentTime: (time) => {
            currentTime = time;
            ignoreRejection(player.setCurrentTime(time));
        },
        getPlaybackRate: () => playbackRate,
        setPlaybackRate: (rate) => {
            playbackRate = rate;
            ignoreRejection(player.setPlaybackRate(rate));
        },
        play: () => ignoreRejection(player.play()),
        pause: () => ignoreRejection(player.pause()),
    };
}
//# sourceMappingURL=vimeo.js.map