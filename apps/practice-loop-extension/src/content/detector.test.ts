import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extractWistiaLegacyMediaId, extractYouTubeVideoId } from "./detector.js";

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
