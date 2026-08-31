import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractEmbedlyVimeoUrl,
  extractVimeoVideoId,
  extractWistiaLegacyMediaId,
  extractYouTubeVideoId,
} from "./detector.js";

function fakeElement(className: string): Element {
  return {
    classList: new Set(className.split(" ").filter(Boolean)),
  } as unknown as Element;
}

describe("extractWistiaLegacyMediaId", () => {
  it("returns the id from a wistia_async_ class", () => {
    const el = fakeElement("wistia_embed wistia_async_abc123");
    assert.equal(extractWistiaLegacyMediaId(el), "abc123");
  });

  it("returns null when no wistia_async_ class is present", () => {
    const el = fakeElement("wistia_embed foo_bar");
    assert.equal(extractWistiaLegacyMediaId(el), null);
  });
});

describe("extractYouTubeVideoId", () => {
  it("extracts a video id from a watch url", () => {
    assert.equal(
      extractYouTubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
      "dQw4w9WgXcQ",
    );
  });

  it("extracts a video id from a shorts url", () => {
    assert.equal(
      extractYouTubeVideoId("https://www.youtube.com/shorts/abc123"),
      "abc123",
    );
  });

  it("extracts a video id from an embed url", () => {
    assert.equal(
      extractYouTubeVideoId("https://www.youtube.com/embed/xyz789"),
      "xyz789",
    );
  });

  it("extracts a video id from a youtu.be url", () => {
    assert.equal(extractYouTubeVideoId("https://youtu.be/abc123"), "abc123");
  });

  it("returns null for non-youtube urls", () => {
    assert.equal(extractYouTubeVideoId("https://example.com"), null);
  });

  it("returns null for invalid urls", () => {
    assert.equal(extractYouTubeVideoId("not a url"), null);
  });
});

describe("extractVimeoVideoId", () => {
  it("extracts an id from a player url", () => {
    assert.equal(extractVimeoVideoId("https://player.vimeo.com/video/424186332?app_id=122963"), "424186332");
  });

  it("extracts an id from a public Vimeo url", () => {
    assert.equal(extractVimeoVideoId("https://vimeo.com/424186332/52528f92"), "424186332");
  });

  it("returns null for non-Vimeo urls", () => {
    assert.equal(extractVimeoVideoId("https://example.com/video/424186332"), null);
  });
});

describe("extractEmbedlyVimeoUrl", () => {
  it("unwraps the supplied protocol-relative Embedly url", () => {
    const embedly =
      "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F424186332%3Fapp_id%3D122963&url=https%3A%2F%2Fvimeo.com%2F424186332%2F52528f92";
    assert.equal(
      extractEmbedlyVimeoUrl(embedly),
      "https://player.vimeo.com/video/424186332?app_id=122963",
    );
  });

  it("returns null for non-Vimeo Embedly media", () => {
    assert.equal(
      extractEmbedlyVimeoUrl("https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fexample.com%2Fvideo"),
      null,
    );
  });
});
