"use client";

type Listener = () => void;

let done = false;
const listeners = new Set<Listener>();

export const loaderState = {
  isDone: () => done,
  complete() {
    if (done) return;
    done = true;
    listeners.forEach((fn) => fn());
  },
  reset() {
    done = false;
  },
  subscribe(fn: Listener) {
    if (done) {
      fn();
      return () => undefined;
    }
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
