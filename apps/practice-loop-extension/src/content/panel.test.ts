import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createLoopFromBoundary } from "./panel.js";

describe("createLoopFromBoundary", () => {
  it("sets A and keeps existing end when end is after new start", () => {
    const loop = createLoopFromBoundary({ start: 5, end: 10 }, 7, "a");
    assert.deepEqual(loop, { start: 7, end: 10 });
  });

  it("sets A and creates a 1-second window when no existing loop exists", () => {
    const loop = createLoopFromBoundary(null, 12, "a");
    assert.deepEqual(loop, { start: 12, end: 13 });
  });

  it("sets B and keeps existing start when start is before new end", () => {
    const loop = createLoopFromBoundary({ start: 5, end: 10 }, 8, "b");
    assert.deepEqual(loop, { start: 5, end: 8 });
  });

  it("sets B and creates a 1-second window before current time when no existing loop exists", () => {
    const loop = createLoopFromBoundary(null, 4, "b");
    assert.deepEqual(loop, { start: 3, end: 4 });
  });

  it("clamps B start to zero when current time is near zero", () => {
    const loop = createLoopFromBoundary(null, 0.2, "b");
    assert.deepEqual(loop, { start: 0, end: 0.2 });
  });
});
