import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyBoundary, buildLoop } from "./panel.js";

describe("applyBoundary", () => {
  it("sets A and keeps existing end when end is after new start", () => {
    const partial = applyBoundary({ start: 5, end: 10 }, 7, "a");
    assert.deepEqual(partial, { start: 7, end: 10 });
  });

  it("sets A and clears end when no existing end is set", () => {
    const partial = applyBoundary({ start: null, end: null }, 12, "a");
    assert.deepEqual(partial, { start: 12, end: null });
  });

  it("sets A and clears end when existing end is before new start", () => {
    const partial = applyBoundary({ start: 5, end: 10 }, 15, "a");
    assert.deepEqual(partial, { start: 15, end: null });
  });

  it("sets B and keeps existing start when start is before new end", () => {
    const partial = applyBoundary({ start: 5, end: 10 }, 8, "b");
    assert.deepEqual(partial, { start: 5, end: 8 });
  });

  it("sets B and clears start when no existing start is set", () => {
    const partial = applyBoundary({ start: null, end: null }, 4, "b");
    assert.deepEqual(partial, { start: null, end: 4 });
  });

  it("sets B and clears start when existing start is after new end", () => {
    const partial = applyBoundary({ start: 5, end: 10 }, 3, "b");
    assert.deepEqual(partial, { start: null, end: 3 });
  });
});

describe("buildLoop", () => {
  it("returns a loop when both boundaries are set and start is before end", () => {
    const loop = buildLoop({ start: 5, end: 10 });
    assert.deepEqual(loop, { start: 5, end: 10 });
  });

  it("returns null when start is missing", () => {
    const loop = buildLoop({ start: null, end: 10 });
    assert.equal(loop, null);
  });

  it("returns null when end is missing", () => {
    const loop = buildLoop({ start: 5, end: null });
    assert.equal(loop, null);
  });

  it("returns null when start is not before end", () => {
    const loop = buildLoop({ start: 10, end: 5 });
    assert.equal(loop, null);
  });

  it("returns null when start equals end", () => {
    const loop = buildLoop({ start: 5, end: 5 });
    assert.equal(loop, null);
  });
});
