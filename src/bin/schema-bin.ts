// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

"use strict";
System.register(
  "https://deno.land/std@v0.51.0/fmt/colors",
  [],
  function (exports_1, context_1) {
    "use strict";
    var noColor, enabled;
    var __moduleName = context_1 && context_1.id;
    function setColorEnabled(value) {
      if (noColor) {
        return;
      }
      enabled = value;
    }
    exports_1("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
      return enabled;
    }
    exports_1("getColorEnabled", getColorEnabled);
    function code(open, close) {
      return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
      };
    }
    function run(str, code) {
      return enabled
        ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
        : str;
    }
    function reset(str) {
      return run(str, code([0], 0));
    }
    exports_1("reset", reset);
    function bold(str) {
      return run(str, code([1], 22));
    }
    exports_1("bold", bold);
    function dim(str) {
      return run(str, code([2], 22));
    }
    exports_1("dim", dim);
    function italic(str) {
      return run(str, code([3], 23));
    }
    exports_1("italic", italic);
    function underline(str) {
      return run(str, code([4], 24));
    }
    exports_1("underline", underline);
    function inverse(str) {
      return run(str, code([7], 27));
    }
    exports_1("inverse", inverse);
    function hidden(str) {
      return run(str, code([8], 28));
    }
    exports_1("hidden", hidden);
    function strikethrough(str) {
      return run(str, code([9], 29));
    }
    exports_1("strikethrough", strikethrough);
    function black(str) {
      return run(str, code([30], 39));
    }
    exports_1("black", black);
    function red(str) {
      return run(str, code([31], 39));
    }
    exports_1("red", red);
    function green(str) {
      return run(str, code([32], 39));
    }
    exports_1("green", green);
    function yellow(str) {
      return run(str, code([33], 39));
    }
    exports_1("yellow", yellow);
    function blue(str) {
      return run(str, code([34], 39));
    }
    exports_1("blue", blue);
    function magenta(str) {
      return run(str, code([35], 39));
    }
    exports_1("magenta", magenta);
    function cyan(str) {
      return run(str, code([36], 39));
    }
    exports_1("cyan", cyan);
    function white(str) {
      return run(str, code([37], 39));
    }
    exports_1("white", white);
    function gray(str) {
      return run(str, code([90], 39));
    }
    exports_1("gray", gray);
    function bgBlack(str) {
      return run(str, code([40], 49));
    }
    exports_1("bgBlack", bgBlack);
    function bgRed(str) {
      return run(str, code([41], 49));
    }
    exports_1("bgRed", bgRed);
    function bgGreen(str) {
      return run(str, code([42], 49));
    }
    exports_1("bgGreen", bgGreen);
    function bgYellow(str) {
      return run(str, code([43], 49));
    }
    exports_1("bgYellow", bgYellow);
    function bgBlue(str) {
      return run(str, code([44], 49));
    }
    exports_1("bgBlue", bgBlue);
    function bgMagenta(str) {
      return run(str, code([45], 49));
    }
    exports_1("bgMagenta", bgMagenta);
    function bgCyan(str) {
      return run(str, code([46], 49));
    }
    exports_1("bgCyan", bgCyan);
    function bgWhite(str) {
      return run(str, code([47], 49));
    }
    exports_1("bgWhite", bgWhite);
    /* Special Color Sequences */
    function clampAndTruncate(n, max = 255, min = 0) {
      return Math.trunc(Math.max(Math.min(n, max), min));
    }
    /** Set text color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function rgb8(str, color) {
      return run(str, code([38, 5, clampAndTruncate(color)], 39));
    }
    exports_1("rgb8", rgb8);
    /** Set background color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function bgRgb8(str, color) {
      return run(str, code([48, 5, clampAndTruncate(color)], 49));
    }
    exports_1("bgRgb8", bgRgb8);
    /** Set text color using 24bit rgb. */
    function rgb24(str, color) {
      return run(
        str,
        code([
          38,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 39),
      );
    }
    exports_1("rgb24", rgb24);
    /** Set background color using 24bit rgb. */
    function bgRgb24(str, color) {
      return run(
        str,
        code([
          48,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 49),
      );
    }
    exports_1("bgRgb24", bgRgb24);
    return {
      setters: [],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        /**
             * A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
             * on npm.
             *
             * ```
             * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
             * console.log(bgBlue(red(bold("Hello world!"))));
             * ```
             *
             * This module supports `NO_COLOR` environmental variable disabling any coloring
             * if `NO_COLOR` is set.
             */
        noColor = Deno.noColor;
        enabled = !noColor;
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/testing/diff",
  [],
  function (exports_2, context_2) {
    "use strict";
    var DiffType, REMOVED, COMMON, ADDED;
    var __moduleName = context_2 && context_2.id;
    function createCommon(A, B, reverse) {
      const common = [];
      if (A.length === 0 || B.length === 0) {
        return [];
      }
      for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
        if (
          A[reverse ? A.length - i - 1 : i] ===
            B[reverse ? B.length - i - 1 : i]
        ) {
          common.push(A[reverse ? A.length - i - 1 : i]);
        } else {
          return common;
        }
      }
      return common;
    }
    function diff(A, B) {
      const prefixCommon = createCommon(A, B);
      const suffixCommon = createCommon(
        A.slice(prefixCommon.length),
        B.slice(prefixCommon.length),
        true,
      ).reverse();
      A = suffixCommon.length
        ? A.slice(prefixCommon.length, -suffixCommon.length)
        : A.slice(prefixCommon.length);
      B = suffixCommon.length
        ? B.slice(prefixCommon.length, -suffixCommon.length)
        : B.slice(prefixCommon.length);
      const swapped = B.length > A.length;
      [A, B] = swapped ? [B, A] : [A, B];
      const M = A.length;
      const N = B.length;
      if (!M && !N && !suffixCommon.length && !prefixCommon.length) {
        return [];
      }
      if (!N) {
        return [
          ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
          ...A.map((a) => ({
            type: swapped ? DiffType.added : DiffType.removed,
            value: a,
          })),
          ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ];
      }
      const offset = N;
      const delta = M - N;
      const size = M + N + 1;
      const fp = new Array(size).fill({ y: -1 });
      /**
         * INFO:
         * This buffer is used to save memory and improve performance.
         * The first half is used to save route and last half is used to save diff
         * type.
         * This is because, when I kept new uint8array area to save type,performance
         * worsened.
         */
      const routes = new Uint32Array((M * N + size + 1) * 2);
      const diffTypesPtrOffset = routes.length / 2;
      let ptr = 0;
      let p = -1;
      function backTrace(A, B, current, swapped) {
        const M = A.length;
        const N = B.length;
        const result = [];
        let a = M - 1;
        let b = N - 1;
        let j = routes[current.id];
        let type = routes[current.id + diffTypesPtrOffset];
        while (true) {
          if (!j && !type) {
            break;
          }
          const prev = j;
          if (type === REMOVED) {
            result.unshift({
              type: swapped ? DiffType.removed : DiffType.added,
              value: B[b],
            });
            b -= 1;
          } else if (type === ADDED) {
            result.unshift({
              type: swapped ? DiffType.added : DiffType.removed,
              value: A[a],
            });
            a -= 1;
          } else {
            result.unshift({ type: DiffType.common, value: A[a] });
            a -= 1;
            b -= 1;
          }
          j = routes[prev];
          type = routes[prev + diffTypesPtrOffset];
        }
        return result;
      }
      function createFP(slide, down, k, M) {
        if (slide && slide.y === -1 && down && down.y === -1) {
          return { y: 0, id: 0 };
        }
        if (
          (down && down.y === -1) ||
          k === M ||
          (slide && slide.y) > (down && down.y) + 1
        ) {
          const prev = slide.id;
          ptr++;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = ADDED;
          return { y: slide.y, id: ptr };
        } else {
          const prev = down.id;
          ptr++;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = REMOVED;
          return { y: down.y + 1, id: ptr };
        }
      }
      function snake(k, slide, down, _offset, A, B) {
        const M = A.length;
        const N = B.length;
        if (k < -N || M < k) {
          return { y: -1, id: -1 };
        }
        const fp = createFP(slide, down, k, M);
        while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
          const prev = fp.id;
          ptr++;
          fp.id = ptr;
          fp.y += 1;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
      }
      while (fp[delta + offset].y < N) {
        p = p + 1;
        for (let k = -p; k < delta; ++k) {
          fp[k + offset] = snake(
            k,
            fp[k - 1 + offset],
            fp[k + 1 + offset],
            offset,
            A,
            B,
          );
        }
        for (let k = delta + p; k > delta; --k) {
          fp[k + offset] = snake(
            k,
            fp[k - 1 + offset],
            fp[k + 1 + offset],
            offset,
            A,
            B,
          );
        }
        fp[delta + offset] = snake(
          delta,
          fp[delta - 1 + offset],
          fp[delta + 1 + offset],
          offset,
          A,
          B,
        );
      }
      return [
        ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ...backTrace(A, B, fp[delta + offset], swapped),
        ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
      ];
    }
    exports_2("default", diff);
    return {
      setters: [],
      execute: function () {
        (function (DiffType) {
          DiffType["removed"] = "removed";
          DiffType["common"] = "common";
          DiffType["added"] = "added";
        })(DiffType || (DiffType = {}));
        exports_2("DiffType", DiffType);
        REMOVED = 1;
        COMMON = 2;
        ADDED = 3;
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/testing/asserts",
  [
    "https://deno.land/std@v0.51.0/fmt/colors",
    "https://deno.land/std@v0.51.0/testing/diff",
  ],
  function (exports_3, context_3) {
    "use strict";
    var colors_ts_1, diff_ts_1, CAN_NOT_DISPLAY, AssertionError;
    var __moduleName = context_3 && context_3.id;
    function format(v) {
      let string = Deno.inspect(v);
      if (typeof v == "string") {
        string = `"${string.replace(/(?=["\\])/g, "\\")}"`;
      }
      return string;
    }
    function createColor(diffType) {
      switch (diffType) {
        case diff_ts_1.DiffType.added:
          return (s) => colors_ts_1.green(colors_ts_1.bold(s));
        case diff_ts_1.DiffType.removed:
          return (s) => colors_ts_1.red(colors_ts_1.bold(s));
        default:
          return colors_ts_1.white;
      }
    }
    function createSign(diffType) {
      switch (diffType) {
        case diff_ts_1.DiffType.added:
          return "+   ";
        case diff_ts_1.DiffType.removed:
          return "-   ";
        default:
          return "    ";
      }
    }
    function buildMessage(diffResult) {
      const messages = [];
      messages.push("");
      messages.push("");
      messages.push(
        `    ${colors_ts_1.gray(colors_ts_1.bold("[Diff]"))} ${
          colors_ts_1.red(colors_ts_1.bold("Actual"))
        } / ${colors_ts_1.green(colors_ts_1.bold("Expected"))}`,
      );
      messages.push("");
      messages.push("");
      diffResult.forEach((result) => {
        const c = createColor(result.type);
        messages.push(c(`${createSign(result.type)}${result.value}`));
      });
      messages.push("");
      return messages;
    }
    function isKeyedCollection(x) {
      return [Symbol.iterator, "size"].every((k) => k in x);
    }
    function equal(c, d) {
      const seen = new Map();
      return (function compare(a, b) {
        // Have to render RegExp & Date for string comparison
        // unless it's mistreated as object
        if (
          a &&
          b &&
          ((a instanceof RegExp && b instanceof RegExp) ||
            (a instanceof Date && b instanceof Date))
        ) {
          return String(a) === String(b);
        }
        if (Object.is(a, b)) {
          return true;
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
          if (seen.get(a) === b) {
            return true;
          }
          if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
            return false;
          }
          if (isKeyedCollection(a) && isKeyedCollection(b)) {
            if (a.size !== b.size) {
              return false;
            }
            let unmatchedEntries = a.size;
            for (const [aKey, aValue] of a.entries()) {
              for (const [bKey, bValue] of b.entries()) {
                /* Given that Map keys can be references, we need
                             * to ensure that they are also deeply equal */
                if (
                  (aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
                  (compare(aKey, bKey) && compare(aValue, bValue))
                ) {
                  unmatchedEntries--;
                }
              }
            }
            return unmatchedEntries === 0;
          }
          const merged = { ...a, ...b };
          for (const key in merged) {
            if (!compare(a && a[key], b && b[key])) {
              return false;
            }
          }
          seen.set(a, b);
          return true;
        }
        return false;
      })(c, d);
    }
    exports_3("equal", equal);
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
      if (!expr) {
        throw new AssertionError(msg);
      }
    }
    exports_3("assert", assert);
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     */
    function assertEquals(actual, expected, msg) {
      if (equal(actual, expected)) {
        return;
      }
      let message = "";
      const actualString = format(actual);
      const expectedString = format(expected);
      try {
        const diffResult = diff_ts_1.default(
          actualString.split("\n"),
          expectedString.split("\n"),
        );
        message = buildMessage(diffResult).join("\n");
      } catch (e) {
        message = `\n${colors_ts_1.red(CAN_NOT_DISPLAY)} + \n\n`;
      }
      if (msg) {
        message = msg;
      }
      throw new AssertionError(message);
    }
    exports_3("assertEquals", assertEquals);
    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     */
    function assertNotEquals(actual, expected, msg) {
      if (!equal(actual, expected)) {
        return;
      }
      let actualString;
      let expectedString;
      try {
        actualString = String(actual);
      } catch (e) {
        actualString = "[Cannot display]";
      }
      try {
        expectedString = String(expected);
      } catch (e) {
        expectedString = "[Cannot display]";
      }
      if (!msg) {
        msg = `actual: ${actualString} expected: ${expectedString}`;
      }
      throw new AssertionError(msg);
    }
    exports_3("assertNotEquals", assertNotEquals);
    /**
     * Make an assertion that `actual` and `expected` are strictly equal.  If
     * not then throw.
     */
    function assertStrictEq(actual, expected, msg) {
      if (actual !== expected) {
        let actualString;
        let expectedString;
        try {
          actualString = String(actual);
        } catch (e) {
          actualString = "[Cannot display]";
        }
        try {
          expectedString = String(expected);
        } catch (e) {
          expectedString = "[Cannot display]";
        }
        if (!msg) {
          msg = `actual: ${actualString} expected: ${expectedString}`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_3("assertStrictEq", assertStrictEq);
    /**
     * Make an assertion that actual contains expected. If not
     * then thrown.
     */
    function assertStrContains(actual, expected, msg) {
      if (!actual.includes(expected)) {
        if (!msg) {
          msg = `actual: "${actual}" expected to contains: "${expected}"`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_3("assertStrContains", assertStrContains);
    /**
     * Make an assertion that `actual` contains the `expected` values
     * If not then thrown.
     */
    function assertArrayContains(actual, expected, msg) {
      const missing = [];
      for (let i = 0; i < expected.length; i++) {
        let found = false;
        for (let j = 0; j < actual.length; j++) {
          if (equal(expected[i], actual[j])) {
            found = true;
            break;
          }
        }
        if (!found) {
          missing.push(expected[i]);
        }
      }
      if (missing.length === 0) {
        return;
      }
      if (!msg) {
        msg = `actual: "${actual}" expected to contains: "${expected}"`;
        msg += "\n";
        msg += `missing: ${missing}`;
      }
      throw new AssertionError(msg);
    }
    exports_3("assertArrayContains", assertArrayContains);
    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then thrown
     */
    function assertMatch(actual, expected, msg) {
      if (!expected.test(actual)) {
        if (!msg) {
          msg = `actual: "${actual}" expected to match: "${expected}"`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_3("assertMatch", assertMatch);
    /**
     * Forcefully throws a failed assertion
     */
    function fail(msg) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      assert(false, `Failed assertion${msg ? `: ${msg}` : "."}`);
    }
    exports_3("fail", fail);
    /** Executes a function, expecting it to throw.  If it does not, then it
     * throws.  An error class and a string that should be included in the
     * error message can also be asserted.
     */
    function assertThrows(fn, ErrorClass, msgIncludes = "", msg) {
      let doesThrow = false;
      let error = null;
      try {
        fn();
      } catch (e) {
        if (
          ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)
        ) {
          msg =
            `Expected error to be instance of "${ErrorClass.name}", but was "${e.constructor.name}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        if (msgIncludes && !e.message.includes(msgIncludes)) {
          msg =
            `Expected error message to include "${msgIncludes}", but got "${e.message}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        doesThrow = true;
        error = e;
      }
      if (!doesThrow) {
        msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
        throw new AssertionError(msg);
      }
      return error;
    }
    exports_3("assertThrows", assertThrows);
    async function assertThrowsAsync(fn, ErrorClass, msgIncludes = "", msg) {
      let doesThrow = false;
      let error = null;
      try {
        await fn();
      } catch (e) {
        if (
          ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)
        ) {
          msg =
            `Expected error to be instance of "${ErrorClass.name}", but got "${e.name}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        if (msgIncludes && !e.message.includes(msgIncludes)) {
          msg =
            `Expected error message to include "${msgIncludes}", but got "${e.message}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        doesThrow = true;
        error = e;
      }
      if (!doesThrow) {
        msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
        throw new AssertionError(msg);
      }
      return error;
    }
    exports_3("assertThrowsAsync", assertThrowsAsync);
    /** Use this to stub out methods that will throw when invoked. */
    function unimplemented(msg) {
      throw new AssertionError(msg || "unimplemented");
    }
    exports_3("unimplemented", unimplemented);
    /** Use this to assert unreachable code. */
    function unreachable() {
      throw new AssertionError("unreachable");
    }
    exports_3("unreachable", unreachable);
    return {
      setters: [
        function (colors_ts_1_1) {
          colors_ts_1 = colors_ts_1_1;
        },
        function (diff_ts_1_1) {
          diff_ts_1 = diff_ts_1_1;
        },
      ],
      execute: function () {
        CAN_NOT_DISPLAY = "[Cannot display]";
        AssertionError = class AssertionError extends Error {
          constructor(message) {
            super(message);
            this.name = "AssertionError";
          }
        };
        exports_3("AssertionError", AssertionError);
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/async/deferred",
  [],
  function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    /** Creates a Promise with the `reject` and `resolve` functions
     * placed as methods on the promise object itself. It allows you to do:
     *
     *     const p = deferred<number>();
     *     // ...
     *     p.resolve(42);
     */
    function deferred() {
      let methods;
      const promise = new Promise((resolve, reject) => {
        methods = { resolve, reject };
      });
      return Object.assign(promise, methods);
    }
    exports_4("deferred", deferred);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/async/delay",
  [],
  function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
    /* Resolves after the given number of milliseconds. */
    function delay(ms) {
      return new Promise((res) =>
        setTimeout(() => {
          res();
        }, ms)
      );
    }
    exports_5("delay", delay);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/async/mux_async_iterator",
  ["https://deno.land/std@v0.51.0/async/deferred"],
  function (exports_6, context_6) {
    "use strict";
    var deferred_ts_1, MuxAsyncIterator;
    var __moduleName = context_6 && context_6.id;
    return {
      setters: [
        function (deferred_ts_1_1) {
          deferred_ts_1 = deferred_ts_1_1;
        },
      ],
      execute: function () {
        /** The MuxAsyncIterator class multiplexes multiple async iterators into a
             * single stream. It currently makes a few assumptions:
             * - The iterators do not throw.
             * - The final result (the value returned and not yielded from the iterator)
             *   does not matter; if there is any, it is discarded.
             */
        MuxAsyncIterator = class MuxAsyncIterator {
          constructor() {
            this.iteratorCount = 0;
            this.yields = [];
            this.signal = deferred_ts_1.deferred();
          }
          add(iterator) {
            ++this.iteratorCount;
            this.callIteratorNext(iterator);
          }
          async callIteratorNext(iterator) {
            const { value, done } = await iterator.next();
            if (done) {
              --this.iteratorCount;
            } else {
              this.yields.push({ iterator, value });
            }
            this.signal.resolve();
          }
          async *iterate() {
            while (this.iteratorCount > 0) {
              // Sleep until any of the wrapped iterators yields.
              await this.signal;
              // Note that while we're looping over `yields`, new items may be added.
              for (let i = 0; i < this.yields.length; i++) {
                const { iterator, value } = this.yields[i];
                yield value;
                this.callIteratorNext(iterator);
              }
              // Clear the `yields` list and reset the `signal` promise.
              this.yields.length = 0;
              this.signal = deferred_ts_1.deferred();
            }
          }
          [Symbol.asyncIterator]() {
            return this.iterate();
          }
        };
        exports_6("MuxAsyncIterator", MuxAsyncIterator);
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/async/mod",
  [
    "https://deno.land/std@v0.51.0/async/deferred",
    "https://deno.land/std@v0.51.0/async/delay",
    "https://deno.land/std@v0.51.0/async/mux_async_iterator",
  ],
  function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function exportStar_1(m) {
      var exports = {};
      for (var n in m) {
        if (n !== "default") exports[n] = m[n];
      }
      exports_7(exports);
    }
    return {
      setters: [
        function (deferred_ts_2_1) {
          exportStar_1(deferred_ts_2_1);
        },
        function (delay_ts_1_1) {
          exportStar_1(delay_ts_1_1);
        },
        function (mux_async_iterator_ts_1_1) {
          exportStar_1(mux_async_iterator_ts_1_1);
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.51.0/encoding/utf8",
  [],
  function (exports_8, context_8) {
    "use strict";
    var encoder, decoder;
    var __moduleName = context_8 && context_8.id;
    /** Shorthand for new TextEncoder().encode() */
    function encode(input) {
      return encoder.encode(input);
    }
    exports_8("encode", encode);
    /** Shorthand for new TextDecoder().decode() */
    function decode(input) {
      return decoder.decode(input);
    }
    exports_8("decode", decode);
    return {
      setters: [],
      execute: function () {
        /** A default TextEncoder instance */
        exports_8("encoder", encoder = new TextEncoder());
        /** A default TextDecoder instance */
        exports_8("decoder", decoder = new TextDecoder());
      },
    };
  },
);
System.register(
  "https://deno.land/std@v0.50.0/fmt/colors",
  [],
  function (exports_9, context_9) {
    "use strict";
    var noColor, enabled;
    var __moduleName = context_9 && context_9.id;
    function setColorEnabled(value) {
      if (noColor) {
        return;
      }
      enabled = value;
    }
    exports_9("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
      return enabled;
    }
    exports_9("getColorEnabled", getColorEnabled);
    function code(open, close) {
      return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
      };
    }
    function run(str, code) {
      return enabled
        ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
        : str;
    }
    function reset(str) {
      return run(str, code([0], 0));
    }
    exports_9("reset", reset);
    function bold(str) {
      return run(str, code([1], 22));
    }
    exports_9("bold", bold);
    function dim(str) {
      return run(str, code([2], 22));
    }
    exports_9("dim", dim);
    function italic(str) {
      return run(str, code([3], 23));
    }
    exports_9("italic", italic);
    function underline(str) {
      return run(str, code([4], 24));
    }
    exports_9("underline", underline);
    function inverse(str) {
      return run(str, code([7], 27));
    }
    exports_9("inverse", inverse);
    function hidden(str) {
      return run(str, code([8], 28));
    }
    exports_9("hidden", hidden);
    function strikethrough(str) {
      return run(str, code([9], 29));
    }
    exports_9("strikethrough", strikethrough);
    function black(str) {
      return run(str, code([30], 39));
    }
    exports_9("black", black);
    function red(str) {
      return run(str, code([31], 39));
    }
    exports_9("red", red);
    function green(str) {
      return run(str, code([32], 39));
    }
    exports_9("green", green);
    function yellow(str) {
      return run(str, code([33], 39));
    }
    exports_9("yellow", yellow);
    function blue(str) {
      return run(str, code([34], 39));
    }
    exports_9("blue", blue);
    function magenta(str) {
      return run(str, code([35], 39));
    }
    exports_9("magenta", magenta);
    function cyan(str) {
      return run(str, code([36], 39));
    }
    exports_9("cyan", cyan);
    function white(str) {
      return run(str, code([37], 39));
    }
    exports_9("white", white);
    function gray(str) {
      return run(str, code([90], 39));
    }
    exports_9("gray", gray);
    function bgBlack(str) {
      return run(str, code([40], 49));
    }
    exports_9("bgBlack", bgBlack);
    function bgRed(str) {
      return run(str, code([41], 49));
    }
    exports_9("bgRed", bgRed);
    function bgGreen(str) {
      return run(str, code([42], 49));
    }
    exports_9("bgGreen", bgGreen);
    function bgYellow(str) {
      return run(str, code([43], 49));
    }
    exports_9("bgYellow", bgYellow);
    function bgBlue(str) {
      return run(str, code([44], 49));
    }
    exports_9("bgBlue", bgBlue);
    function bgMagenta(str) {
      return run(str, code([45], 49));
    }
    exports_9("bgMagenta", bgMagenta);
    function bgCyan(str) {
      return run(str, code([46], 49));
    }
    exports_9("bgCyan", bgCyan);
    function bgWhite(str) {
      return run(str, code([47], 49));
    }
    exports_9("bgWhite", bgWhite);
    /* Special Color Sequences */
    function clampAndTruncate(n, max = 255, min = 0) {
      return Math.trunc(Math.max(Math.min(n, max), min));
    }
    /** Set text color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function rgb8(str, color) {
      return run(str, code([38, 5, clampAndTruncate(color)], 39));
    }
    exports_9("rgb8", rgb8);
    /** Set background color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function bgRgb8(str, color) {
      return run(str, code([48, 5, clampAndTruncate(color)], 49));
    }
    exports_9("bgRgb8", bgRgb8);
    /** Set text color using 24bit rgb. */
    function rgb24(str, color) {
      return run(
        str,
        code([
          38,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 39),
      );
    }
    exports_9("rgb24", rgb24);
    /** Set background color using 24bit rgb. */
    function bgRgb24(str, color) {
      return run(
        str,
        code([
          48,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 49),
      );
    }
    exports_9("bgRgb24", bgRgb24);
    return {
      setters: [],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        /**
             * A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
             * on npm.
             *
             * ```
             * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
             * console.log(bgBlue(red(bold("Hello world!"))));
             * ```
             *
             * This module supports `NO_COLOR` environmental variable disabling any coloring
             * if `NO_COLOR` is set.
             */
        noColor = Deno.noColor;
        enabled = !noColor;
      },
    };
  },
);
System.register(
  "https://deno.land/x/bytes_formater@1.2.0/deps",
  ["https://deno.land/std@v0.50.0/fmt/colors"],
  function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
      setters: [
        function (colors_ts_2_1) {
          exports_10({
            "setColorEnabled": colors_ts_2_1["setColorEnabled"],
            "green": colors_ts_2_1["green"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/bytes_formater@1.2.0/format",
  ["https://deno.land/x/bytes_formater@1.2.0/deps"],
  function (exports_11, context_11) {
    "use strict";
    var deps_ts_1;
    var __moduleName = context_11 && context_11.id;
    function format(data) {
      const bytes = new Uint8Array(data.buffer);
      let out = "";
      out += "         +-------------------------------------------------+\n";
      out += `         |${
        deps_ts_1.green("  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f ")
      }|\n`;
      out +=
        "+--------+-------------------------------------------------+----------------+\n";
      const lineCount = Math.ceil(bytes.length / 16);
      for (let line = 0; line < lineCount; line++) {
        const start = line * 16;
        const addr = start.toString(16).padStart(8, "0");
        const lineBytes = bytes.slice(start, start + 16);
        out += `|${deps_ts_1.green(addr)}| `;
        lineBytes.forEach(
          (byte) => (out += byte.toString(16).padStart(2, "0") + " ")
        );
        if (lineBytes.length < 16) {
          out += "   ".repeat(16 - lineBytes.length);
        }
        out += "|";
        lineBytes.forEach(function (byte) {
          return (out += byte > 31 && byte < 127
            ? deps_ts_1.green(String.fromCharCode(byte))
            : ".");
        });
        if (lineBytes.length < 16) {
          out += " ".repeat(16 - lineBytes.length);
        }
        out += "|\n";
      }
      out +=
        "+--------+-------------------------------------------------+----------------+";
      return out;
    }
    exports_11("format", format);
    return {
      setters: [
        function (deps_ts_1_1) {
          deps_ts_1 = deps_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/bytes_formater@1.2.0/mod",
  [
    "https://deno.land/x/bytes_formater@1.2.0/format",
    "https://deno.land/x/bytes_formater@1.2.0/deps",
  ],
  function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
      setters: [
        function (format_ts_1_1) {
          exports_12({
            "format": format_ts_1_1["format"],
          });
        },
        function (deps_ts_2_1) {
          exports_12({
            "setColorEnabled": deps_ts_2_1["setColorEnabled"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/checksum@1.4.0/sha1",
  [],
  function (exports_13, context_13) {
    "use strict";
    var Sha1Hash;
    var __moduleName = context_13 && context_13.id;
    /*
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     */
    function binb_sha1(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << (24 - (len % 32));
      x[(((len + 64) >> 9) << 4) + 15] = len;
      const w = [];
      let a = 1732584193;
      let b = -271733879;
      let c = -1732584194;
      let d = 271733878;
      let e = -1009589776;
      for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        const olde = e;
        for (let j = 0; j < 80; j++) {
          if (j < 16) {
            w[j] = x[i + j];
          } else {
            w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          }
          var t = safe_add(
            safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
            safe_add(safe_add(e, w[j]), sha1_kt(j)),
          );
          e = d;
          d = c;
          c = bit_rol(b, 30);
          b = a;
          a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
      }
      return [a, b, c, d, e];
    }
    /*
     * Perform the appropriate triplet combination function for the current
     * iteration
     */
    function sha1_ft(t, b, c, d) {
      if (t < 20) {
        return (b & c) | (~b & d);
      }
      if (t < 40) {
        return b ^ c ^ d;
      }
      if (t < 60) {
        return (b & c) | (b & d) | (c & d);
      }
      return b ^ c ^ d;
    }
    /*
     * Determine the appropriate additive constant for the current iteration
     */
    function sha1_kt(t) {
      return t < 20 ? 1518500249 : t < 40
      ? 1859775393
      : t < 60
      ? -1894007588
      : -899497514;
    }
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y) {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    }
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }
    return {
      setters: [],
      execute: function () {
        Sha1Hash = class Sha1Hash {
          digest(bytes) {
            let data = [];
            for (var i = 0; i < bytes.length * 8; i += 8) {
              data[i >> 5] |= (bytes[i / 8] & 0xff) << (24 - (i % 32));
            }
            data = binb_sha1(data, bytes.length * 8);
            return this.toStrBytes(data);
          }
          /*
                 * Convert an array of big-endian words to a string
                 */
          toStrBytes(input) {
            let pos = 0;
            const data = new Uint8Array(input.length * 4);
            for (let i = 0; i < input.length * 32; i += 8) {
              data[pos++] = (input[i >> 5] >> (24 - (i % 32))) & 0xff;
            }
            return data;
          }
        };
        exports_13("Sha1Hash", Sha1Hash);
      },
    };
  },
);
System.register(
  "https://deno.land/x/checksum@1.4.0/md5",
  [],
  function (exports_14, context_14) {
    "use strict";
    var Md5Hash;
    var __moduleName = context_14 && context_14.id;
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safeAdd(x, y) {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    }
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bitRotateLeft(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }
    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(
        bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s),
        b,
      );
    }
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binlMD5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << len % 32;
      x[(((len + 64) >>> 9) << 4) + 14] = len;
      let olda, oldb, oldc, oldd;
      let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
      for (let i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    function md5(bytes) {
      let data = [];
      var length8 = bytes.length * 8;
      for (let i = 0; i < length8; i += 8) {
        data[i >> 5] |= (bytes[i / 8] & 0xff) << i % 32;
      }
      return binlMD5(data, bytes.length * 8);
    }
    return {
      setters: [],
      execute: function () {
        Md5Hash = class Md5Hash {
          digest(bytes) {
            const data = md5(bytes);
            return this.toStrBytes(data);
          }
          toStrBytes(input) {
            const buffer = new ArrayBuffer(16);
            new Uint32Array(buffer).set(input);
            return new Uint8Array(buffer);
          }
        };
        exports_14("Md5Hash", Md5Hash);
      },
    };
  },
);
System.register(
  "https://deno.land/x/checksum@1.4.0/hash",
  [
    "https://deno.land/x/checksum@1.4.0/sha1",
    "https://deno.land/x/checksum@1.4.0/md5",
  ],
  function (exports_15, context_15) {
    "use strict";
    var sha1_ts_1, md5_ts_1, encoder, Hash;
    var __moduleName = context_15 && context_15.id;
    function hex(bytes) {
      return Array.prototype.map
        .call(bytes, (x) => x.toString(16).padStart(2, "0"))
        .join("");
    }
    exports_15("hex", hex);
    function encode(str) {
      return encoder.encode(str);
    }
    exports_15("encode", encode);
    return {
      setters: [
        function (sha1_ts_1_1) {
          sha1_ts_1 = sha1_ts_1_1;
        },
        function (md5_ts_1_1) {
          md5_ts_1 = md5_ts_1_1;
        },
      ],
      execute: function () {
        encoder = new TextEncoder();
        Hash = class Hash {
          constructor(algorithm) {
            this.algorithm = algorithm;
            const algorithms = {
              sha1: sha1_ts_1.Sha1Hash,
              md5: md5_ts_1.Md5Hash,
            };
            this.instance = new algorithms[algorithm]();
          }
          digest(bytes) {
            bytes = this.instance.digest(bytes);
            return {
              data: bytes,
              hex: () => hex(bytes),
            };
          }
          digestString(string) {
            return this.digest(encode(string));
          }
        };
        exports_15("Hash", Hash);
      },
    };
  },
);
System.register(
  "https://deno.land/x/checksum@1.4.0/mod",
  ["https://deno.land/x/checksum@1.4.0/hash"],
  function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
      setters: [
        function (hash_ts_1_1) {
          exports_16({
            "Hash": hash_ts_1_1["Hash"],
            "hex": hash_ts_1_1["hex"],
            "encode": hash_ts_1_1["encode"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/base64/base",
  [],
  function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function getLengths(b64) {
      const len = b64.length;
      if (len % 4 > 0) {
        throw new TypeError("Invalid string. Length must be a multiple of 4");
      }
      // Trim off extra bytes after placeholder bytes are found
      // See: https://github.com/beatgammit/base64-js/issues/42
      let validLen = b64.indexOf("=");
      if (validLen === -1) {
        validLen = len;
      }
      const placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);
      return [validLen, placeHoldersLen];
    }
    function init(lookup, revLookup) {
      function _byteLength(validLen, placeHoldersLen) {
        return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
      }
      function tripletToBase64(num) {
        return (lookup[(num >> 18) & 0x3f] +
          lookup[(num >> 12) & 0x3f] +
          lookup[(num >> 6) & 0x3f] +
          lookup[num & 0x3f]);
      }
      function encodeChunk(buf, start, end) {
        const out = new Array((end - start) / 3);
        for (let i = start, curTriplet = 0; i < end; i += 3) {
          out[curTriplet++] = tripletToBase64(
            (buf[i] << 16) + (buf[i + 1] << 8) + buf[i + 2],
          );
        }
        return out.join("");
      }
      return {
        // base64 is 4/3 + up to two characters of the original data
        byteLength(b64) {
          return _byteLength.apply(null, getLengths(b64));
        },
        toUint8Array(b64) {
          const [validLen, placeHoldersLen] = getLengths(b64);
          const buf = new Uint8Array(_byteLength(validLen, placeHoldersLen));
          // If there are placeholders, only get up to the last complete 4 chars
          const len = placeHoldersLen ? validLen - 4 : validLen;
          let tmp;
          let curByte = 0;
          let i;
          for (i = 0; i < len; i += 4) {
            tmp = (revLookup[b64.charCodeAt(i)] << 18) |
              (revLookup[b64.charCodeAt(i + 1)] << 12) |
              (revLookup[b64.charCodeAt(i + 2)] << 6) |
              revLookup[b64.charCodeAt(i + 3)];
            buf[curByte++] = (tmp >> 16) & 0xff;
            buf[curByte++] = (tmp >> 8) & 0xff;
            buf[curByte++] = tmp & 0xff;
          }
          if (placeHoldersLen === 2) {
            tmp = (revLookup[b64.charCodeAt(i)] << 2) |
              (revLookup[b64.charCodeAt(i + 1)] >> 4);
            buf[curByte++] = tmp & 0xff;
          } else if (placeHoldersLen === 1) {
            tmp = (revLookup[b64.charCodeAt(i)] << 10) |
              (revLookup[b64.charCodeAt(i + 1)] << 4) |
              (revLookup[b64.charCodeAt(i + 2)] >> 2);
            buf[curByte++] = (tmp >> 8) & 0xff;
            buf[curByte++] = tmp & 0xff;
          }
          return buf;
        },
        fromUint8Array(buf) {
          const maxChunkLength = 16383; // Must be multiple of 3
          const len = buf.length;
          const extraBytes = len % 3; // If we have 1 byte left, pad 2 bytes
          const len2 = len - extraBytes;
          const parts = new Array(
            Math.ceil(len2 / maxChunkLength) + (extraBytes ? 1 : 0),
          );
          let curChunk = 0;
          let chunkEnd;
          // Go through the array every three bytes, we'll deal with trailing stuff later
          for (let i = 0; i < len2; i += maxChunkLength) {
            chunkEnd = i + maxChunkLength;
            parts[curChunk++] = encodeChunk(
              buf,
              i,
              chunkEnd > len2 ? len2 : chunkEnd,
            );
          }
          let tmp;
          // Pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = buf[len2];
            parts[curChunk] = lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] +
              "==";
          } else if (extraBytes === 2) {
            tmp = (buf[len2] << 8) | (buf[len2 + 1] & 0xff);
            parts[curChunk] = lookup[tmp >> 10] +
              lookup[(tmp >> 4) & 0x3f] +
              lookup[(tmp << 2) & 0x3f] +
              "=";
          }
          return parts.join("");
        },
      };
    }
    exports_17("init", init);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/base64/base64url",
  ["https://deno.land/x/base64/base"],
  function (exports_18, context_18) {
    "use strict";
    var base_ts_1,
      lookup,
      revLookup,
      code,
      mod,
      byteLength,
      toUint8Array,
      fromUint8Array;
    var __moduleName = context_18 && context_18.id;
    return {
      setters: [
        function (base_ts_1_1) {
          base_ts_1 = base_ts_1_1;
        },
      ],
      execute: function () {
        lookup = [];
        revLookup = [];
        code =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        for (let i = 0, l = code.length; i < l; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }
        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;
        mod = base_ts_1.init(lookup, revLookup);
        exports_18("byteLength", byteLength = mod.byteLength);
        exports_18("toUint8Array", toUint8Array = mod.toUint8Array);
        exports_18("fromUint8Array", fromUint8Array = mod.fromUint8Array);
      },
    };
  },
);
System.register(
  "https://raw.githubusercontent.com/chiefbiiko/std-encoding/v1.0.0/mod",
  ["https://deno.land/x/base64/base64url"],
  function (exports_19, context_19) {
    "use strict";
    var base64url_ts_1, decoder, encoder;
    var __moduleName = context_19 && context_19.id;
    /** Serializes a Uint8Array to a hexadecimal string. */
    function toHexString(buf) {
      return buf.reduce(
        (hex, byte) => `${hex}${byte < 16 ? "0" : ""}${byte.toString(16)}`,
        "",
      );
    }
    /** Deserializes a Uint8Array from a hexadecimal string. */
    function fromHexString(hex) {
      const len = hex.length;
      if (len % 2 || !/^[0-9a-fA-F]+$/.test(hex)) {
        throw new TypeError("Invalid hex string.");
      }
      hex = hex.toLowerCase();
      const buf = new Uint8Array(Math.floor(len / 2));
      const end = len / 2;
      for (let i = 0; i < end; ++i) {
        buf[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return buf;
    }
    /** Decodes a Uint8Array to utf8-, base64-, or hex-encoded string. */
    function decode(buf, encoding = "utf8") {
      if (/^utf-?8$/i.test(encoding)) {
        return decoder.decode(buf);
      } else if (/^base64$/i.test(encoding)) {
        return base64url_ts_1.fromUint8Array(buf);
      } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
        return toHexString(buf);
      } else {
        throw new TypeError("Unsupported string encoding.");
      }
    }
    exports_19("decode", decode);
    function encode(str, encoding = "utf8") {
      if (/^utf-?8$/i.test(encoding)) {
        return encoder.encode(str);
      } else if (/^base64$/i.test(encoding)) {
        return base64url_ts_1.toUint8Array(str);
      } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
        return fromHexString(str);
      } else {
        throw new TypeError("Unsupported string encoding.");
      }
    }
    exports_19("encode", encode);
    return {
      setters: [
        function (base64url_ts_1_1) {
          base64url_ts_1 = base64url_ts_1_1;
        },
      ],
      execute: function () {
        decoder = new TextDecoder();
        encoder = new TextEncoder();
      },
    };
  },
);
System.register(
  "https://deno.land/x/sha256@v1.0.2/deps",
  ["https://raw.githubusercontent.com/chiefbiiko/std-encoding/v1.0.0/mod"],
  function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    return {
      setters: [
        function (mod_ts_1_1) {
          exports_20({
            "encode": mod_ts_1_1["encode"],
            "decode": mod_ts_1_1["decode"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/sha256@v1.0.2/mod",
  ["https://deno.land/x/sha256@v1.0.2/deps"],
  function (exports_21, context_21) {
    "use strict";
    var deps_ts_3, BYTES, SHA256;
    var __moduleName = context_21 && context_21.id;
    /** Generates a SHA256 hash of the input data. */
    function sha256(msg, inputEncoding, outputEncoding) {
      return new SHA256().update(msg, inputEncoding).digest(outputEncoding);
    }
    exports_21("sha256", sha256);
    return {
      setters: [
        function (deps_ts_3_1) {
          deps_ts_3 = deps_ts_3_1;
        },
      ],
      execute: function () {
        /** Byte length of a SHA256 hash. */
        exports_21("BYTES", BYTES = 32);
        /** A class representation of the SHA256 algorithm. */
        SHA256 = class SHA256 {
          /** Creates a SHA256 instance. */
          constructor() {
            this.hashSize = BYTES;
            this._buf = new Uint8Array(64);
            // prettier-ignore
            this._K = new Uint32Array([
              0x428a2f98,
              0x71374491,
              0xb5c0fbcf,
              0xe9b5dba5,
              0x3956c25b,
              0x59f111f1,
              0x923f82a4,
              0xab1c5ed5,
              0xd807aa98,
              0x12835b01,
              0x243185be,
              0x550c7dc3,
              0x72be5d74,
              0x80deb1fe,
              0x9bdc06a7,
              0xc19bf174,
              0xe49b69c1,
              0xefbe4786,
              0x0fc19dc6,
              0x240ca1cc,
              0x2de92c6f,
              0x4a7484aa,
              0x5cb0a9dc,
              0x76f988da,
              0x983e5152,
              0xa831c66d,
              0xb00327c8,
              0xbf597fc7,
              0xc6e00bf3,
              0xd5a79147,
              0x06ca6351,
              0x14292967,
              0x27b70a85,
              0x2e1b2138,
              0x4d2c6dfc,
              0x53380d13,
              0x650a7354,
              0x766a0abb,
              0x81c2c92e,
              0x92722c85,
              0xa2bfe8a1,
              0xa81a664b,
              0xc24b8b70,
              0xc76c51a3,
              0xd192e819,
              0xd6990624,
              0xf40e3585,
              0x106aa070,
              0x19a4c116,
              0x1e376c08,
              0x2748774c,
              0x34b0bcb5,
              0x391c0cb3,
              0x4ed8aa4a,
              0x5b9cca4f,
              0x682e6ff3,
              0x748f82ee,
              0x78a5636f,
              0x84c87814,
              0x8cc70208,
              0x90befffa,
              0xa4506ceb,
              0xbef9a3f7,
              0xc67178f2,
            ]);
            this.init();
          }
          /** Initializes a hash. */
          init() {
            // prettier-ignore
            this._H = new Uint32Array([
              0x6a09e667,
              0xbb67ae85,
              0x3c6ef372,
              0xa54ff53a,
              0x510e527f,
              0x9b05688c,
              0x1f83d9ab,
              0x5be0cd19,
            ]);
            this._bufIdx = 0;
            this._count = new Uint32Array(2);
            this._buf.fill(0);
            this._finalized = false;
            return this;
          }
          /** Updates the hash with additional message data. */
          update(msg, inputEncoding) {
            if (msg === null) {
              throw new TypeError("msg must be a string or Uint8Array.");
            } else if (typeof msg === "string") {
              msg = deps_ts_3.encode(msg, inputEncoding);
            }
            // process the msg as many times as possible, the rest is stored in the buffer
            // message is processed in 512 bit (64 byte chunks)
            for (let i = 0, len = msg.length; i < len; i++) {
              this._buf[this._bufIdx++] = msg[i];
              if (this._bufIdx === 64) {
                this._transform();
                this._bufIdx = 0;
              }
            }
            // counter update (number of message bits)
            const c = this._count;
            if ((c[0] += msg.length << 3) < msg.length << 3) {
              c[1]++;
            }
            c[1] += msg.length >>> 29;
            return this;
          }
          /** Finalizes the hash with additional message data. */
          digest(outputEncoding) {
            if (this._finalized) {
              throw new Error("digest has already been called.");
            }
            this._finalized = true;
            // append '1'
            const b = this._buf;
            let idx = this._bufIdx;
            b[idx++] = 0x80;
            // zeropad up to byte pos 56
            while (idx !== 56) {
              if (idx === 64) {
                this._transform();
                idx = 0;
              }
              b[idx++] = 0;
            }
            // append length in bits
            const c = this._count;
            b[56] = (c[1] >>> 24) & 0xff;
            b[57] = (c[1] >>> 16) & 0xff;
            b[58] = (c[1] >>> 8) & 0xff;
            b[59] = (c[1] >>> 0) & 0xff;
            b[60] = (c[0] >>> 24) & 0xff;
            b[61] = (c[0] >>> 16) & 0xff;
            b[62] = (c[0] >>> 8) & 0xff;
            b[63] = (c[0] >>> 0) & 0xff;
            this._transform();
            // return the hash as byte array
            const hash = new Uint8Array(BYTES);
            // let i: number;
            for (let i = 0; i < 8; i++) {
              hash[(i << 2) + 0] = (this._H[i] >>> 24) & 0xff;
              hash[(i << 2) + 1] = (this._H[i] >>> 16) & 0xff;
              hash[(i << 2) + 2] = (this._H[i] >>> 8) & 0xff;
              hash[(i << 2) + 3] = (this._H[i] >>> 0) & 0xff;
            }
            // clear internal states and prepare for new hash
            this.init();
            return outputEncoding
              ? deps_ts_3.decode(hash, outputEncoding)
              : hash;
          }
          /** Performs one transformation cycle. */
          _transform() {
            const h = this._H;
            let h0 = h[0];
            let h1 = h[1];
            let h2 = h[2];
            let h3 = h[3];
            let h4 = h[4];
            let h5 = h[5];
            let h6 = h[6];
            let h7 = h[7];
            // convert byte buffer into w[0..15]
            const w = new Uint32Array(16);
            let i;
            for (i = 0; i < 16; i++) {
              w[i] = this._buf[(i << 2) + 3] |
                (this._buf[(i << 2) + 2] << 8) |
                (this._buf[(i << 2) + 1] << 16) |
                (this._buf[i << 2] << 24);
            }
            for (i = 0; i < 64; i++) {
              let tmp;
              if (i < 16) {
                tmp = w[i];
              } else {
                let a = w[(i + 1) & 15];
                let b = w[(i + 14) & 15];
                tmp = w[i & 15] =
                  (((a >>> 7) ^ (a >>> 18) ^ (a >>> 3) ^ (a << 25) ^
                    (a << 14)) +
                    ((b >>> 17) ^ (b >>> 19) ^ (b >>> 10) ^ (b << 15) ^
                      (b << 13)) +
                    w[i & 15] +
                    w[(i + 9) & 15]) |
                  0;
              }
              tmp = (tmp +
                h7 +
                ((h4 >>> 6) ^
                  (h4 >>> 11) ^
                  (h4 >>> 25) ^
                  (h4 << 26) ^
                  (h4 << 21) ^
                  (h4 << 7)) +
                (h6 ^ (h4 & (h5 ^ h6))) +
                this._K[i]) |
                0;
              h7 = h6;
              h6 = h5;
              h5 = h4;
              h4 = h3 + tmp;
              h3 = h2;
              h2 = h1;
              h1 = h0;
              h0 = (tmp +
                ((h1 & h2) ^ (h3 & (h1 ^ h2))) +
                ((h1 >>> 2) ^
                  (h1 >>> 13) ^
                  (h1 >>> 22) ^
                  (h1 << 30) ^
                  (h1 << 19) ^
                  (h1 << 10))) |
                0;
            }
            h[0] = (h[0] + h0) | 0;
            h[1] = (h[1] + h1) | 0;
            h[2] = (h[2] + h2) | 0;
            h[3] = (h[3] + h3) | 0;
            h[4] = (h[4] + h4) | 0;
            h[5] = (h[5] + h5) | 0;
            h[6] = (h[6] + h6) | 0;
            h[7] = (h[7] + h7) | 0;
          }
        };
        exports_21("SHA256", SHA256);
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.3.5/util",
  [],
  function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    function replaceParams(sql, params) {
      if (!params) {
        return sql;
      }
      let paramIndex = 0;
      sql = sql.replace(/('.*')|(".*")|(\?\?)|(\?)/g, (str) => {
        if (paramIndex >= params.length) {
          return str;
        }
        // ignore
        if (/".*"/g.test(str) || /'.*'/g.test(str)) {
          return str;
        }
        // identifier
        if (str === "??") {
          const val = params[paramIndex++];
          if (val instanceof Array) {
            return `(${
              val.map((item) => replaceParams("??", [item])).join(",")
            })`;
          } else if (val === "*") {
            return val;
          } else if (typeof val === "string" && val.indexOf(".") > -1) {
            // a.b => `a`.`b`
            const _arr = val.split(".");
            return replaceParams(_arr.map(() => "??").join("."), _arr);
          } else if (
            typeof val === "string" &&
            (val.toLowerCase().indexOf(" as ") > -1 ||
              val.toLowerCase().indexOf(" AS ") > -1)
          ) {
            // a as b => `a` AS `b`
            const newVal = val.replace(" as ", " AS ");
            const _arr = newVal.split(" AS ");
            return replaceParams(_arr.map(() => "??").join(" AS "), _arr);
          } else {
            return ["`", val, "`"].join("");
          }
        }
        // value
        const val = params[paramIndex++];
        if (val === null) {
          return "NULL";
        }
        switch (typeof val) {
          case "object":
            if (val instanceof Date) {
              return `"${formatDate(val)}"`;
            }
            if (val instanceof Array) {
              return `(${
                val.map((item) => replaceParams("?", [item])).join(",")
              })`;
            }
          case "string":
            return `"${escapeString(val)}"`;
          case "undefined":
            return "NULL";
          case "number":
          case "boolean":
          default:
            return val;
        }
      });
      return sql;
    }
    exports_22("replaceParams", replaceParams);
    function formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const days = date
        .getDate()
        .toString()
        .padStart(2, "0");
      const hours = date
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const seconds = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
    }
    function escapeString(str) {
      return str.replace(/"/g, '\\"');
    }
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/log/levels",
  [],
  function (exports_23, context_23) {
    "use strict";
    var LogLevels, LogLevelNames, byLevel;
    var __moduleName = context_23 && context_23.id;
    /** Returns the numeric log level associated with the passed,
     * stringy log level name.
     */
    function getLevelByName(name) {
      switch (name) {
        case "NOTSET":
          return LogLevels.NOTSET;
        case "DEBUG":
          return LogLevels.DEBUG;
        case "INFO":
          return LogLevels.INFO;
        case "WARNING":
          return LogLevels.WARNING;
        case "ERROR":
          return LogLevels.ERROR;
        case "CRITICAL":
          return LogLevels.CRITICAL;
        default:
          throw new Error(`no log level found for "${name}"`);
      }
    }
    exports_23("getLevelByName", getLevelByName);
    /** Returns the stringy log level name provided the numeric log level */
    function getLevelName(level) {
      const levelName = byLevel[level];
      if (levelName) {
        return levelName;
      }
      throw new Error(`no level name found for level: ${level}`);
    }
    exports_23("getLevelName", getLevelName);
    return {
      setters: [],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        /** Get log level numeric values through enum constants
             */
        (function (LogLevels) {
          LogLevels[LogLevels["NOTSET"] = 0] = "NOTSET";
          LogLevels[LogLevels["DEBUG"] = 10] = "DEBUG";
          LogLevels[LogLevels["INFO"] = 20] = "INFO";
          LogLevels[LogLevels["WARNING"] = 30] = "WARNING";
          LogLevels[LogLevels["ERROR"] = 40] = "ERROR";
          LogLevels[LogLevels["CRITICAL"] = 50] = "CRITICAL";
        })(LogLevels || (LogLevels = {}));
        exports_23("LogLevels", LogLevels);
        /** Permitted log level names */
        exports_23(
          "LogLevelNames",
          LogLevelNames = Object.keys(LogLevels).filter((key) =>
            isNaN(Number(key))
          ),
        );
        byLevel = {
          [String(LogLevels.NOTSET)]: "NOTSET",
          [String(LogLevels.DEBUG)]: "DEBUG",
          [String(LogLevels.INFO)]: "INFO",
          [String(LogLevels.WARNING)]: "WARNING",
          [String(LogLevels.ERROR)]: "ERROR",
          [String(LogLevels.CRITICAL)]: "CRITICAL",
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/fmt/colors",
  [],
  function (exports_24, context_24) {
    "use strict";
    var noColor, enabled;
    var __moduleName = context_24 && context_24.id;
    function setColorEnabled(value) {
      if (noColor) {
        return;
      }
      enabled = value;
    }
    exports_24("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
      return enabled;
    }
    exports_24("getColorEnabled", getColorEnabled);
    function code(open, close) {
      return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
      };
    }
    function run(str, code) {
      return enabled
        ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
        : str;
    }
    function reset(str) {
      return run(str, code([0], 0));
    }
    exports_24("reset", reset);
    function bold(str) {
      return run(str, code([1], 22));
    }
    exports_24("bold", bold);
    function dim(str) {
      return run(str, code([2], 22));
    }
    exports_24("dim", dim);
    function italic(str) {
      return run(str, code([3], 23));
    }
    exports_24("italic", italic);
    function underline(str) {
      return run(str, code([4], 24));
    }
    exports_24("underline", underline);
    function inverse(str) {
      return run(str, code([7], 27));
    }
    exports_24("inverse", inverse);
    function hidden(str) {
      return run(str, code([8], 28));
    }
    exports_24("hidden", hidden);
    function strikethrough(str) {
      return run(str, code([9], 29));
    }
    exports_24("strikethrough", strikethrough);
    function black(str) {
      return run(str, code([30], 39));
    }
    exports_24("black", black);
    function red(str) {
      return run(str, code([31], 39));
    }
    exports_24("red", red);
    function green(str) {
      return run(str, code([32], 39));
    }
    exports_24("green", green);
    function yellow(str) {
      return run(str, code([33], 39));
    }
    exports_24("yellow", yellow);
    function blue(str) {
      return run(str, code([34], 39));
    }
    exports_24("blue", blue);
    function magenta(str) {
      return run(str, code([35], 39));
    }
    exports_24("magenta", magenta);
    function cyan(str) {
      return run(str, code([36], 39));
    }
    exports_24("cyan", cyan);
    function white(str) {
      return run(str, code([37], 39));
    }
    exports_24("white", white);
    function gray(str) {
      return run(str, code([90], 39));
    }
    exports_24("gray", gray);
    function bgBlack(str) {
      return run(str, code([40], 49));
    }
    exports_24("bgBlack", bgBlack);
    function bgRed(str) {
      return run(str, code([41], 49));
    }
    exports_24("bgRed", bgRed);
    function bgGreen(str) {
      return run(str, code([42], 49));
    }
    exports_24("bgGreen", bgGreen);
    function bgYellow(str) {
      return run(str, code([43], 49));
    }
    exports_24("bgYellow", bgYellow);
    function bgBlue(str) {
      return run(str, code([44], 49));
    }
    exports_24("bgBlue", bgBlue);
    function bgMagenta(str) {
      return run(str, code([45], 49));
    }
    exports_24("bgMagenta", bgMagenta);
    function bgCyan(str) {
      return run(str, code([46], 49));
    }
    exports_24("bgCyan", bgCyan);
    function bgWhite(str) {
      return run(str, code([47], 49));
    }
    exports_24("bgWhite", bgWhite);
    /* Special Color Sequences */
    function clampAndTruncate(n, max = 255, min = 0) {
      return Math.trunc(Math.max(Math.min(n, max), min));
    }
    /** Set text color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function rgb8(str, color) {
      return run(str, code([38, 5, clampAndTruncate(color)], 39));
    }
    exports_24("rgb8", rgb8);
    /** Set background color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function bgRgb8(str, color) {
      return run(str, code([48, 5, clampAndTruncate(color)], 49));
    }
    exports_24("bgRgb8", bgRgb8);
    /** Set text color using 24bit rgb. */
    function rgb24(str, color) {
      return run(
        str,
        code([
          38,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 39),
      );
    }
    exports_24("rgb24", rgb24);
    /** Set background color using 24bit rgb. */
    function bgRgb24(str, color) {
      return run(
        str,
        code([
          48,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 49),
      );
    }
    exports_24("bgRgb24", bgRgb24);
    return {
      setters: [],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        /**
             * A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
             * on npm.
             *
             * ```
             * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
             * console.log(bgBlue(red(bold("Hello world!"))));
             * ```
             *
             * This module supports `NO_COLOR` environmental variable disabling any coloring
             * if `NO_COLOR` is set.
             */
        noColor = Deno.noColor;
        enabled = !noColor;
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/fs/exists",
  [],
  function (exports_25, context_25) {
    "use strict";
    var lstat, lstatSync;
    var __moduleName = context_25 && context_25.id;
    /**
     * Test whether or not the given path exists by checking with the file system
     */
    async function exists(filePath) {
      try {
        await lstat(filePath);
        return true;
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
          return false;
        }
        throw err;
      }
    }
    exports_25("exists", exists);
    /**
     * Test whether or not the given path exists by checking with the file system
     */
    function existsSync(filePath) {
      try {
        lstatSync(filePath);
        return true;
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
          return false;
        }
        throw err;
      }
    }
    exports_25("existsSync", existsSync);
    return {
      setters: [],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        lstat = Deno.lstat, lstatSync = Deno.lstatSync;
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/log/handlers",
  [
    "https://deno.land/x/std@v0.51.0/log/levels",
    "https://deno.land/x/std@v0.51.0/fmt/colors",
    "https://deno.land/x/std@v0.51.0/fs/exists",
  ],
  function (exports_26, context_26) {
    "use strict";
    var open,
      openSync,
      close,
      renameSync,
      statSync,
      levels_ts_1,
      colors_ts_3,
      exists_ts_1,
      DEFAULT_FORMATTER,
      BaseHandler,
      ConsoleHandler,
      WriterHandler,
      FileHandler,
      RotatingFileHandler;
    var __moduleName = context_26 && context_26.id;
    return {
      setters: [
        function (levels_ts_1_1) {
          levels_ts_1 = levels_ts_1_1;
        },
        function (colors_ts_3_1) {
          colors_ts_3 = colors_ts_3_1;
        },
        function (exists_ts_1_1) {
          exists_ts_1 = exists_ts_1_1;
        },
      ],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        open = Deno.open,
          openSync = Deno.openSync,
          close = Deno.close,
          renameSync = Deno.renameSync,
          statSync = Deno.statSync;
        DEFAULT_FORMATTER = "{levelName} {msg}";
        BaseHandler = class BaseHandler {
          constructor(levelName, options = {}) {
            this.level = levels_ts_1.getLevelByName(levelName);
            this.levelName = levelName;
            this.formatter = options.formatter || DEFAULT_FORMATTER;
          }
          handle(logRecord) {
            if (this.level > logRecord.level) {
              return;
            }
            const msg = this.format(logRecord);
            return this.log(msg);
          }
          format(logRecord) {
            if (this.formatter instanceof Function) {
              return this.formatter(logRecord);
            }
            return this.formatter.replace(/{(\S+)}/g, (match, p1) => {
              const value = logRecord[p1];
              // do not interpolate missing values
              if (!value) {
                return match;
              }
              return String(value);
            });
          }
          log(_msg) {}
          async setup() {}
          async destroy() {}
        };
        exports_26("BaseHandler", BaseHandler);
        ConsoleHandler = class ConsoleHandler extends BaseHandler {
          format(logRecord) {
            let msg = super.format(logRecord);
            switch (logRecord.level) {
              case levels_ts_1.LogLevels.INFO:
                msg = colors_ts_3.blue(msg);
                break;
              case levels_ts_1.LogLevels.WARNING:
                msg = colors_ts_3.yellow(msg);
                break;
              case levels_ts_1.LogLevels.ERROR:
                msg = colors_ts_3.red(msg);
                break;
              case levels_ts_1.LogLevels.CRITICAL:
                msg = colors_ts_3.bold(colors_ts_3.red(msg));
                break;
              default:
                break;
            }
            return msg;
          }
          log(msg) {
            console.log(msg);
          }
        };
        exports_26("ConsoleHandler", ConsoleHandler);
        WriterHandler = class WriterHandler extends BaseHandler {
          constructor() {
            super(...arguments);
            this.#encoder = new TextEncoder();
          }
          #encoder;
        };
        exports_26("WriterHandler", WriterHandler);
        FileHandler = class FileHandler extends WriterHandler {
          constructor(levelName, options) {
            super(levelName, options);
            this.#encoder = new TextEncoder();
            this._filename = options.filename;
            // default to append mode, write only
            this._mode = options.mode ? options.mode : "a";
            this._openOptions = {
              createNew: this._mode === "x",
              create: this._mode !== "x",
              append: this._mode === "a",
              truncate: this._mode !== "a",
              write: true,
            };
          }
          #encoder;
          async setup() {
            this._file = await open(this._filename, this._openOptions);
            this._writer = this._file;
          }
          log(msg) {
            Deno.writeSync(this._file.rid, this.#encoder.encode(msg + "\n"));
          }
          destroy() {
            this._file.close();
            return Promise.resolve();
          }
        };
        exports_26("FileHandler", FileHandler);
        RotatingFileHandler = class RotatingFileHandler extends FileHandler {
          constructor(levelName, options) {
            super(levelName, options);
            this.#maxBytes = options.maxBytes;
            this.#maxBackupCount = options.maxBackupCount;
          }
          #maxBytes;
          #maxBackupCount;
          async setup() {
            if (this.#maxBytes < 1) {
              throw new Error("maxBytes cannot be less than 1");
            }
            if (this.#maxBackupCount < 1) {
              throw new Error("maxBackupCount cannot be less than 1");
            }
            await super.setup();
            if (this._mode === "w") {
              // Remove old backups too as it doesn't make sense to start with a clean
              // log file, but old backups
              for (let i = 1; i <= this.#maxBackupCount; i++) {
                if (await exists_ts_1.exists(this._filename + "." + i)) {
                  await Deno.remove(this._filename + "." + i);
                }
              }
            } else if (this._mode === "x") {
              // Throw if any backups also exist
              for (let i = 1; i <= this.#maxBackupCount; i++) {
                if (await exists_ts_1.exists(this._filename + "." + i)) {
                  Deno.close(this._file.rid);
                  throw new Deno.errors.AlreadyExists(
                    "Backup log file " + this._filename + "." + i +
                      " already exists",
                  );
                }
              }
            }
          }
          handle(logRecord) {
            if (this.level > logRecord.level) {
              return;
            }
            const msg = this.format(logRecord);
            const currentFileSize = statSync(this._filename).size;
            if (currentFileSize + msg.length > this.#maxBytes) {
              this.rotateLogFiles();
            }
            return this.log(msg);
          }
          rotateLogFiles() {
            close(this._file.rid);
            for (let i = this.#maxBackupCount - 1; i >= 0; i--) {
              const source = this._filename + (i === 0 ? "" : "." + i);
              const dest = this._filename + "." + (i + 1);
              if (exists_ts_1.existsSync(source)) {
                renameSync(source, dest);
              }
            }
            this._file = openSync(this._filename, this._openOptions);
            this._writer = this._file;
          }
        };
        exports_26("RotatingFileHandler", RotatingFileHandler);
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/log/logger",
  ["https://deno.land/x/std@v0.51.0/log/levels"],
  function (exports_27, context_27) {
    "use strict";
    var levels_ts_2, LogRecord, Logger;
    var __moduleName = context_27 && context_27.id;
    return {
      setters: [
        function (levels_ts_2_1) {
          levels_ts_2 = levels_ts_2_1;
        },
      ],
      execute: function () {
        LogRecord = class LogRecord {
          constructor(msg, args, level) {
            this.msg = msg;
            this.#args = [...args];
            this.level = level;
            this.#datetime = new Date();
            this.levelName = levels_ts_2.getLevelName(level);
          }
          #args;
          #datetime;
          get args() {
            return [...this.#args];
          }
          get datetime() {
            return new Date(this.#datetime.getTime());
          }
        };
        exports_27("LogRecord", LogRecord);
        Logger = class Logger {
          constructor(levelName, handlers) {
            this.level = levels_ts_2.getLevelByName(levelName);
            this.levelName = levelName;
            this.handlers = handlers || [];
          }
          _log(level, msg, ...args) {
            if (this.level > level) {
              return;
            }
            const record = new LogRecord(msg, args, level);
            this.handlers.forEach((handler) => {
              handler.handle(record);
            });
          }
          debug(msg, ...args) {
            this._log(levels_ts_2.LogLevels.DEBUG, msg, ...args);
          }
          info(msg, ...args) {
            this._log(levels_ts_2.LogLevels.INFO, msg, ...args);
          }
          warning(msg, ...args) {
            this._log(levels_ts_2.LogLevels.WARNING, msg, ...args);
          }
          error(msg, ...args) {
            this._log(levels_ts_2.LogLevels.ERROR, msg, ...args);
          }
          critical(msg, ...args) {
            this._log(levels_ts_2.LogLevels.CRITICAL, msg, ...args);
          }
        };
        exports_27("Logger", Logger);
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/testing/diff",
  [],
  function (exports_28, context_28) {
    "use strict";
    var DiffType, REMOVED, COMMON, ADDED;
    var __moduleName = context_28 && context_28.id;
    function createCommon(A, B, reverse) {
      const common = [];
      if (A.length === 0 || B.length === 0) {
        return [];
      }
      for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
        if (
          A[reverse ? A.length - i - 1 : i] ===
            B[reverse ? B.length - i - 1 : i]
        ) {
          common.push(A[reverse ? A.length - i - 1 : i]);
        } else {
          return common;
        }
      }
      return common;
    }
    function diff(A, B) {
      const prefixCommon = createCommon(A, B);
      const suffixCommon = createCommon(
        A.slice(prefixCommon.length),
        B.slice(prefixCommon.length),
        true,
      ).reverse();
      A = suffixCommon.length
        ? A.slice(prefixCommon.length, -suffixCommon.length)
        : A.slice(prefixCommon.length);
      B = suffixCommon.length
        ? B.slice(prefixCommon.length, -suffixCommon.length)
        : B.slice(prefixCommon.length);
      const swapped = B.length > A.length;
      [A, B] = swapped ? [B, A] : [A, B];
      const M = A.length;
      const N = B.length;
      if (!M && !N && !suffixCommon.length && !prefixCommon.length) {
        return [];
      }
      if (!N) {
        return [
          ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
          ...A.map((a) => ({
            type: swapped ? DiffType.added : DiffType.removed,
            value: a,
          })),
          ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ];
      }
      const offset = N;
      const delta = M - N;
      const size = M + N + 1;
      const fp = new Array(size).fill({ y: -1 });
      /**
         * INFO:
         * This buffer is used to save memory and improve performance.
         * The first half is used to save route and last half is used to save diff
         * type.
         * This is because, when I kept new uint8array area to save type,performance
         * worsened.
         */
      const routes = new Uint32Array((M * N + size + 1) * 2);
      const diffTypesPtrOffset = routes.length / 2;
      let ptr = 0;
      let p = -1;
      function backTrace(A, B, current, swapped) {
        const M = A.length;
        const N = B.length;
        const result = [];
        let a = M - 1;
        let b = N - 1;
        let j = routes[current.id];
        let type = routes[current.id + diffTypesPtrOffset];
        while (true) {
          if (!j && !type) {
            break;
          }
          const prev = j;
          if (type === REMOVED) {
            result.unshift({
              type: swapped ? DiffType.removed : DiffType.added,
              value: B[b],
            });
            b -= 1;
          } else if (type === ADDED) {
            result.unshift({
              type: swapped ? DiffType.added : DiffType.removed,
              value: A[a],
            });
            a -= 1;
          } else {
            result.unshift({ type: DiffType.common, value: A[a] });
            a -= 1;
            b -= 1;
          }
          j = routes[prev];
          type = routes[prev + diffTypesPtrOffset];
        }
        return result;
      }
      function createFP(slide, down, k, M) {
        if (slide && slide.y === -1 && down && down.y === -1) {
          return { y: 0, id: 0 };
        }
        if (
          (down && down.y === -1) ||
          k === M ||
          (slide && slide.y) > (down && down.y) + 1
        ) {
          const prev = slide.id;
          ptr++;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = ADDED;
          return { y: slide.y, id: ptr };
        } else {
          const prev = down.id;
          ptr++;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = REMOVED;
          return { y: down.y + 1, id: ptr };
        }
      }
      function snake(k, slide, down, _offset, A, B) {
        const M = A.length;
        const N = B.length;
        if (k < -N || M < k) {
          return { y: -1, id: -1 };
        }
        const fp = createFP(slide, down, k, M);
        while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
          const prev = fp.id;
          ptr++;
          fp.id = ptr;
          fp.y += 1;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
      }
      while (fp[delta + offset].y < N) {
        p = p + 1;
        for (let k = -p; k < delta; ++k) {
          fp[k + offset] = snake(
            k,
            fp[k - 1 + offset],
            fp[k + 1 + offset],
            offset,
            A,
            B,
          );
        }
        for (let k = delta + p; k > delta; --k) {
          fp[k + offset] = snake(
            k,
            fp[k - 1 + offset],
            fp[k + 1 + offset],
            offset,
            A,
            B,
          );
        }
        fp[delta + offset] = snake(
          delta,
          fp[delta - 1 + offset],
          fp[delta + 1 + offset],
          offset,
          A,
          B,
        );
      }
      return [
        ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ...backTrace(A, B, fp[delta + offset], swapped),
        ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
      ];
    }
    exports_28("default", diff);
    return {
      setters: [],
      execute: function () {
        (function (DiffType) {
          DiffType["removed"] = "removed";
          DiffType["common"] = "common";
          DiffType["added"] = "added";
        })(DiffType || (DiffType = {}));
        exports_28("DiffType", DiffType);
        REMOVED = 1;
        COMMON = 2;
        ADDED = 3;
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/testing/asserts",
  [
    "https://deno.land/x/std@v0.51.0/fmt/colors",
    "https://deno.land/x/std@v0.51.0/testing/diff",
  ],
  function (exports_29, context_29) {
    "use strict";
    var colors_ts_4, diff_ts_2, CAN_NOT_DISPLAY, AssertionError;
    var __moduleName = context_29 && context_29.id;
    function format(v) {
      let string = Deno.inspect(v);
      if (typeof v == "string") {
        string = `"${string.replace(/(?=["\\])/g, "\\")}"`;
      }
      return string;
    }
    function createColor(diffType) {
      switch (diffType) {
        case diff_ts_2.DiffType.added:
          return (s) => colors_ts_4.green(colors_ts_4.bold(s));
        case diff_ts_2.DiffType.removed:
          return (s) => colors_ts_4.red(colors_ts_4.bold(s));
        default:
          return colors_ts_4.white;
      }
    }
    function createSign(diffType) {
      switch (diffType) {
        case diff_ts_2.DiffType.added:
          return "+   ";
        case diff_ts_2.DiffType.removed:
          return "-   ";
        default:
          return "    ";
      }
    }
    function buildMessage(diffResult) {
      const messages = [];
      messages.push("");
      messages.push("");
      messages.push(
        `    ${colors_ts_4.gray(colors_ts_4.bold("[Diff]"))} ${
          colors_ts_4.red(colors_ts_4.bold("Actual"))
        } / ${colors_ts_4.green(colors_ts_4.bold("Expected"))}`,
      );
      messages.push("");
      messages.push("");
      diffResult.forEach((result) => {
        const c = createColor(result.type);
        messages.push(c(`${createSign(result.type)}${result.value}`));
      });
      messages.push("");
      return messages;
    }
    function isKeyedCollection(x) {
      return [Symbol.iterator, "size"].every((k) => k in x);
    }
    function equal(c, d) {
      const seen = new Map();
      return (function compare(a, b) {
        // Have to render RegExp & Date for string comparison
        // unless it's mistreated as object
        if (
          a &&
          b &&
          ((a instanceof RegExp && b instanceof RegExp) ||
            (a instanceof Date && b instanceof Date))
        ) {
          return String(a) === String(b);
        }
        if (Object.is(a, b)) {
          return true;
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
          if (seen.get(a) === b) {
            return true;
          }
          if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
            return false;
          }
          if (isKeyedCollection(a) && isKeyedCollection(b)) {
            if (a.size !== b.size) {
              return false;
            }
            let unmatchedEntries = a.size;
            for (const [aKey, aValue] of a.entries()) {
              for (const [bKey, bValue] of b.entries()) {
                /* Given that Map keys can be references, we need
                             * to ensure that they are also deeply equal */
                if (
                  (aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
                  (compare(aKey, bKey) && compare(aValue, bValue))
                ) {
                  unmatchedEntries--;
                }
              }
            }
            return unmatchedEntries === 0;
          }
          const merged = { ...a, ...b };
          for (const key in merged) {
            if (!compare(a && a[key], b && b[key])) {
              return false;
            }
          }
          seen.set(a, b);
          return true;
        }
        return false;
      })(c, d);
    }
    exports_29("equal", equal);
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
      if (!expr) {
        throw new AssertionError(msg);
      }
    }
    exports_29("assert", assert);
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     */
    function assertEquals(actual, expected, msg) {
      if (equal(actual, expected)) {
        return;
      }
      let message = "";
      const actualString = format(actual);
      const expectedString = format(expected);
      try {
        const diffResult = diff_ts_2.default(
          actualString.split("\n"),
          expectedString.split("\n"),
        );
        message = buildMessage(diffResult).join("\n");
      } catch (e) {
        message = `\n${colors_ts_4.red(CAN_NOT_DISPLAY)} + \n\n`;
      }
      if (msg) {
        message = msg;
      }
      throw new AssertionError(message);
    }
    exports_29("assertEquals", assertEquals);
    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     */
    function assertNotEquals(actual, expected, msg) {
      if (!equal(actual, expected)) {
        return;
      }
      let actualString;
      let expectedString;
      try {
        actualString = String(actual);
      } catch (e) {
        actualString = "[Cannot display]";
      }
      try {
        expectedString = String(expected);
      } catch (e) {
        expectedString = "[Cannot display]";
      }
      if (!msg) {
        msg = `actual: ${actualString} expected: ${expectedString}`;
      }
      throw new AssertionError(msg);
    }
    exports_29("assertNotEquals", assertNotEquals);
    /**
     * Make an assertion that `actual` and `expected` are strictly equal.  If
     * not then throw.
     */
    function assertStrictEq(actual, expected, msg) {
      if (actual !== expected) {
        let actualString;
        let expectedString;
        try {
          actualString = String(actual);
        } catch (e) {
          actualString = "[Cannot display]";
        }
        try {
          expectedString = String(expected);
        } catch (e) {
          expectedString = "[Cannot display]";
        }
        if (!msg) {
          msg = `actual: ${actualString} expected: ${expectedString}`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_29("assertStrictEq", assertStrictEq);
    /**
     * Make an assertion that actual contains expected. If not
     * then thrown.
     */
    function assertStrContains(actual, expected, msg) {
      if (!actual.includes(expected)) {
        if (!msg) {
          msg = `actual: "${actual}" expected to contains: "${expected}"`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_29("assertStrContains", assertStrContains);
    /**
     * Make an assertion that `actual` contains the `expected` values
     * If not then thrown.
     */
    function assertArrayContains(actual, expected, msg) {
      const missing = [];
      for (let i = 0; i < expected.length; i++) {
        let found = false;
        for (let j = 0; j < actual.length; j++) {
          if (equal(expected[i], actual[j])) {
            found = true;
            break;
          }
        }
        if (!found) {
          missing.push(expected[i]);
        }
      }
      if (missing.length === 0) {
        return;
      }
      if (!msg) {
        msg = `actual: "${actual}" expected to contains: "${expected}"`;
        msg += "\n";
        msg += `missing: ${missing}`;
      }
      throw new AssertionError(msg);
    }
    exports_29("assertArrayContains", assertArrayContains);
    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then thrown
     */
    function assertMatch(actual, expected, msg) {
      if (!expected.test(actual)) {
        if (!msg) {
          msg = `actual: "${actual}" expected to match: "${expected}"`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_29("assertMatch", assertMatch);
    /**
     * Forcefully throws a failed assertion
     */
    function fail(msg) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      assert(false, `Failed assertion${msg ? `: ${msg}` : "."}`);
    }
    exports_29("fail", fail);
    /** Executes a function, expecting it to throw.  If it does not, then it
     * throws.  An error class and a string that should be included in the
     * error message can also be asserted.
     */
    function assertThrows(fn, ErrorClass, msgIncludes = "", msg) {
      let doesThrow = false;
      let error = null;
      try {
        fn();
      } catch (e) {
        if (
          ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)
        ) {
          msg =
            `Expected error to be instance of "${ErrorClass.name}", but was "${e.constructor.name}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        if (msgIncludes && !e.message.includes(msgIncludes)) {
          msg =
            `Expected error message to include "${msgIncludes}", but got "${e.message}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        doesThrow = true;
        error = e;
      }
      if (!doesThrow) {
        msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
        throw new AssertionError(msg);
      }
      return error;
    }
    exports_29("assertThrows", assertThrows);
    async function assertThrowsAsync(fn, ErrorClass, msgIncludes = "", msg) {
      let doesThrow = false;
      let error = null;
      try {
        await fn();
      } catch (e) {
        if (
          ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)
        ) {
          msg =
            `Expected error to be instance of "${ErrorClass.name}", but got "${e.name}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        if (msgIncludes && !e.message.includes(msgIncludes)) {
          msg =
            `Expected error message to include "${msgIncludes}", but got "${e.message}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        doesThrow = true;
        error = e;
      }
      if (!doesThrow) {
        msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
        throw new AssertionError(msg);
      }
      return error;
    }
    exports_29("assertThrowsAsync", assertThrowsAsync);
    /** Use this to stub out methods that will throw when invoked. */
    function unimplemented(msg) {
      throw new AssertionError(msg || "unimplemented");
    }
    exports_29("unimplemented", unimplemented);
    /** Use this to assert unreachable code. */
    function unreachable() {
      throw new AssertionError("unreachable");
    }
    exports_29("unreachable", unreachable);
    return {
      setters: [
        function (colors_ts_4_1) {
          colors_ts_4 = colors_ts_4_1;
        },
        function (diff_ts_2_1) {
          diff_ts_2 = diff_ts_2_1;
        },
      ],
      execute: function () {
        CAN_NOT_DISPLAY = "[Cannot display]";
        AssertionError = class AssertionError extends Error {
          constructor(message) {
            super(message);
            this.name = "AssertionError";
          }
        };
        exports_29("AssertionError", AssertionError);
      },
    };
  },
);
System.register(
  "https://deno.land/x/std@v0.51.0/log/mod",
  [
    "https://deno.land/x/std@v0.51.0/log/logger",
    "https://deno.land/x/std@v0.51.0/log/handlers",
    "https://deno.land/x/std@v0.51.0/testing/asserts",
    "https://deno.land/x/std@v0.51.0/log/levels",
  ],
  function (exports_30, context_30) {
    "use strict";
    var logger_ts_1,
      handlers_ts_1,
      asserts_ts_1,
      LoggerConfig,
      DEFAULT_LEVEL,
      DEFAULT_CONFIG,
      state,
      handlers,
      debug,
      info,
      warning,
      error,
      critical;
    var __moduleName = context_30 && context_30.id;
    function getLogger(name) {
      if (!name) {
        const d = state.loggers.get("default");
        asserts_ts_1.assert(
          d != null,
          `"default" logger must be set for getting logger without name`,
        );
        return d;
      }
      const result = state.loggers.get(name);
      if (!result) {
        const logger = new logger_ts_1.Logger("NOTSET", []);
        state.loggers.set(name, logger);
        return logger;
      }
      return result;
    }
    exports_30("getLogger", getLogger);
    async function setup(config) {
      state.config = {
        handlers: { ...DEFAULT_CONFIG.handlers, ...config.handlers },
        loggers: { ...DEFAULT_CONFIG.loggers, ...config.loggers },
      };
      // tear down existing handlers
      state.handlers.forEach((handler) => {
        handler.destroy();
      });
      state.handlers.clear();
      // setup handlers
      const handlers = state.config.handlers || {};
      for (const handlerName in handlers) {
        const handler = handlers[handlerName];
        await handler.setup();
        state.handlers.set(handlerName, handler);
      }
      // remove existing loggers
      state.loggers.clear();
      // setup loggers
      const loggers = state.config.loggers || {};
      for (const loggerName in loggers) {
        const loggerConfig = loggers[loggerName];
        const handlerNames = loggerConfig.handlers || [];
        const handlers = [];
        handlerNames.forEach((handlerName) => {
          const handler = state.handlers.get(handlerName);
          if (handler) {
            handlers.push(handler);
          }
        });
        const levelName = loggerConfig.level || DEFAULT_LEVEL;
        const logger = new logger_ts_1.Logger(levelName, handlers);
        state.loggers.set(loggerName, logger);
      }
    }
    exports_30("setup", setup);
    return {
      setters: [
        function (logger_ts_1_1) {
          logger_ts_1 = logger_ts_1_1;
        },
        function (handlers_ts_1_1) {
          handlers_ts_1 = handlers_ts_1_1;
        },
        function (asserts_ts_1_1) {
          asserts_ts_1 = asserts_ts_1_1;
        },
        function (levels_ts_3_1) {
          exports_30({
            "LogLevels": levels_ts_3_1["LogLevels"],
          });
        },
      ],
      execute: function () {
        LoggerConfig = class LoggerConfig {
        };
        exports_30("LoggerConfig", LoggerConfig);
        DEFAULT_LEVEL = "INFO";
        DEFAULT_CONFIG = {
          handlers: {
            default: new handlers_ts_1.ConsoleHandler(DEFAULT_LEVEL),
          },
          loggers: {
            default: {
              level: DEFAULT_LEVEL,
              handlers: ["default"],
            },
          },
        };
        state = {
          handlers: new Map(),
          loggers: new Map(),
          config: DEFAULT_CONFIG,
        };
        exports_30(
          "handlers",
          handlers = {
            BaseHandler: handlers_ts_1.BaseHandler,
            ConsoleHandler: handlers_ts_1.ConsoleHandler,
            WriterHandler: handlers_ts_1.WriterHandler,
            FileHandler: handlers_ts_1.FileHandler,
            RotatingFileHandler: handlers_ts_1.RotatingFileHandler,
          },
        );
        exports_30(
          "debug",
          debug = (msg, ...args) => getLogger("default").debug(msg, ...args),
        );
        exports_30(
          "info",
          info = (msg, ...args) => getLogger("default").info(msg, ...args),
        );
        exports_30(
          "warning",
          warning = (msg, ...args) =>
            getLogger("default").warning(msg, ...args),
        );
        exports_30(
          "error",
          error = (msg, ...args) => getLogger("default").error(msg, ...args),
        );
        exports_30(
          "critical",
          critical = (msg, ...args) =>
            getLogger("default").critical(msg, ...args),
        );
        setup(DEFAULT_CONFIG);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/deps",
  [
    "https://deno.land/std@v0.51.0/async/mod",
    "https://deno.land/std@v0.51.0/encoding/utf8",
    "https://deno.land/std@v0.51.0/testing/asserts",
    "https://deno.land/x/bytes_formater@1.2.0/mod",
    "https://deno.land/x/checksum@1.4.0/mod",
    "https://deno.land/x/sha256@v1.0.2/mod",
    "https://deno.land/x/sql_builder@1.3.5/util",
    "https://deno.land/x/std@v0.51.0/log/mod",
  ],
  function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    return {
      setters: [
        function (mod_ts_2_1) {
          exports_31({
            "deferred": mod_ts_2_1["deferred"],
            "delay": mod_ts_2_1["delay"],
          });
        },
        function (utf8_ts_1_1) {
          exports_31({
            "decode": utf8_ts_1_1["decode"],
            "encode": utf8_ts_1_1["encode"],
          });
        },
        function (asserts_ts_2_1) {
          exports_31({
            "assertEquals": asserts_ts_2_1["assertEquals"],
            "assertThrowsAsync": asserts_ts_2_1["assertThrowsAsync"],
          });
        },
        function (mod_ts_3_1) {
          exports_31({
            "byteFormat": mod_ts_3_1["format"],
          });
        },
        function (mod_ts_4_1) {
          exports_31({
            "Hash": mod_ts_4_1["Hash"],
          });
        },
        function (mod_ts_5_1) {
          exports_31({
            "sha256": mod_ts_5_1["sha256"],
          });
        },
        function (util_ts_1_1) {
          exports_31({
            "replaceParams": util_ts_1_1["replaceParams"],
          });
        },
        function (log_1) {
          exports_31("log", log_1);
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/constant/errors",
  [],
  function (exports_32, context_32) {
    "use strict";
    var WriteError, ResponseTimeoutError;
    var __moduleName = context_32 && context_32.id;
    return {
      setters: [],
      execute: function () {
        WriteError = class WriteError extends Error {
          constructor(msg) {
            super(msg);
          }
        };
        exports_32("WriteError", WriteError);
        ResponseTimeoutError = class ResponseTimeoutError extends Error {
          constructor(msg) {
            super(msg);
          }
        };
        exports_32("ResponseTimeoutError", ResponseTimeoutError);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/logger",
  ["https://deno.land/x/mysql@2.1.0/deps"],
  function (exports_33, context_33) {
    "use strict";
    var deps_ts_4, isDebug;
    var __moduleName = context_33 && context_33.id;
    /** @ignore */
    function debug(func) {
      if (isDebug) {
        func();
      }
    }
    exports_33("debug", debug);
    /** @ignore */
    async function config(config) {
      isDebug = config.debug;
      await deps_ts_4.log.setup({
        handlers: {
          console: new deps_ts_4.log.handlers.ConsoleHandler(
            config.debug ? "DEBUG" : "INFO",
          ),
          file: new deps_ts_4.log.handlers.FileHandler("WARNING", {
            filename: config.logFile,
            formatter: "{levelName} {msg}",
          }),
        },
        loggers: {
          default: {
            level: "DEBUG",
            handlers: ["console", "file"],
          },
        },
      });
    }
    exports_33("config", config);
    return {
      setters: [
        function (deps_ts_4_1) {
          deps_ts_4 = deps_ts_4_1;
        },
      ],
      execute: function () {
        exports_33("log", deps_ts_4.log);
        isDebug = false;
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/auth",
  ["https://deno.land/x/mysql@2.1.0/deps"],
  function (exports_34, context_34) {
    "use strict";
    var deps_ts_5;
    var __moduleName = context_34 && context_34.id;
    function xor(a, b) {
      return a.map((byte, index) => {
        return byte ^ b[index];
      });
    }
    function mysqlNativePassword(password, seed) {
      const hash = new deps_ts_5.Hash("sha1");
      const pwd1 = hash.digest(deps_ts_5.encode(password)).data;
      const pwd2 = hash.digest(pwd1).data;
      let seedAndPwd2 = new Uint8Array(seed.length + pwd2.length);
      seedAndPwd2.set(seed);
      seedAndPwd2.set(pwd2, seed.length);
      seedAndPwd2 = hash.digest(seedAndPwd2).data;
      return xor(seedAndPwd2, pwd1);
    }
    function cachingSha2Password(password, seed) {
      const stage1 = deps_ts_5.sha256(password, "utf8");
      const stage2 = deps_ts_5.sha256(stage1);
      const stage3 = deps_ts_5.sha256(Uint8Array.from([...stage2, ...seed]));
      return xor(stage1, stage3);
    }
    function auth(authPluginName, password, seed) {
      switch (authPluginName) {
        case "mysql_native_password":
          return mysqlNativePassword(password, seed);
        case "caching_sha2_password":
        // TODO
        // return cachingSha2Password(password, seed);
        default:
          throw new Error("Not supported");
      }
    }
    exports_34("default", auth);
    return {
      setters: [
        function (deps_ts_5_1) {
          deps_ts_5 = deps_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/buffer",
  ["https://deno.land/x/mysql@2.1.0/deps"],
  function (exports_35, context_35) {
    "use strict";
    var deps_ts_6, BufferReader, BufferWriter;
    var __moduleName = context_35 && context_35.id;
    return {
      setters: [
        function (deps_ts_6_1) {
          deps_ts_6 = deps_ts_6_1;
        },
      ],
      execute: function () {
        /** @ignore */
        BufferReader = class BufferReader {
          constructor(buffer) {
            this.buffer = buffer;
            this.pos = 0;
          }
          get finished() {
            return this.pos >= this.buffer.length;
          }
          skip(len) {
            this.pos += len;
            return this;
          }
          readBuffer(len) {
            const buffer = this.buffer.slice(this.pos, this.pos + len);
            this.pos += len;
            return buffer;
          }
          readUints(len) {
            let num = 0;
            for (let n = 0; n < len; n++) {
              num += this.buffer[this.pos++] << (8 * n);
            }
            return num;
          }
          readUint8() {
            return this.buffer[this.pos++];
          }
          readUint16() {
            return this.readUints(2);
          }
          readUint32() {
            return this.readUints(4);
          }
          readUint64() {
            return this.readUints(8);
          }
          readNullTerminatedString() {
            let end = this.buffer.indexOf(0x00, this.pos);
            if (end === -1) {
              end = this.buffer.length;
            }
            const buf = this.buffer.slice(this.pos, end);
            this.pos += buf.length + 1;
            return deps_ts_6.decode(buf);
          }
          readString(len) {
            const str = deps_ts_6.decode(
              this.buffer.slice(this.pos, this.pos + len),
            );
            this.pos += len;
            return str;
          }
          readEncodedLen() {
            const first = this.readUint8();
            if (first < 251) {
              return first;
            } else {
              if (first == 0xfc) {
                return this.readUint16();
              } else if (first == 0xfd) {
                return this.readUints(3);
              } else if (first == 0xfe) {
                return this.readUints(8);
              }
            }
            return -1;
          }
          readLenCodeString() {
            const len = this.readEncodedLen();
            if (len == -1) {
              return null;
            }
            return this.readString(len);
          }
        };
        exports_35("BufferReader", BufferReader);
        /** @ignore */
        BufferWriter = class BufferWriter {
          constructor(buffer) {
            this.buffer = buffer;
            this.pos = 0;
          }
          get wroteData() {
            return this.buffer.slice(0, this.pos);
          }
          get length() {
            return this.pos;
          }
          get capacity() {
            return this.buffer.length - this.pos;
          }
          skip(len) {
            this.pos += len;
            return this;
          }
          writeBuffer(buffer) {
            if (buffer.length > this.capacity) {
              buffer = buffer.slice(0, this.capacity);
            }
            this.buffer.set(buffer, this.pos);
            this.pos += buffer.length;
            return this;
          }
          write(byte) {
            this.buffer[this.pos++] = byte;
            return this;
          }
          writeInt16LE(num) {}
          writeIntLE(num, len) {
            const int = new Int32Array(1);
            int[0] = 40;
            console.log(int);
          }
          writeUint16(num) {
            return this.writeUints(2, num);
          }
          writeUint32(num) {
            return this.writeUints(4, num);
          }
          writeUint64(num) {
            return this.writeUints(8, num);
          }
          writeUints(len, num) {
            for (let n = 0; n < len; n++) {
              this.buffer[this.pos++] = (num >> (n * 8)) & 0xff;
            }
            return this;
          }
          writeNullTerminatedString(str) {
            return this.writeString(str).write(0x00);
          }
          writeString(str) {
            const buf = deps_ts_6.encode(str);
            this.buffer.set(buf, this.pos);
            this.pos += buf.length;
            return this;
          }
        };
        exports_35("BufferWriter", BufferWriter);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/constant/capabilities",
  [],
  function (exports_36, context_36) {
    "use strict";
    var ServerCapabilities;
    var __moduleName = context_36 && context_36.id;
    return {
      setters: [],
      execute: function () {
        (function (ServerCapabilities) {
          ServerCapabilities[ServerCapabilities["CLIENT_PROTOCOL_41"] = 512] =
            "CLIENT_PROTOCOL_41";
          ServerCapabilities[ServerCapabilities["CLIENT_CONNECT_WITH_DB"] = 8] =
            "CLIENT_CONNECT_WITH_DB";
          ServerCapabilities[ServerCapabilities["CLIENT_LONG_FLAG"] = 4] =
            "CLIENT_LONG_FLAG";
          ServerCapabilities[
            ServerCapabilities["CLIENT_DEPRECATE_EOF"] = 16777216
          ] = "CLIENT_DEPRECATE_EOF";
          ServerCapabilities[ServerCapabilities["CLIENT_LONG_PASSWORD"] = 1] =
            "CLIENT_LONG_PASSWORD";
          ServerCapabilities[ServerCapabilities["CLIENT_TRANSACTIONS"] = 8192] =
            "CLIENT_TRANSACTIONS";
          ServerCapabilities[
            ServerCapabilities["CLIENT_MULTI_RESULTS"] = 131072
          ] = "CLIENT_MULTI_RESULTS";
          ServerCapabilities[
            ServerCapabilities["CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA"] =
              2097152
          ] = "CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA";
          ServerCapabilities[
            ServerCapabilities["CLIENT_PLUGIN_AUTH"] = 524288
          ] = "CLIENT_PLUGIN_AUTH";
          ServerCapabilities[
            ServerCapabilities["CLIENT_SECURE_CONNECTION"] = 32768
          ] = "CLIENT_SECURE_CONNECTION";
          ServerCapabilities[ServerCapabilities["CLIENT_FOUND_ROWS"] = 2] =
            "CLIENT_FOUND_ROWS";
          ServerCapabilities[
            ServerCapabilities["CLIENT_CONNECT_ATTRS"] = 1048576
          ] = "CLIENT_CONNECT_ATTRS";
        })(ServerCapabilities || (ServerCapabilities = {}));
        exports_36("default", ServerCapabilities);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/constant/charset",
  [],
  function (exports_37, context_37) {
    "use strict";
    var Charset;
    var __moduleName = context_37 && context_37.id;
    return {
      setters: [],
      execute: function () {
        (function (Charset) {
          Charset[Charset["BIG5_CHINESE_CI"] = 1] = "BIG5_CHINESE_CI";
          Charset[Charset["LATIN2_CZECH_CS"] = 2] = "LATIN2_CZECH_CS";
          Charset[Charset["DEC8_SWEDISH_CI"] = 3] = "DEC8_SWEDISH_CI";
          Charset[Charset["CP850_GENERAL_CI"] = 4] = "CP850_GENERAL_CI";
          Charset[Charset["LATIN1_GERMAN1_CI"] = 5] = "LATIN1_GERMAN1_CI";
          Charset[Charset["HP8_ENGLISH_CI"] = 6] = "HP8_ENGLISH_CI";
          Charset[Charset["KOI8R_GENERAL_CI"] = 7] = "KOI8R_GENERAL_CI";
          Charset[Charset["LATIN1_SWEDISH_CI"] = 8] = "LATIN1_SWEDISH_CI";
          Charset[Charset["LATIN2_GENERAL_CI"] = 9] = "LATIN2_GENERAL_CI";
          Charset[Charset["SWE7_SWEDISH_CI"] = 10] = "SWE7_SWEDISH_CI";
          Charset[Charset["ASCII_GENERAL_CI"] = 11] = "ASCII_GENERAL_CI";
          Charset[Charset["UJIS_JAPANESE_CI"] = 12] = "UJIS_JAPANESE_CI";
          Charset[Charset["SJIS_JAPANESE_CI"] = 13] = "SJIS_JAPANESE_CI";
          Charset[Charset["CP1251_BULGARIAN_CI"] = 14] = "CP1251_BULGARIAN_CI";
          Charset[Charset["LATIN1_DANISH_CI"] = 15] = "LATIN1_DANISH_CI";
          Charset[Charset["HEBREW_GENERAL_CI"] = 16] = "HEBREW_GENERAL_CI";
          Charset[Charset["TIS620_THAI_CI"] = 18] = "TIS620_THAI_CI";
          Charset[Charset["EUCKR_KOREAN_CI"] = 19] = "EUCKR_KOREAN_CI";
          Charset[Charset["LATIN7_ESTONIAN_CS"] = 20] = "LATIN7_ESTONIAN_CS";
          Charset[Charset["LATIN2_HUNGARIAN_CI"] = 21] = "LATIN2_HUNGARIAN_CI";
          Charset[Charset["KOI8U_GENERAL_CI"] = 22] = "KOI8U_GENERAL_CI";
          Charset[Charset["CP1251_UKRAINIAN_CI"] = 23] = "CP1251_UKRAINIAN_CI";
          Charset[Charset["GB2312_CHINESE_CI"] = 24] = "GB2312_CHINESE_CI";
          Charset[Charset["GREEK_GENERAL_CI"] = 25] = "GREEK_GENERAL_CI";
          Charset[Charset["CP1250_GENERAL_CI"] = 26] = "CP1250_GENERAL_CI";
          Charset[Charset["LATIN2_CROATIAN_CI"] = 27] = "LATIN2_CROATIAN_CI";
          Charset[Charset["GBK_CHINESE_CI"] = 28] = "GBK_CHINESE_CI";
          Charset[Charset["CP1257_LITHUANIAN_CI"] = 29] =
            "CP1257_LITHUANIAN_CI";
          Charset[Charset["LATIN5_TURKISH_CI"] = 30] = "LATIN5_TURKISH_CI";
          Charset[Charset["LATIN1_GERMAN2_CI"] = 31] = "LATIN1_GERMAN2_CI";
          Charset[Charset["ARMSCII8_GENERAL_CI"] = 32] = "ARMSCII8_GENERAL_CI";
          Charset[Charset["UTF8_GENERAL_CI"] = 33] = "UTF8_GENERAL_CI";
          Charset[Charset["CP1250_CZECH_CS"] = 34] = "CP1250_CZECH_CS";
          Charset[Charset["UCS2_GENERAL_CI"] = 35] = "UCS2_GENERAL_CI";
          Charset[Charset["CP866_GENERAL_CI"] = 36] = "CP866_GENERAL_CI";
          Charset[Charset["KEYBCS2_GENERAL_CI"] = 37] = "KEYBCS2_GENERAL_CI";
          Charset[Charset["MACCE_GENERAL_CI"] = 38] = "MACCE_GENERAL_CI";
          Charset[Charset["MACROMAN_GENERAL_CI"] = 39] = "MACROMAN_GENERAL_CI";
          Charset[Charset["CP852_GENERAL_CI"] = 40] = "CP852_GENERAL_CI";
          Charset[Charset["LATIN7_GENERAL_CI"] = 41] = "LATIN7_GENERAL_CI";
          Charset[Charset["LATIN7_GENERAL_CS"] = 42] = "LATIN7_GENERAL_CS";
          Charset[Charset["MACCE_BIN"] = 43] = "MACCE_BIN";
          Charset[Charset["CP1250_CROATIAN_CI"] = 44] = "CP1250_CROATIAN_CI";
          Charset[Charset["UTF8MB4_GENERAL_CI"] = 45] = "UTF8MB4_GENERAL_CI";
          Charset[Charset["UTF8MB4_BIN"] = 46] = "UTF8MB4_BIN";
          Charset[Charset["LATIN1_BIN"] = 47] = "LATIN1_BIN";
          Charset[Charset["LATIN1_GENERAL_CI"] = 48] = "LATIN1_GENERAL_CI";
          Charset[Charset["LATIN1_GENERAL_CS"] = 49] = "LATIN1_GENERAL_CS";
          Charset[Charset["CP1251_BIN"] = 50] = "CP1251_BIN";
          Charset[Charset["CP1251_GENERAL_CI"] = 51] = "CP1251_GENERAL_CI";
          Charset[Charset["CP1251_GENERAL_CS"] = 52] = "CP1251_GENERAL_CS";
          Charset[Charset["MACROMAN_BIN"] = 53] = "MACROMAN_BIN";
          Charset[Charset["UTF16_GENERAL_CI"] = 54] = "UTF16_GENERAL_CI";
          Charset[Charset["UTF16_BIN"] = 55] = "UTF16_BIN";
          Charset[Charset["UTF16LE_GENERAL_CI"] = 56] = "UTF16LE_GENERAL_CI";
          Charset[Charset["CP1256_GENERAL_CI"] = 57] = "CP1256_GENERAL_CI";
          Charset[Charset["CP1257_BIN"] = 58] = "CP1257_BIN";
          Charset[Charset["CP1257_GENERAL_CI"] = 59] = "CP1257_GENERAL_CI";
          Charset[Charset["UTF32_GENERAL_CI"] = 60] = "UTF32_GENERAL_CI";
          Charset[Charset["UTF32_BIN"] = 61] = "UTF32_BIN";
          Charset[Charset["UTF16LE_BIN"] = 62] = "UTF16LE_BIN";
          Charset[Charset["BINARY"] = 63] = "BINARY";
          Charset[Charset["ARMSCII8_BIN"] = 64] = "ARMSCII8_BIN";
          Charset[Charset["ASCII_BIN"] = 65] = "ASCII_BIN";
          Charset[Charset["CP1250_BIN"] = 66] = "CP1250_BIN";
          Charset[Charset["CP1256_BIN"] = 67] = "CP1256_BIN";
          Charset[Charset["CP866_BIN"] = 68] = "CP866_BIN";
          Charset[Charset["DEC8_BIN"] = 69] = "DEC8_BIN";
          Charset[Charset["GREEK_BIN"] = 70] = "GREEK_BIN";
          Charset[Charset["HEBREW_BIN"] = 71] = "HEBREW_BIN";
          Charset[Charset["HP8_BIN"] = 72] = "HP8_BIN";
          Charset[Charset["KEYBCS2_BIN"] = 73] = "KEYBCS2_BIN";
          Charset[Charset["KOI8R_BIN"] = 74] = "KOI8R_BIN";
          Charset[Charset["KOI8U_BIN"] = 75] = "KOI8U_BIN";
          Charset[Charset["LATIN2_BIN"] = 77] = "LATIN2_BIN";
          Charset[Charset["LATIN5_BIN"] = 78] = "LATIN5_BIN";
          Charset[Charset["LATIN7_BIN"] = 79] = "LATIN7_BIN";
          Charset[Charset["CP850_BIN"] = 80] = "CP850_BIN";
          Charset[Charset["CP852_BIN"] = 81] = "CP852_BIN";
          Charset[Charset["SWE7_BIN"] = 82] = "SWE7_BIN";
          Charset[Charset["UTF8_BIN"] = 83] = "UTF8_BIN";
          Charset[Charset["BIG5_BIN"] = 84] = "BIG5_BIN";
          Charset[Charset["EUCKR_BIN"] = 85] = "EUCKR_BIN";
          Charset[Charset["GB2312_BIN"] = 86] = "GB2312_BIN";
          Charset[Charset["GBK_BIN"] = 87] = "GBK_BIN";
          Charset[Charset["SJIS_BIN"] = 88] = "SJIS_BIN";
          Charset[Charset["TIS620_BIN"] = 89] = "TIS620_BIN";
          Charset[Charset["UCS2_BIN"] = 90] = "UCS2_BIN";
          Charset[Charset["UJIS_BIN"] = 91] = "UJIS_BIN";
          Charset[Charset["GEOSTD8_GENERAL_CI"] = 92] = "GEOSTD8_GENERAL_CI";
          Charset[Charset["GEOSTD8_BIN"] = 93] = "GEOSTD8_BIN";
          Charset[Charset["LATIN1_SPANISH_CI"] = 94] = "LATIN1_SPANISH_CI";
          Charset[Charset["CP932_JAPANESE_CI"] = 95] = "CP932_JAPANESE_CI";
          Charset[Charset["CP932_BIN"] = 96] = "CP932_BIN";
          Charset[Charset["EUCJPMS_JAPANESE_CI"] = 97] = "EUCJPMS_JAPANESE_CI";
          Charset[Charset["EUCJPMS_BIN"] = 98] = "EUCJPMS_BIN";
          Charset[Charset["CP1250_POLISH_CI"] = 99] = "CP1250_POLISH_CI";
          Charset[Charset["UTF16_UNICODE_CI"] = 101] = "UTF16_UNICODE_CI";
          Charset[Charset["UTF16_ICELANDIC_CI"] = 102] = "UTF16_ICELANDIC_CI";
          Charset[Charset["UTF16_LATVIAN_CI"] = 103] = "UTF16_LATVIAN_CI";
          Charset[Charset["UTF16_ROMANIAN_CI"] = 104] = "UTF16_ROMANIAN_CI";
          Charset[Charset["UTF16_SLOVENIAN_CI"] = 105] = "UTF16_SLOVENIAN_CI";
          Charset[Charset["UTF16_POLISH_CI"] = 106] = "UTF16_POLISH_CI";
          Charset[Charset["UTF16_ESTONIAN_CI"] = 107] = "UTF16_ESTONIAN_CI";
          Charset[Charset["UTF16_SPANISH_CI"] = 108] = "UTF16_SPANISH_CI";
          Charset[Charset["UTF16_SWEDISH_CI"] = 109] = "UTF16_SWEDISH_CI";
          Charset[Charset["UTF16_TURKISH_CI"] = 110] = "UTF16_TURKISH_CI";
          Charset[Charset["UTF16_CZECH_CI"] = 111] = "UTF16_CZECH_CI";
          Charset[Charset["UTF16_DANISH_CI"] = 112] = "UTF16_DANISH_CI";
          Charset[Charset["UTF16_LITHUANIAN_CI"] = 113] = "UTF16_LITHUANIAN_CI";
          Charset[Charset["UTF16_SLOVAK_CI"] = 114] = "UTF16_SLOVAK_CI";
          Charset[Charset["UTF16_SPANISH2_CI"] = 115] = "UTF16_SPANISH2_CI";
          Charset[Charset["UTF16_ROMAN_CI"] = 116] = "UTF16_ROMAN_CI";
          Charset[Charset["UTF16_PERSIAN_CI"] = 117] = "UTF16_PERSIAN_CI";
          Charset[Charset["UTF16_ESPERANTO_CI"] = 118] = "UTF16_ESPERANTO_CI";
          Charset[Charset["UTF16_HUNGARIAN_CI"] = 119] = "UTF16_HUNGARIAN_CI";
          Charset[Charset["UTF16_SINHALA_CI"] = 120] = "UTF16_SINHALA_CI";
          Charset[Charset["UTF16_GERMAN2_CI"] = 121] = "UTF16_GERMAN2_CI";
          Charset[Charset["UTF16_CROATIAN_MYSQL561_CI"] = 122] =
            "UTF16_CROATIAN_MYSQL561_CI";
          Charset[Charset["UTF16_UNICODE_520_CI"] = 123] =
            "UTF16_UNICODE_520_CI";
          Charset[Charset["UTF16_VIETNAMESE_CI"] = 124] = "UTF16_VIETNAMESE_CI";
          Charset[Charset["UCS2_UNICODE_CI"] = 128] = "UCS2_UNICODE_CI";
          Charset[Charset["UCS2_ICELANDIC_CI"] = 129] = "UCS2_ICELANDIC_CI";
          Charset[Charset["UCS2_LATVIAN_CI"] = 130] = "UCS2_LATVIAN_CI";
          Charset[Charset["UCS2_ROMANIAN_CI"] = 131] = "UCS2_ROMANIAN_CI";
          Charset[Charset["UCS2_SLOVENIAN_CI"] = 132] = "UCS2_SLOVENIAN_CI";
          Charset[Charset["UCS2_POLISH_CI"] = 133] = "UCS2_POLISH_CI";
          Charset[Charset["UCS2_ESTONIAN_CI"] = 134] = "UCS2_ESTONIAN_CI";
          Charset[Charset["UCS2_SPANISH_CI"] = 135] = "UCS2_SPANISH_CI";
          Charset[Charset["UCS2_SWEDISH_CI"] = 136] = "UCS2_SWEDISH_CI";
          Charset[Charset["UCS2_TURKISH_CI"] = 137] = "UCS2_TURKISH_CI";
          Charset[Charset["UCS2_CZECH_CI"] = 138] = "UCS2_CZECH_CI";
          Charset[Charset["UCS2_DANISH_CI"] = 139] = "UCS2_DANISH_CI";
          Charset[Charset["UCS2_LITHUANIAN_CI"] = 140] = "UCS2_LITHUANIAN_CI";
          Charset[Charset["UCS2_SLOVAK_CI"] = 141] = "UCS2_SLOVAK_CI";
          Charset[Charset["UCS2_SPANISH2_CI"] = 142] = "UCS2_SPANISH2_CI";
          Charset[Charset["UCS2_ROMAN_CI"] = 143] = "UCS2_ROMAN_CI";
          Charset[Charset["UCS2_PERSIAN_CI"] = 144] = "UCS2_PERSIAN_CI";
          Charset[Charset["UCS2_ESPERANTO_CI"] = 145] = "UCS2_ESPERANTO_CI";
          Charset[Charset["UCS2_HUNGARIAN_CI"] = 146] = "UCS2_HUNGARIAN_CI";
          Charset[Charset["UCS2_SINHALA_CI"] = 147] = "UCS2_SINHALA_CI";
          Charset[Charset["UCS2_GERMAN2_CI"] = 148] = "UCS2_GERMAN2_CI";
          Charset[Charset["UCS2_CROATIAN_MYSQL561_CI"] = 149] =
            "UCS2_CROATIAN_MYSQL561_CI";
          Charset[Charset["UCS2_UNICODE_520_CI"] = 150] = "UCS2_UNICODE_520_CI";
          Charset[Charset["UCS2_VIETNAMESE_CI"] = 151] = "UCS2_VIETNAMESE_CI";
          Charset[Charset["UCS2_GENERAL_MYSQL500_CI"] = 159] =
            "UCS2_GENERAL_MYSQL500_CI";
          Charset[Charset["UTF32_UNICODE_CI"] = 160] = "UTF32_UNICODE_CI";
          Charset[Charset["UTF32_ICELANDIC_CI"] = 161] = "UTF32_ICELANDIC_CI";
          Charset[Charset["UTF32_LATVIAN_CI"] = 162] = "UTF32_LATVIAN_CI";
          Charset[Charset["UTF32_ROMANIAN_CI"] = 163] = "UTF32_ROMANIAN_CI";
          Charset[Charset["UTF32_SLOVENIAN_CI"] = 164] = "UTF32_SLOVENIAN_CI";
          Charset[Charset["UTF32_POLISH_CI"] = 165] = "UTF32_POLISH_CI";
          Charset[Charset["UTF32_ESTONIAN_CI"] = 166] = "UTF32_ESTONIAN_CI";
          Charset[Charset["UTF32_SPANISH_CI"] = 167] = "UTF32_SPANISH_CI";
          Charset[Charset["UTF32_SWEDISH_CI"] = 168] = "UTF32_SWEDISH_CI";
          Charset[Charset["UTF32_TURKISH_CI"] = 169] = "UTF32_TURKISH_CI";
          Charset[Charset["UTF32_CZECH_CI"] = 170] = "UTF32_CZECH_CI";
          Charset[Charset["UTF32_DANISH_CI"] = 171] = "UTF32_DANISH_CI";
          Charset[Charset["UTF32_LITHUANIAN_CI"] = 172] = "UTF32_LITHUANIAN_CI";
          Charset[Charset["UTF32_SLOVAK_CI"] = 173] = "UTF32_SLOVAK_CI";
          Charset[Charset["UTF32_SPANISH2_CI"] = 174] = "UTF32_SPANISH2_CI";
          Charset[Charset["UTF32_ROMAN_CI"] = 175] = "UTF32_ROMAN_CI";
          Charset[Charset["UTF32_PERSIAN_CI"] = 176] = "UTF32_PERSIAN_CI";
          Charset[Charset["UTF32_ESPERANTO_CI"] = 177] = "UTF32_ESPERANTO_CI";
          Charset[Charset["UTF32_HUNGARIAN_CI"] = 178] = "UTF32_HUNGARIAN_CI";
          Charset[Charset["UTF32_SINHALA_CI"] = 179] = "UTF32_SINHALA_CI";
          Charset[Charset["UTF32_GERMAN2_CI"] = 180] = "UTF32_GERMAN2_CI";
          Charset[Charset["UTF32_CROATIAN_MYSQL561_CI"] = 181] =
            "UTF32_CROATIAN_MYSQL561_CI";
          Charset[Charset["UTF32_UNICODE_520_CI"] = 182] =
            "UTF32_UNICODE_520_CI";
          Charset[Charset["UTF32_VIETNAMESE_CI"] = 183] = "UTF32_VIETNAMESE_CI";
          Charset[Charset["UTF8_UNICODE_CI"] = 192] = "UTF8_UNICODE_CI";
          Charset[Charset["UTF8_ICELANDIC_CI"] = 193] = "UTF8_ICELANDIC_CI";
          Charset[Charset["UTF8_LATVIAN_CI"] = 194] = "UTF8_LATVIAN_CI";
          Charset[Charset["UTF8_ROMANIAN_CI"] = 195] = "UTF8_ROMANIAN_CI";
          Charset[Charset["UTF8_SLOVENIAN_CI"] = 196] = "UTF8_SLOVENIAN_CI";
          Charset[Charset["UTF8_POLISH_CI"] = 197] = "UTF8_POLISH_CI";
          Charset[Charset["UTF8_ESTONIAN_CI"] = 198] = "UTF8_ESTONIAN_CI";
          Charset[Charset["UTF8_SPANISH_CI"] = 199] = "UTF8_SPANISH_CI";
          Charset[Charset["UTF8_SWEDISH_CI"] = 200] = "UTF8_SWEDISH_CI";
          Charset[Charset["UTF8_TURKISH_CI"] = 201] = "UTF8_TURKISH_CI";
          Charset[Charset["UTF8_CZECH_CI"] = 202] = "UTF8_CZECH_CI";
          Charset[Charset["UTF8_DANISH_CI"] = 203] = "UTF8_DANISH_CI";
          Charset[Charset["UTF8_LITHUANIAN_CI"] = 204] = "UTF8_LITHUANIAN_CI";
          Charset[Charset["UTF8_SLOVAK_CI"] = 205] = "UTF8_SLOVAK_CI";
          Charset[Charset["UTF8_SPANISH2_CI"] = 206] = "UTF8_SPANISH2_CI";
          Charset[Charset["UTF8_ROMAN_CI"] = 207] = "UTF8_ROMAN_CI";
          Charset[Charset["UTF8_PERSIAN_CI"] = 208] = "UTF8_PERSIAN_CI";
          Charset[Charset["UTF8_ESPERANTO_CI"] = 209] = "UTF8_ESPERANTO_CI";
          Charset[Charset["UTF8_HUNGARIAN_CI"] = 210] = "UTF8_HUNGARIAN_CI";
          Charset[Charset["UTF8_SINHALA_CI"] = 211] = "UTF8_SINHALA_CI";
          Charset[Charset["UTF8_GERMAN2_CI"] = 212] = "UTF8_GERMAN2_CI";
          Charset[Charset["UTF8_CROATIAN_MYSQL561_CI"] = 213] =
            "UTF8_CROATIAN_MYSQL561_CI";
          Charset[Charset["UTF8_UNICODE_520_CI"] = 214] = "UTF8_UNICODE_520_CI";
          Charset[Charset["UTF8_VIETNAMESE_CI"] = 215] = "UTF8_VIETNAMESE_CI";
          Charset[Charset["UTF8_GENERAL_MYSQL500_CI"] = 223] =
            "UTF8_GENERAL_MYSQL500_CI";
          Charset[Charset["UTF8MB4_UNICODE_CI"] = 224] = "UTF8MB4_UNICODE_CI";
          Charset[Charset["UTF8MB4_ICELANDIC_CI"] = 225] =
            "UTF8MB4_ICELANDIC_CI";
          Charset[Charset["UTF8MB4_LATVIAN_CI"] = 226] = "UTF8MB4_LATVIAN_CI";
          Charset[Charset["UTF8MB4_ROMANIAN_CI"] = 227] = "UTF8MB4_ROMANIAN_CI";
          Charset[Charset["UTF8MB4_SLOVENIAN_CI"] = 228] =
            "UTF8MB4_SLOVENIAN_CI";
          Charset[Charset["UTF8MB4_POLISH_CI"] = 229] = "UTF8MB4_POLISH_CI";
          Charset[Charset["UTF8MB4_ESTONIAN_CI"] = 230] = "UTF8MB4_ESTONIAN_CI";
          Charset[Charset["UTF8MB4_SPANISH_CI"] = 231] = "UTF8MB4_SPANISH_CI";
          Charset[Charset["UTF8MB4_SWEDISH_CI"] = 232] = "UTF8MB4_SWEDISH_CI";
          Charset[Charset["UTF8MB4_TURKISH_CI"] = 233] = "UTF8MB4_TURKISH_CI";
          Charset[Charset["UTF8MB4_CZECH_CI"] = 234] = "UTF8MB4_CZECH_CI";
          Charset[Charset["UTF8MB4_DANISH_CI"] = 235] = "UTF8MB4_DANISH_CI";
          Charset[Charset["UTF8MB4_LITHUANIAN_CI"] = 236] =
            "UTF8MB4_LITHUANIAN_CI";
          Charset[Charset["UTF8MB4_SLOVAK_CI"] = 237] = "UTF8MB4_SLOVAK_CI";
          Charset[Charset["UTF8MB4_SPANISH2_CI"] = 238] = "UTF8MB4_SPANISH2_CI";
          Charset[Charset["UTF8MB4_ROMAN_CI"] = 239] = "UTF8MB4_ROMAN_CI";
          Charset[Charset["UTF8MB4_PERSIAN_CI"] = 240] = "UTF8MB4_PERSIAN_CI";
          Charset[Charset["UTF8MB4_ESPERANTO_CI"] = 241] =
            "UTF8MB4_ESPERANTO_CI";
          Charset[Charset["UTF8MB4_HUNGARIAN_CI"] = 242] =
            "UTF8MB4_HUNGARIAN_CI";
          Charset[Charset["UTF8MB4_SINHALA_CI"] = 243] = "UTF8MB4_SINHALA_CI";
          Charset[Charset["UTF8MB4_GERMAN2_CI"] = 244] = "UTF8MB4_GERMAN2_CI";
          Charset[Charset["UTF8MB4_CROATIAN_MYSQL561_CI"] = 245] =
            "UTF8MB4_CROATIAN_MYSQL561_CI";
          Charset[Charset["UTF8MB4_UNICODE_520_CI"] = 246] =
            "UTF8MB4_UNICODE_520_CI";
          Charset[Charset["UTF8MB4_VIETNAMESE_CI"] = 247] =
            "UTF8MB4_VIETNAMESE_CI";
          Charset[Charset["UTF8_GENERAL50_CI"] = 253] = "UTF8_GENERAL50_CI";
          Charset[Charset["ARMSCII8"] = 32] = "ARMSCII8";
          Charset[Charset["ASCII"] = 11] = "ASCII";
          Charset[Charset["BIG5"] = 1] = "BIG5";
          Charset[Charset["CP1250"] = 26] = "CP1250";
          Charset[Charset["CP1251"] = 51] = "CP1251";
          Charset[Charset["CP1256"] = 57] = "CP1256";
          Charset[Charset["CP1257"] = 59] = "CP1257";
          Charset[Charset["CP866"] = 36] = "CP866";
          Charset[Charset["CP850"] = 4] = "CP850";
          Charset[Charset["CP852"] = 40] = "CP852";
          Charset[Charset["CP932"] = 95] = "CP932";
          Charset[Charset["DEC8"] = 3] = "DEC8";
          Charset[Charset["EUCJPMS"] = 97] = "EUCJPMS";
          Charset[Charset["EUCKR"] = 19] = "EUCKR";
          Charset[Charset["GB2312"] = 24] = "GB2312";
          Charset[Charset["GBK"] = 28] = "GBK";
          Charset[Charset["GEOSTD8"] = 92] = "GEOSTD8";
          Charset[Charset["GREEK"] = 25] = "GREEK";
          Charset[Charset["HEBREW"] = 16] = "HEBREW";
          Charset[Charset["HP8"] = 6] = "HP8";
          Charset[Charset["KEYBCS2"] = 37] = "KEYBCS2";
          Charset[Charset["KOI8R"] = 7] = "KOI8R";
          Charset[Charset["KOI8U"] = 22] = "KOI8U";
          Charset[Charset["LATIN1"] = 8] = "LATIN1";
          Charset[Charset["LATIN2"] = 9] = "LATIN2";
          Charset[Charset["LATIN5"] = 30] = "LATIN5";
          Charset[Charset["LATIN7"] = 41] = "LATIN7";
          Charset[Charset["MACCE"] = 38] = "MACCE";
          Charset[Charset["MACROMAN"] = 39] = "MACROMAN";
          Charset[Charset["SJIS"] = 13] = "SJIS";
          Charset[Charset["SWE7"] = 10] = "SWE7";
          Charset[Charset["TIS620"] = 18] = "TIS620";
          Charset[Charset["UCS2"] = 35] = "UCS2";
          Charset[Charset["UJIS"] = 12] = "UJIS";
          Charset[Charset["UTF16"] = 54] = "UTF16";
          Charset[Charset["UTF16LE"] = 56] = "UTF16LE";
          Charset[Charset["UTF8"] = 33] = "UTF8";
          Charset[Charset["UTF8MB4"] = 45] = "UTF8MB4";
          Charset[Charset["UTF32"] = 60] = "UTF32";
        })(Charset || (Charset = {}));
        exports_37("Charset", Charset);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/packets/parsers/handshake",
  [
    "https://deno.land/x/mysql@2.1.0/src/buffer",
    "https://deno.land/x/mysql@2.1.0/src/constant/capabilities",
  ],
  function (exports_38, context_38) {
    "use strict";
    var buffer_ts_1, capabilities_ts_1;
    var __moduleName = context_38 && context_38.id;
    /** @ignore */
    function parseHandshake(reader) {
      const protocolVersion = reader.readUint8();
      const serverVersion = reader.readNullTerminatedString();
      const threadId = reader.readUint32();
      const seedWriter = new buffer_ts_1.BufferWriter(new Uint8Array(20));
      seedWriter.writeBuffer(reader.readBuffer(8));
      reader.skip(1);
      let serverCapabilities = reader.readUint16();
      let characterSet = 0,
        statusFlags = 0,
        authPluginDataLength = 0,
        authPluginName = "";
      if (!reader.finished) {
        characterSet = reader.readUint8();
        statusFlags = reader.readUint16();
        serverCapabilities |= reader.readUint16() << 16;
        if (
          (serverCapabilities & capabilities_ts_1.default.CLIENT_PLUGIN_AUTH) !=
            0
        ) {
          authPluginDataLength = reader.readUint8();
        } else {
          reader.skip(1);
        }
        reader.skip(10);
        if (
          (serverCapabilities &
            capabilities_ts_1.default.CLIENT_SECURE_CONNECTION) !=
            0
        ) {
          seedWriter.writeBuffer(
            reader.readBuffer(Math.max(13, authPluginDataLength - 8)),
          );
        }
        if (
          (serverCapabilities & capabilities_ts_1.default.CLIENT_PLUGIN_AUTH) !=
            0
        ) {
          authPluginName = reader.readNullTerminatedString();
        }
      }
      return {
        protocolVersion,
        serverVersion,
        threadId,
        seed: seedWriter.buffer,
        serverCapabilities,
        characterSet,
        statusFlags,
        authPluginName,
      };
    }
    exports_38("parseHandshake", parseHandshake);
    return {
      setters: [
        function (buffer_ts_1_1) {
          buffer_ts_1 = buffer_ts_1_1;
        },
        function (capabilities_ts_1_1) {
          capabilities_ts_1 = capabilities_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/packets/builders/auth",
  [
    "https://deno.land/x/mysql@2.1.0/src/auth",
    "https://deno.land/x/mysql@2.1.0/src/buffer",
    "https://deno.land/x/mysql@2.1.0/src/constant/capabilities",
    "https://deno.land/x/mysql@2.1.0/src/constant/charset",
  ],
  function (exports_39, context_39) {
    "use strict";
    var auth_ts_1, buffer_ts_2, capabilities_ts_2, charset_ts_1;
    var __moduleName = context_39 && context_39.id;
    /** @ignore */
    function buildAuth(packet, params) {
      let clientParam =
        (params.db ? capabilities_ts_2.default.CLIENT_CONNECT_WITH_DB : 0) |
        capabilities_ts_2.default.CLIENT_PLUGIN_AUTH |
        capabilities_ts_2.default.CLIENT_LONG_PASSWORD |
        capabilities_ts_2.default.CLIENT_PROTOCOL_41 |
        capabilities_ts_2.default.CLIENT_TRANSACTIONS |
        capabilities_ts_2.default.CLIENT_MULTI_RESULTS |
        capabilities_ts_2.default.CLIENT_SECURE_CONNECTION;
      if (
        packet.serverCapabilities & capabilities_ts_2.default.CLIENT_LONG_FLAG
      ) {
        clientParam |= capabilities_ts_2.default.CLIENT_LONG_FLAG;
      }
      if (
        packet.serverCapabilities &
        capabilities_ts_2.default.CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA
      ) {
        clientParam |=
          capabilities_ts_2.default.CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA;
      }
      if (
        packet.serverCapabilities &
        capabilities_ts_2.default.CLIENT_DEPRECATE_EOF
      ) {
        clientParam |= capabilities_ts_2.default.CLIENT_DEPRECATE_EOF;
      }
      if (
        packet.serverCapabilities & capabilities_ts_2.default.CLIENT_PLUGIN_AUTH
      ) {
        const writer = new buffer_ts_2.BufferWriter(new Uint8Array(1000));
        writer
          .writeUint32(clientParam)
          .writeUint32(2 ** 24 - 1)
          .write(charset_ts_1.Charset.UTF8_GENERAL_CI)
          .skip(23)
          .writeNullTerminatedString(params.username);
        if (params.password) {
          const authData = auth_ts_1.default(
            packet.authPluginName,
            params.password,
            packet.seed,
          );
          if (
            clientParam &
              capabilities_ts_2.default.CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA ||
            clientParam & capabilities_ts_2.default.CLIENT_SECURE_CONNECTION
          ) {
            // request lenenc-int length of auth-response and string[n] auth-response
            writer.write(authData.length);
            writer.writeBuffer(authData);
          } else {
            writer.writeBuffer(authData);
            writer.write(0);
          }
        } else {
          writer.write(0);
        }
        if (
          clientParam & capabilities_ts_2.default.CLIENT_CONNECT_WITH_DB &&
          params.db
        ) {
          writer.writeNullTerminatedString(params.db);
        }
        if (clientParam & capabilities_ts_2.default.CLIENT_PLUGIN_AUTH) {
          writer.writeNullTerminatedString(packet.authPluginName);
        }
        return writer.wroteData;
      }
      return Uint8Array.from([]);
    }
    exports_39("buildAuth", buildAuth);
    return {
      setters: [
        function (auth_ts_1_1) {
          auth_ts_1 = auth_ts_1_1;
        },
        function (buffer_ts_2_1) {
          buffer_ts_2 = buffer_ts_2_1;
        },
        function (capabilities_ts_2_1) {
          capabilities_ts_2 = capabilities_ts_2_1;
        },
        function (charset_ts_1_1) {
          charset_ts_1 = charset_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/packets/builders/query",
  [
    "https://deno.land/x/mysql@2.1.0/deps",
    "https://deno.land/x/mysql@2.1.0/src/buffer",
  ],
  function (exports_40, context_40) {
    "use strict";
    var deps_ts_7, buffer_ts_3;
    var __moduleName = context_40 && context_40.id;
    /** @ignore */
    function buildQuery(sql, params = []) {
      const data = deps_ts_7.encode(deps_ts_7.replaceParams(sql, params));
      const writer = new buffer_ts_3.BufferWriter(
        new Uint8Array(data.length + 1),
      );
      writer.write(0x03);
      writer.writeBuffer(data);
      return writer.buffer;
    }
    exports_40("buildQuery", buildQuery);
    return {
      setters: [
        function (deps_ts_7_1) {
          deps_ts_7 = deps_ts_7_1;
        },
        function (buffer_ts_3_1) {
          buffer_ts_3 = buffer_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/packets/packet",
  [
    "https://deno.land/x/mysql@2.1.0/deps",
    "https://deno.land/x/mysql@2.1.0/src/buffer",
    "https://deno.land/x/mysql@2.1.0/src/constant/errors",
    "https://deno.land/x/mysql@2.1.0/src/logger",
  ],
  function (exports_41, context_41) {
    "use strict";
    var deps_ts_8,
      buffer_ts_4,
      errors_ts_1,
      logger_ts_2,
      SendPacket,
      ReceivePacket;
    var __moduleName = context_41 && context_41.id;
    return {
      setters: [
        function (deps_ts_8_1) {
          deps_ts_8 = deps_ts_8_1;
        },
        function (buffer_ts_4_1) {
          buffer_ts_4 = buffer_ts_4_1;
        },
        function (errors_ts_1_1) {
          errors_ts_1 = errors_ts_1_1;
        },
        function (logger_ts_2_1) {
          logger_ts_2 = logger_ts_2_1;
        },
      ],
      execute: function () {
        /** @ignore */
        SendPacket = class SendPacket {
          constructor(body, no) {
            this.body = body;
            this.header = { size: body.length, no };
          }
          async send(conn) {
            const body = this.body;
            const data = new buffer_ts_4.BufferWriter(
              new Uint8Array(4 + body.length),
            );
            data.writeUints(3, this.header.size);
            data.write(this.header.no);
            data.writeBuffer(body);
            logger_ts_2.log.debug(
              `send: ${data.length}B \n${deps_ts_8.byteFormat(data.buffer)}\n`,
            );
            try {
              await conn.write(data.buffer);
            } catch (error) {
              throw new errors_ts_1.WriteError(error.message);
            }
          }
        };
        exports_41("SendPacket", SendPacket);
        /** @ignore */
        ReceivePacket = class ReceivePacket {
          async parse(reader) {
            const header = new buffer_ts_4.BufferReader(new Uint8Array(4));
            let readCount = 0;
            let nread = await reader.read(header.buffer);
            if (nread === null) {
              return null;
            }
            readCount = nread;
            this.header = {
              size: header.readUints(3),
              no: header.readUint8(),
            };
            this.body = new buffer_ts_4.BufferReader(
              new Uint8Array(this.header.size),
            );
            nread = await reader.read(this.body.buffer);
            if (nread === null) {
              return null;
            }
            readCount += nread;
            switch (this.body.buffer[0]) {
              case 0x00:
                this.type = "OK";
                break;
              case 0xff:
                this.type = "ERR";
                break;
              case 0xfe:
                this.type = "EOF";
                break;
              default:
                this.type = "RESULT";
                break;
            }
            logger_ts_2.debug(() => {
              const data = new Uint8Array(readCount);
              data.set(header.buffer);
              data.set(this.body.buffer, 4);
              logger_ts_2.log.debug(
                `receive: ${readCount}B, size = ${this.header.size}, no = ${this.header.no} \n${
                  deps_ts_8.byteFormat(data)
                }\n`,
              );
            });
            return this;
          }
        };
        exports_41("ReceivePacket", ReceivePacket);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/packets/parsers/err",
  ["https://deno.land/x/mysql@2.1.0/src/constant/capabilities"],
  function (exports_42, context_42) {
    "use strict";
    var capabilities_ts_3;
    var __moduleName = context_42 && context_42.id;
    /** @ignore */
    function parseError(reader, conn) {
      const code = reader.readUint16();
      const packet = {
        code,
        message: "",
      };
      if (conn.capabilities & capabilities_ts_3.default.CLIENT_PROTOCOL_41) {
        packet.sqlStateMarker = reader.readUint8();
        packet.sqlState = reader.readUints(5);
      }
      packet.message = reader.readNullTerminatedString();
      return packet;
    }
    exports_42("parseError", parseError);
    return {
      setters: [
        function (capabilities_ts_3_1) {
          capabilities_ts_3 = capabilities_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/constant/mysql_types",
  [],
  function (exports_43, context_43) {
    "use strict";
    var MYSQL_TYPE_DECIMAL,
      MYSQL_TYPE_TINY,
      MYSQL_TYPE_SHORT,
      MYSQL_TYPE_LONG,
      MYSQL_TYPE_FLOAT,
      MYSQL_TYPE_DOUBLE,
      MYSQL_TYPE_NULL,
      MYSQL_TYPE_TIMESTAMP,
      MYSQL_TYPE_LONGLONG,
      MYSQL_TYPE_INT24,
      MYSQL_TYPE_DATE,
      MYSQL_TYPE_TIME,
      MYSQL_TYPE_DATETIME,
      MYSQL_TYPE_YEAR,
      MYSQL_TYPE_NEWDATE,
      MYSQL_TYPE_VARCHAR,
      MYSQL_TYPE_BIT,
      MYSQL_TYPE_TIMESTAMP2,
      MYSQL_TYPE_DATETIME2,
      MYSQL_TYPE_TIME2,
      MYSQL_TYPE_NEWDECIMAL,
      MYSQL_TYPE_ENUM,
      MYSQL_TYPE_SET,
      MYSQL_TYPE_TINY_BLOB,
      MYSQL_TYPE_MEDIUM_BLOB,
      MYSQL_TYPE_LONG_BLOB,
      MYSQL_TYPE_BLOB,
      MYSQL_TYPE_VAR_STRING,
      MYSQL_TYPE_STRING,
      MYSQL_TYPE_GEOMETRY;
    var __moduleName = context_43 && context_43.id;
    return {
      setters: [],
      execute: function () {
        /** @ignore */
        exports_43("MYSQL_TYPE_DECIMAL", MYSQL_TYPE_DECIMAL = 0x00);
        /** @ignore */
        exports_43("MYSQL_TYPE_TINY", MYSQL_TYPE_TINY = 0x01);
        /** @ignore */
        exports_43("MYSQL_TYPE_SHORT", MYSQL_TYPE_SHORT = 0x02);
        /** @ignore */
        exports_43("MYSQL_TYPE_LONG", MYSQL_TYPE_LONG = 0x03);
        /** @ignore */
        exports_43("MYSQL_TYPE_FLOAT", MYSQL_TYPE_FLOAT = 0x04);
        /** @ignore */
        exports_43("MYSQL_TYPE_DOUBLE", MYSQL_TYPE_DOUBLE = 0x05);
        /** @ignore */
        exports_43("MYSQL_TYPE_NULL", MYSQL_TYPE_NULL = 0x06);
        /** @ignore */
        exports_43("MYSQL_TYPE_TIMESTAMP", MYSQL_TYPE_TIMESTAMP = 0x07);
        /** @ignore */
        exports_43("MYSQL_TYPE_LONGLONG", MYSQL_TYPE_LONGLONG = 0x08);
        /** @ignore */
        exports_43("MYSQL_TYPE_INT24", MYSQL_TYPE_INT24 = 0x09);
        /** @ignore */
        exports_43("MYSQL_TYPE_DATE", MYSQL_TYPE_DATE = 0x0a);
        /** @ignore */
        exports_43("MYSQL_TYPE_TIME", MYSQL_TYPE_TIME = 0x0b);
        /** @ignore */
        exports_43("MYSQL_TYPE_DATETIME", MYSQL_TYPE_DATETIME = 0x0c);
        /** @ignore */
        exports_43("MYSQL_TYPE_YEAR", MYSQL_TYPE_YEAR = 0x0d);
        /** @ignore */
        exports_43("MYSQL_TYPE_NEWDATE", MYSQL_TYPE_NEWDATE = 0x0e);
        /** @ignore */
        exports_43("MYSQL_TYPE_VARCHAR", MYSQL_TYPE_VARCHAR = 0x0f);
        /** @ignore */
        exports_43("MYSQL_TYPE_BIT", MYSQL_TYPE_BIT = 0x10);
        /** @ignore */
        exports_43("MYSQL_TYPE_TIMESTAMP2", MYSQL_TYPE_TIMESTAMP2 = 0x11);
        /** @ignore */
        exports_43("MYSQL_TYPE_DATETIME2", MYSQL_TYPE_DATETIME2 = 0x12);
        /** @ignore */
        exports_43("MYSQL_TYPE_TIME2", MYSQL_TYPE_TIME2 = 0x13);
        /** @ignore */
        exports_43("MYSQL_TYPE_NEWDECIMAL", MYSQL_TYPE_NEWDECIMAL = 0xf6);
        /** @ignore */
        exports_43("MYSQL_TYPE_ENUM", MYSQL_TYPE_ENUM = 0xf7);
        /** @ignore */
        exports_43("MYSQL_TYPE_SET", MYSQL_TYPE_SET = 0xf8);
        /** @ignore */
        exports_43("MYSQL_TYPE_TINY_BLOB", MYSQL_TYPE_TINY_BLOB = 0xf9);
        /** @ignore */
        exports_43("MYSQL_TYPE_MEDIUM_BLOB", MYSQL_TYPE_MEDIUM_BLOB = 0xfa);
        /** @ignore */
        exports_43("MYSQL_TYPE_LONG_BLOB", MYSQL_TYPE_LONG_BLOB = 0xfb);
        /** @ignore */
        exports_43("MYSQL_TYPE_BLOB", MYSQL_TYPE_BLOB = 0xfc);
        /** @ignore */
        exports_43("MYSQL_TYPE_VAR_STRING", MYSQL_TYPE_VAR_STRING = 0xfd);
        /** @ignore */
        exports_43("MYSQL_TYPE_STRING", MYSQL_TYPE_STRING = 0xfe);
        /** @ignore */
        exports_43("MYSQL_TYPE_GEOMETRY", MYSQL_TYPE_GEOMETRY = 0xff);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/packets/parsers/result",
  ["https://deno.land/x/mysql@2.1.0/src/constant/mysql_types"],
  function (exports_44, context_44) {
    "use strict";
    var mysql_types_ts_1;
    var __moduleName = context_44 && context_44.id;
    /** @ignore */
    function parseField(reader) {
      const catalog = reader.readLenCodeString();
      const schema = reader.readLenCodeString();
      const table = reader.readLenCodeString();
      const originTable = reader.readLenCodeString();
      const name = reader.readLenCodeString();
      const originName = reader.readLenCodeString();
      reader.skip(1);
      const encoding = reader.readUint16();
      const fieldLen = reader.readUint32();
      const fieldType = reader.readUint8();
      const fieldFlag = reader.readUint16();
      const decimals = reader.readUint8();
      reader.skip(1);
      const defaultVal = reader.readLenCodeString();
      return {
        catalog,
        schema,
        table,
        originName,
        fieldFlag,
        originTable,
        fieldLen,
        name,
        fieldType,
        encoding,
        decimals,
        defaultVal,
      };
    }
    exports_44("parseField", parseField);
    /** @ignore */
    function parseRow(reader, fileds) {
      const row = {};
      for (let i = 0; i < fileds.length; i++) {
        const name = fileds[i].name;
        const val = reader.readLenCodeString();
        row[name] = val === null ? null : convertType(fileds[i], val);
      }
      return row;
    }
    exports_44("parseRow", parseRow);
    /** @ignore */
    function convertType(field, val) {
      const { fieldType, fieldLen } = field;
      if (fieldType === mysql_types_ts_1.MYSQL_TYPE_TINY && fieldLen === 1) {
        return !!parseInt(val);
      }
      switch (fieldType) {
        case mysql_types_ts_1.MYSQL_TYPE_DECIMAL:
        case mysql_types_ts_1.MYSQL_TYPE_DOUBLE:
        case mysql_types_ts_1.MYSQL_TYPE_FLOAT:
        case mysql_types_ts_1.MYSQL_TYPE_DATETIME2:
        case mysql_types_ts_1.MYSQL_TYPE_NEWDECIMAL:
          return parseFloat(val);
        case mysql_types_ts_1.MYSQL_TYPE_TINY:
        case mysql_types_ts_1.MYSQL_TYPE_SHORT:
        case mysql_types_ts_1.MYSQL_TYPE_LONG:
        case mysql_types_ts_1.MYSQL_TYPE_LONGLONG:
        case mysql_types_ts_1.MYSQL_TYPE_INT24:
          return parseInt(val);
        case mysql_types_ts_1.MYSQL_TYPE_VARCHAR:
        case mysql_types_ts_1.MYSQL_TYPE_VAR_STRING:
        case mysql_types_ts_1.MYSQL_TYPE_STRING:
        case mysql_types_ts_1.MYSQL_TYPE_TIME:
        case mysql_types_ts_1.MYSQL_TYPE_TIME2:
          return val;
        case mysql_types_ts_1.MYSQL_TYPE_DATE:
        case mysql_types_ts_1.MYSQL_TYPE_TIMESTAMP:
        case mysql_types_ts_1.MYSQL_TYPE_DATETIME:
        case mysql_types_ts_1.MYSQL_TYPE_NEWDATE:
        case mysql_types_ts_1.MYSQL_TYPE_TIMESTAMP2:
        case mysql_types_ts_1.MYSQL_TYPE_DATETIME2:
          return new Date(val);
        default:
          return val;
      }
    }
    return {
      setters: [
        function (mysql_types_ts_1_1) {
          mysql_types_ts_1 = mysql_types_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/connection",
  [
    "https://deno.land/x/mysql@2.1.0/deps",
    "https://deno.land/x/mysql@2.1.0/src/constant/errors",
    "https://deno.land/x/mysql@2.1.0/src/logger",
    "https://deno.land/x/mysql@2.1.0/src/packets/builders/auth",
    "https://deno.land/x/mysql@2.1.0/src/packets/builders/query",
    "https://deno.land/x/mysql@2.1.0/src/packets/packet",
    "https://deno.land/x/mysql@2.1.0/src/packets/parsers/err",
    "https://deno.land/x/mysql@2.1.0/src/packets/parsers/handshake",
    "https://deno.land/x/mysql@2.1.0/src/packets/parsers/result",
  ],
  function (exports_45, context_45) {
    "use strict";
    var deps_ts_9,
      errors_ts_2,
      logger_ts_3,
      auth_ts_2,
      query_ts_1,
      packet_ts_1,
      err_ts_1,
      handshake_ts_1,
      result_ts_1,
      ConnectionState,
      Connection;
    var __moduleName = context_45 && context_45.id;
    return {
      setters: [
        function (deps_ts_9_1) {
          deps_ts_9 = deps_ts_9_1;
        },
        function (errors_ts_2_1) {
          errors_ts_2 = errors_ts_2_1;
        },
        function (logger_ts_3_1) {
          logger_ts_3 = logger_ts_3_1;
        },
        function (auth_ts_2_1) {
          auth_ts_2 = auth_ts_2_1;
        },
        function (query_ts_1_1) {
          query_ts_1 = query_ts_1_1;
        },
        function (packet_ts_1_1) {
          packet_ts_1 = packet_ts_1_1;
        },
        function (err_ts_1_1) {
          err_ts_1 = err_ts_1_1;
        },
        function (handshake_ts_1_1) {
          handshake_ts_1 = handshake_ts_1_1;
        },
        function (result_ts_1_1) {
          result_ts_1 = result_ts_1_1;
        },
      ],
      execute: function () {
        /**
             * Connection state
             */
        (function (ConnectionState) {
          ConnectionState[ConnectionState["CONNECTING"] = 0] = "CONNECTING";
          ConnectionState[ConnectionState["CONNECTED"] = 1] = "CONNECTED";
          ConnectionState[ConnectionState["COLSING"] = 2] = "COLSING";
          ConnectionState[ConnectionState["CLOSED"] = 3] = "CLOSED";
        })(ConnectionState || (ConnectionState = {}));
        exports_45("ConnectionState", ConnectionState);
        /** Connection for mysql */
        Connection = class Connection {
          constructor(client) {
            this.client = client;
            this.state = ConnectionState.CONNECTING;
            this.capabilities = 0;
            this.serverVersion = "";
          }
          async _connect() {
            const { hostname, port = 3306 } = this.client.config;
            logger_ts_3.log.info(`connecting ${hostname}:${port}`);
            this.conn = await Deno.connect({
              hostname,
              port,
              transport: "tcp",
            });
            let receive = await this.nextPacket();
            const handshakePacket = handshake_ts_1.parseHandshake(receive.body);
            const data = auth_ts_2.buildAuth(handshakePacket, {
              username: this.client.config.username ?? "",
              password: this.client.config.password,
              db: this.client.config.db,
            });
            await new packet_ts_1.SendPacket(data, 0x1).send(this.conn);
            this.state = ConnectionState.CONNECTING;
            this.serverVersion = handshakePacket.serverVersion;
            this.capabilities = handshakePacket.serverCapabilities;
            receive = await this.nextPacket();
            const header = receive.body.readUint8();
            if (header === 0xff) {
              const error = err_ts_1.parseError(receive.body, this);
              logger_ts_3.log.error(
                `connect error(${error.code}): ${error.message}`,
              );
              this.close();
              throw new Error(error.message);
            } else {
              logger_ts_3.log.info(
                `connected to ${this.client.config.hostname}`,
              );
              this.state = ConnectionState.CONNECTED;
            }
            if (this.client.config.charset) {
              await this.execute(`SET NAMES ${this.client.config.charset}`);
            }
          }
          /** Connect to database */
          async connect() {
            await this._connect();
          }
          async nextPacket() {
            let eofCount = 0;
            const timeout = this.client.config.timeout || 1000;
            while (this.conn) {
              const packet = await new packet_ts_1.ReceivePacket().parse(
                this.conn,
              );
              if (packet) {
                if (packet.type === "ERR") {
                  packet.body.skip(1);
                  const error = err_ts_1.parseError(packet.body, this);
                  throw new Error(error.message);
                }
                return packet;
              } else {
                await deps_ts_9.delay(100);
                if (eofCount++ * 100 >= timeout) {
                  throw new errors_ts_2.ResponseTimeoutError(
                    "Read packet timeout",
                  );
                }
              }
            }
            throw new Error("Not connected");
          }
          /**
                 * Check if database server version is less than 5.7.0
                 *
                 * MySQL version is "x.y.z"
                 *   eg "5.5.62"
                 *
                 * MariaDB version is "5.5.5-x.y.z-MariaDB[-build-infos]" for versions after 5 (10.0 etc)
                 *   eg "5.5.5-10.4.10-MariaDB-1:10.4.10+maria~bionic"
                 * and "x.y.z-MariaDB-[build-infos]" for 5.x versions
                 *   eg "5.5.64-MariaDB-1~trusty"
                 */
          lessThan57() {
            const version = this.serverVersion;
            if (!version.includes("MariaDB")) {
              return version < "5.7.0";
            }
            const segments = version.split("-");
            // MariaDB v5.x
            if (segments[1] === "MariaDB") {
              return segments[0] < "5.7.0";
            }
            // MariaDB v10+
            return false;
          }
          /** Close database connection */
          close() {
            logger_ts_3.log.info("close connection");
            this.state = ConnectionState.COLSING;
            this.conn && this.conn.close();
            this.state = ConnectionState.CLOSED;
          }
          /**
                 * excute query sql
                 * @param sql query sql string
                 * @param params query params
                 */
          async query(sql, params) {
            const result = await this.execute(sql, params);
            if (result && result.rows) {
              return result.rows;
            } else {
              return result;
            }
          }
          /**
                 * excute sql
                 * @param sql sql string
                 * @param params query params
                 */
          async execute(sql, params) {
            if (!this.conn) {
              throw new Error("Must be connected first");
            }
            const data = query_ts_1.buildQuery(sql, params);
            await new packet_ts_1.SendPacket(data, 0).send(this.conn);
            let receive = await this.nextPacket();
            if (receive.type === "OK") {
              receive.body.skip(1);
              return {
                affectedRows: receive.body.readEncodedLen(),
                lastInsertId: receive.body.readEncodedLen(),
              };
            }
            let fieldCount = receive.body.readEncodedLen();
            const fields = [];
            while (fieldCount--) {
              const packet = await this.nextPacket();
              if (packet) {
                const field = result_ts_1.parseField(packet.body);
                fields.push(field);
              }
            }
            const rows = [];
            if (this.lessThan57()) {
              // EOF(less than 5.7)
              receive = await this.nextPacket();
            }
            while (true) {
              receive = await this.nextPacket();
              if (receive.type === "EOF") {
                break;
              } else {
                const row = result_ts_1.parseRow(receive.body, fields);
                rows.push(row);
              }
            }
            return { rows, fields };
          }
        };
        exports_45("Connection", Connection);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/deferred",
  ["https://deno.land/x/mysql@2.1.0/deps"],
  function (exports_46, context_46) {
    "use strict";
    var deps_ts_10, DeferredStack;
    var __moduleName = context_46 && context_46.id;
    return {
      setters: [
        function (deps_ts_10_1) {
          deps_ts_10 = deps_ts_10_1;
        },
      ],
      execute: function () {
        /** @ignore */
        DeferredStack = class DeferredStack {
          constructor(_maxSize, _array = [], creator) {
            this._maxSize = _maxSize;
            this._array = _array;
            this.creator = creator;
            this._queue = [];
            this._size = 0;
            this._size = _array.length;
          }
          get size() {
            return this._size;
          }
          get maxSize() {
            return this._maxSize;
          }
          get available() {
            return this._array.length;
          }
          async pop() {
            if (this._array.length) {
              return this._array.pop();
            } else if (this._size < this._maxSize) {
              this._size++;
              const item = await this.creator();
              return item;
            }
            const defer = deps_ts_10.deferred();
            this._queue.push(defer);
            await defer;
            return this._array.pop();
          }
          async push(item) {
            this._array.push(item);
            if (this._queue.length) {
              this._queue.shift().resolve();
            }
          }
          reduceSize() {
            this._size--;
          }
        };
        exports_46("DeferredStack", DeferredStack);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/src/client",
  [
    "https://deno.land/x/mysql@2.1.0/src/connection",
    "https://deno.land/x/mysql@2.1.0/src/constant/errors",
    "https://deno.land/x/mysql@2.1.0/src/deferred",
    "https://deno.land/x/mysql@2.1.0/src/logger",
  ],
  function (exports_47, context_47) {
    "use strict";
    var connection_ts_1, errors_ts_3, deferred_ts_3, logger_ts_4, Client;
    var __moduleName = context_47 && context_47.id;
    return {
      setters: [
        function (connection_ts_1_1) {
          connection_ts_1 = connection_ts_1_1;
        },
        function (errors_ts_3_1) {
          errors_ts_3 = errors_ts_3_1;
        },
        function (deferred_ts_3_1) {
          deferred_ts_3 = deferred_ts_3_1;
        },
        function (logger_ts_4_1) {
          logger_ts_4 = logger_ts_4_1;
        },
      ],
      execute: function () {
        /**
             * MySQL client
             */
        Client = class Client {
          constructor() {
            this.config = {};
            this._connections = [];
          }
          async createConnection() {
            let connection = new connection_ts_1.Connection(this);
            await connection.connect();
            return connection;
          }
          /** get pool info */
          get pool() {
            if (this._pool) {
              return {
                size: this._pool.size,
                maxSize: this._pool.maxSize,
                available: this._pool.available,
              };
            }
          }
          /**
                 * connect to database
                 * @param config config for client
                 * @returns Clinet instance
                 */
          async connect(config) {
            this.config = {
              hostname: "127.0.0.1",
              username: "root",
              port: 3306,
              poolSize: 1,
              ...config,
            };
            Object.freeze(this.config);
            this._connections = [];
            this._pool = new deferred_ts_3.DeferredStack(
              this.config.poolSize || 10,
              this._connections,
              this.createConnection.bind(this),
            );
            return this;
          }
          /**
                 * excute query sql
                 * @param sql query sql string
                 * @param params query params
                 */
          async query(sql, params) {
            return await this.useConnection(async (connection) => {
              return await connection.query(sql, params);
            });
          }
          /**
                 * excute sql
                 * @param sql sql string
                 * @param params query params
                 */
          async execute(sql, params) {
            return await this.useConnection(async (connection) => {
              return await connection.execute(sql, params);
            });
          }
          async useConnection(fn) {
            if (!this._pool) {
              throw new Error("Unconnected");
            }
            const connection = await this._pool.pop();
            try {
              const result = await fn(connection);
              this._pool.push(connection);
              return result;
            } catch (error) {
              if (
                error instanceof errors_ts_3.WriteError ||
                error instanceof errors_ts_3.ResponseTimeoutError
              ) {
                this._pool.reduceSize();
              } else {
                this._pool.push(connection);
              }
              throw error;
            }
          }
          /**
                 * Execute a transaction process, and the transaction successfully
                 * returns the return value of the transaction process
                 * @param processor transation processor
                 */
          async transaction(processor) {
            return await this.useConnection(async (connection) => {
              try {
                await connection.execute("BEGIN");
                const result = await processor(connection);
                await connection.execute("COMMIT");
                return result;
              } catch (error) {
                logger_ts_4.log.info(`ROLLBACK: ${error.message}`);
                await connection.execute("ROLLBACK");
                throw error;
              }
            });
          }
          /**
                 * close connection
                 */
          async close() {
            await Promise.all(this._connections.map((conn) => conn.close()));
          }
        };
        exports_47("Client", Client);
      },
    };
  },
);
System.register(
  "https://deno.land/x/mysql@2.1.0/mod",
  [
    "https://deno.land/x/mysql@2.1.0/src/client",
    "https://deno.land/x/mysql@2.1.0/src/connection",
  ],
  function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    return {
      setters: [
        function (client_ts_1_1) {
          exports_48({
            "Client": client_ts_1_1["Client"],
          });
        },
        function (connection_ts_2_1) {
          exports_48({
            "Connection": connection_ts_2_1["Connection"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/util",
  [],
  function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    function replaceParams(sql, params) {
      if (!params) {
        return sql;
      }
      let paramIndex = 0;
      sql = sql.replace(/('.*')|(".*")|(\?\?)|(\?)/g, (str) => {
        if (paramIndex >= params.length) {
          return str;
        }
        // ignore
        if (/".*"/g.test(str) || /'.*'/g.test(str)) {
          return str;
        }
        // identifier
        if (str === "??") {
          const val = params[paramIndex++];
          if (val instanceof Array) {
            return `(${
              val.map((item) => replaceParams("??", [item])).join(",")
            })`;
          } else if (val === "*") {
            return val;
          } else if (typeof val === "string" && val.indexOf(".") > -1) {
            // a.b => `a`.`b`
            const _arr = val.split(".");
            return replaceParams(_arr.map(() => "??").join("."), _arr);
          } else if (
            typeof val === "string" &&
            (val.toLowerCase().indexOf(" as ") > -1 ||
              val.toLowerCase().indexOf(" AS ") > -1)
          ) {
            // a as b => `a` AS `b`
            const newVal = val.replace(" as ", " AS ");
            const _arr = newVal.split(" AS ");
            return replaceParams(_arr.map(() => "??").join(" AS "), _arr);
          } else {
            return ["`", val, "`"].join("");
          }
        }
        // value
        const val = params[paramIndex++];
        if (val === null) {
          return "NULL";
        }
        switch (typeof val) {
          case "object":
            if (val instanceof Date) {
              return `"${formatDate(val)}"`;
            }
            if (val instanceof Array) {
              return `(${
                val.map((item) => replaceParams("?", [item])).join(",")
              })`;
            }
          case "string":
            return `"${escapeString(val)}"`;
          case "undefined":
            return "NULL";
          case "number":
          case "boolean":
          default:
            return val;
        }
      });
      return sql;
    }
    exports_49("replaceParams", replaceParams);
    function formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const days = date
        .getDate()
        .toString()
        .padStart(2, "0");
      const hours = date
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const seconds = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
    }
    function escapeString(str) {
      return str.replace(/"/g, '\\"');
    }
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/join",
  ["https://deno.land/x/sql_builder@1.5.0/util"],
  function (exports_50, context_50) {
    "use strict";
    var util_ts_2, Join;
    var __moduleName = context_50 && context_50.id;
    return {
      setters: [
        function (util_ts_2_1) {
          util_ts_2 = util_ts_2_1;
        },
      ],
      execute: function () {
        Join = class Join {
          constructor(type, table, alias) {
            this.table = table;
            this.alias = alias;
            this.value = "";
            const name = alias ? "?? ??" : "??";
            this.value = util_ts_2.replaceParams(
              `${type} ${name}`,
              [table, alias],
            );
          }
          static inner(table, alias) {
            return new Join("INNER JOIN", table, alias);
          }
          static full(table, alias) {
            return new Join("FULL OUTER JOIN", table, alias);
          }
          static left(table, alias) {
            return new Join("LEFT OUTER JOIN", table, alias);
          }
          static right(table, alias) {
            return new Join("RIGHT OUTER JOIN", table, alias);
          }
          on(a, b) {
            this.value += util_ts_2.replaceParams(` ON ?? = ??`, [a, b]);
            return this;
          }
        };
        exports_50("Join", Join);
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/order",
  ["https://deno.land/x/sql_builder@1.5.0/util"],
  function (exports_51, context_51) {
    "use strict";
    var util_ts_3, Order;
    var __moduleName = context_51 && context_51.id;
    return {
      setters: [
        function (util_ts_3_1) {
          util_ts_3 = util_ts_3_1;
        },
      ],
      execute: function () {
        Order = class Order {
          constructor() {
            this.value = "";
          }
          static by(field) {
            const order = new Order();
            return {
              get desc() {
                order.value = util_ts_3.replaceParams("?? DESC", [field]);
                return order;
              },
              get asc() {
                order.value = util_ts_3.replaceParams("?? ASC", [field]);
                return order;
              },
            };
          }
        };
        exports_51("Order", Order);
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/deps",
  [
    "https://deno.land/std@v0.51.0/testing/asserts",
    "https://deno.land/x/sql_builder@1.5.0/util",
  ],
  function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    return {
      setters: [
        function (asserts_ts_3_1) {
          exports_52({
            "assert": asserts_ts_3_1["assert"],
            "assertEquals": asserts_ts_3_1["assertEquals"],
          });
        },
        function (util_ts_4_1) {
          exports_52({
            "replaceParams": util_ts_4_1["replaceParams"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/where",
  ["https://deno.land/x/sql_builder@1.5.0/util"],
  function (exports_53, context_53) {
    "use strict";
    var util_ts_5, Where;
    var __moduleName = context_53 && context_53.id;
    return {
      setters: [
        function (util_ts_5_1) {
          util_ts_5 = util_ts_5_1;
        },
      ],
      execute: function () {
        /**
             * Where sub sql builder
             */
        Where = class Where {
          constructor(expr, params) {
            this.expr = expr;
            this.params = params;
          }
          get value() {
            return this.toString();
          }
          toString() {
            return util_ts_5.replaceParams(this.expr, this.params);
          }
          static expr(expr, ...params) {
            return new Where(expr, params);
          }
          static eq(field, value) {
            return this.expr("?? = ?", field, value);
          }
          /**
                 * eq from object
                 * @param data
                 */
          static from(data) {
            const conditions = Object.keys(data).map((key) =>
              this.eq(key, data[key])
            );
            return this.and(...conditions);
          }
          static gt(field, value) {
            return this.expr("?? > ?", field, value);
          }
          static gte(field, value) {
            return this.expr("?? >= ?", field, value);
          }
          static lt(field, value) {
            return this.expr("?? < ?", field, value);
          }
          static lte(field, value) {
            return this.expr("?? <= ?", field, value);
          }
          static ne(field, value) {
            return this.expr("?? != ?", field, value);
          }
          static isNull(field) {
            return this.expr("?? IS NULL", field);
          }
          static notNull(field) {
            return this.expr("?? NOT NULL", field);
          }
          static in(field, ...values) {
            const params = values.length > 1 ? values : values[0];
            return this.expr("?? IN ?", field, params);
          }
          static notIn(field, ...values) {
            const params = values.length > 1 ? values : values[0];
            return this.expr("?? NOT IN ?", field, params);
          }
          static like(field, value) {
            return this.expr("?? LIKE ?", field, value);
          }
          static between(field, startValue, endValue) {
            return this.expr("?? BETWEEN ? AND ?", field, startValue, endValue);
          }
          static field(name) {
            return {
              gt: (value) => this.gt(name, value),
              gte: (value) => this.gte(name, value),
              lt: (value) => this.lt(name, value),
              lte: (value) => this.lte(name, value),
              ne: (value) => this.ne(name, value),
              eq: (value) => this.eq(name, value),
              isNull: () => this.isNull(name),
              notNull: () => this.notNull(name),
              in: (...values) => this.in(name, ...values),
              notIn: (...values) => this.notIn(name, ...values),
              like: (value) => this.like(name, value),
              between: (start, end) => this.between(name, start, end),
            };
          }
          static and(...expr) {
            const sql = `(${
              expr
                .filter((e) => e)
                .map((e) => e.value)
                .join(" AND ")
            })`;
            return new Where(sql, []);
          }
          static or(...expr) {
            const sql = `(${
              expr
                .filter((e) => e)
                .map((e) => e.value)
                .join(" OR ")
            })`;
            return new Where(sql, []);
          }
        };
        exports_53("Where", Where);
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/query",
  ["https://deno.land/x/sql_builder@1.5.0/deps"],
  function (exports_54, context_54) {
    "use strict";
    var deps_ts_11, Query;
    var __moduleName = context_54 && context_54.id;
    return {
      setters: [
        function (deps_ts_11_1) {
          deps_ts_11 = deps_ts_11_1;
        },
      ],
      execute: function () {
        Query = class Query {
          constructor() {
            this._where = [];
            this._joins = [];
            this._orders = [];
            this._fields = [];
            this._groupBy = [];
            this._having = [];
            this._insertValues = [];
          }
          get orderSQL() {
            if (this._orders && this._orders.length) {
              return `ORDER BY ` +
                this._orders.map((order) => order.value).join(", ");
            }
          }
          get whereSQL() {
            if (this._where && this._where.length) {
              return `WHERE ` + this._where.join(" AND ");
            }
          }
          get havingSQL() {
            if (this._having && this._having.length) {
              return `HAVING ` + this._having.join(" AND ");
            }
          }
          get joinSQL() {
            if (this._joins && this._joins.length) {
              return this._joins.join(" ");
            }
          }
          get groupSQL() {
            if (this._groupBy && this._groupBy.length) {
              return ("GROUP BY " +
                this._groupBy.map((f) => deps_ts_11.replaceParams("??", [f]))
                  .join(", "));
            }
          }
          get limitSQL() {
            if (this._limit) {
              return `LIMIT ${this._limit.start}, ${this._limit.size}`;
            }
          }
          get selectSQL() {
            return [
              "SELECT",
              this._fields.join(", "),
              "FROM",
              deps_ts_11.replaceParams("??", [this._table]),
              this.joinSQL,
              this.whereSQL,
              this.groupSQL,
              this.havingSQL,
              this.orderSQL,
              this.limitSQL,
            ]
              .filter((str) => str)
              .join(" ");
          }
          get insertSQL() {
            const len = this._insertValues.length;
            const fields = Object.keys(this._insertValues[0]);
            const values = this._insertValues.map((row) => {
              return fields.map((key) => row[key]);
            });
            return deps_ts_11.replaceParams(
              `INSERT INTO ?? ?? VALUES ${"? ".repeat(len)}`,
              [
                this._table,
                fields,
                ...values,
              ],
            );
          }
          get updateSQL() {
            deps_ts_11.assert(!!this._updateValue);
            const set = Object.keys(this._updateValue)
              .map((key) => {
                return deps_ts_11.replaceParams(
                  `?? = ?`,
                  [key, this._updateValue[key]],
                );
              })
              .join(", ");
            return [
              deps_ts_11.replaceParams(`UPDATE ?? SET ${set}`, [this._table]),
              this.whereSQL,
            ].join(" ");
          }
          get deleteSQL() {
            return [
              deps_ts_11.replaceParams(`DELETE FROM ??`, [this._table]),
              this.whereSQL,
            ].join(" ");
          }
          table(name) {
            this._table = name;
            return this;
          }
          order(...orders) {
            this._orders = this._orders.concat(orders);
            return this;
          }
          groupBy(...fields) {
            this._groupBy = fields;
            return this;
          }
          where(where) {
            if (typeof where === "string") {
              this._where.push(where);
            } else {
              this._where.push(where.value);
            }
            return this;
          }
          having(where) {
            if (typeof where === "string") {
              this._having.push(where);
            } else {
              this._having.push(where.value);
            }
            return this;
          }
          limit(start, size) {
            this._limit = { start, size };
            return this;
          }
          join(join) {
            if (typeof join === "string") {
              this._joins.push(join);
            } else {
              this._joins.push(join.value);
            }
            return this;
          }
          select(...fields) {
            this._type = "select";
            deps_ts_11.assert(fields.length > 0);
            this._fields = this._fields.concat(fields.map((field) => {
              if (field.toLocaleLowerCase().indexOf(" as ") > -1) {
                return field;
              } else if (field.split(".").length > 1) {
                return deps_ts_11.replaceParams("??.??", field.split("."));
              } else {
                return deps_ts_11.replaceParams("??", [field]);
              }
            }));
            return this;
          }
          insert(data) {
            this._type = "insert";
            if (!(data instanceof Array)) {
              data = [data];
            }
            this._insertValues = data;
            return this;
          }
          update(data) {
            this._type = "update";
            this._updateValue = data;
            return this;
          }
          delete(table) {
            if (table) {
              this._table = table;
            }
            this._type = "delete";
            return this;
          }
          build() {
            deps_ts_11.assert(!!this._table);
            switch (this._type) {
              case "select":
                return this.selectSQL;
              case "insert":
                return this.insertSQL;
              case "update":
                return this.updateSQL;
              case "delete":
                return this.deleteSQL;
              default:
                return "";
            }
          }
        };
        exports_54("Query", Query);
      },
    };
  },
);
System.register(
  "https://deno.land/x/sql_builder@1.5.0/mod",
  [
    "https://deno.land/x/sql_builder@1.5.0/join",
    "https://deno.land/x/sql_builder@1.5.0/order",
    "https://deno.land/x/sql_builder@1.5.0/query",
    "https://deno.land/x/sql_builder@1.5.0/util",
    "https://deno.land/x/sql_builder@1.5.0/where",
  ],
  function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    return {
      setters: [
        function (join_ts_1_1) {
          exports_55({
            "Join": join_ts_1_1["Join"],
          });
        },
        function (order_ts_1_1) {
          exports_55({
            "Order": order_ts_1_1["Order"],
          });
        },
        function (query_ts_2_1) {
          exports_55({
            "Query": query_ts_2_1["Query"],
          });
        },
        function (util_ts_6_1) {
          exports_55({
            "replaceParams": util_ts_6_1["replaceParams"],
          });
        },
        function (where_ts_1_1) {
          exports_55({
            "Where": where_ts_1_1["Where"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
// @ts-nocheck
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
// @ts-nocheck
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
(function (Reflect) {
  // Metadata Proposal
  // https://rbuckton.github.io/reflect-metadata/
  (function (factory) {
    var self;
    const root = typeof global === "object"
      ? global
      : typeof self === "object"
      ? self
      : typeof this === "object"
      ? this
      : Function("return this;")();
    let exporter = makeExporter(Reflect);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return (key, value) => {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value,
          });
        }
        if (previous) {
          previous(key, value);
        }
      };
    }
  })(function (exporter) {
    const hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Symbol support
    const supportsSymbol = typeof Symbol === "function";
    const toPrimitiveSymbol =
      supportsSymbol && typeof Symbol.toPrimitive !== "undefined"
        ? Symbol.toPrimitive
        : "@@toPrimitive";
    const iteratorSymbol =
      supportsSymbol && typeof Symbol.iterator !== "undefined"
        ? Symbol.iterator
        : "@@iterator";
    const supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
    const supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
    const downLevel = !supportsCreate && !supportsProto;
    const HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate
        ? () => MakeDictionary(Object.create(null))
        : supportsProto
        ? () => MakeDictionary({ __proto__: null })
        : () => MakeDictionary({}),
      has: downLevel
        ? (map, key) => hasOwn.call(map, key)
        : (map, key) => key in map,
      get: downLevel
        ? (map, key) => hasOwn.call(map, key) ? map[key] : undefined
        : (map, key) => map[key],
    };
    // Load global or shim versions of Map, Set, and WeakMap
    const functionPrototype = Object.getPrototypeOf(Function);
    const usePolyfill = typeof process === "object" &&
      process.env &&
      process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    const _Map = !usePolyfill &&
      typeof Map === "function" &&
      typeof Map.prototype.entries === "function"
      ? Map
      : CreateMapPolyfill();
    const _Set = !usePolyfill &&
      typeof Set === "function" &&
      typeof Set.prototype.entries === "function"
      ? Set
      : CreateSetPolyfill();
    const _WeakMap = !usePolyfill && typeof WeakMap === "function"
      ? WeakMap
      : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
    const Metadata = new _WeakMap();
    /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators)) {
          throw new TypeError();
        }
        if (!IsObject(target)) {
          throw new TypeError();
        }
        if (
          !IsObject(attributes) &&
          !IsUndefined(attributes) &&
          !IsNull(attributes)
        ) {
          throw new TypeError();
        }
        if (IsNull(attributes)) {
          attributes = undefined;
        }
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators)) {
          throw new TypeError();
        }
        if (!IsConstructor(target)) {
          throw new TypeError();
        }
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
    /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        }
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) {
          throw new TypeError();
        }
        OrdinaryDefineOwnMetadata(
          metadataKey,
          metadataValue,
          target,
          propertyKey,
        );
      }
      return decorator;
    }
    exporter("metadata", metadata);
    /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryDefineOwnMetadata(
        metadataKey,
        metadataValue,
        target,
        propertyKey,
      );
    }
    exporter("defineMetadata", defineMetadata);
    /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) {
        throw new TypeError();
      }
      if (!IsUndefined(propertyKey)) {
        propertyKey = ToPropertyKey(propertyKey);
      }
      const metadataMap = GetOrCreateMetadataMap(
        target,
        propertyKey,
        /*Create*/ false,
      );
      if (IsUndefined(metadataMap)) {
        return false;
      }
      if (!metadataMap.delete(metadataKey)) {
        return false;
      }
      if (metadataMap.size > 0) {
        return true;
      }
      const targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0) {
        return true;
      }
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (let i = decorators.length - 1; i >= 0; --i) {
        const decorator = decorators[i];
        const decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated)) {
            throw new TypeError();
          }
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (let i = decorators.length - 1; i >= 0; --i) {
        const decorator = decorators[i];
        const decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated)) {
            throw new TypeError();
          }
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      let targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create) {
          return undefined;
        }
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      let metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create) {
          return undefined;
        }
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      const hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) {
        return true;
      }
      const parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) {
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      }
      return false;
    }
    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      const metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
      if (IsUndefined(metadataMap)) {
        return false;
      }
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      const hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) {
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      }
      const parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) {
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      }
      return undefined;
    }
    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      const metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
      if (IsUndefined(metadataMap)) {
        return undefined;
      }
      return metadataMap.get(MetadataKey);
    }
    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      const metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
      metadataMap.set(MetadataKey, MetadataValue);
    }
    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
    function OrdinaryMetadataKeys(O, P) {
      const ownKeys = OrdinaryOwnMetadataKeys(O, P);
      const parent = OrdinaryGetPrototypeOf(O);
      if (parent === null) {
        return ownKeys;
      }
      const parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0) {
        return ownKeys;
      }
      if (ownKeys.length <= 0) {
        return parentKeys;
      }
      const set = new _Set();
      const keys = [];
      for (const key of ownKeys) {
        const hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (const key of parentKeys) {
        const hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
    function OrdinaryOwnMetadataKeys(O, P) {
      const keys = [];
      const metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
      if (IsUndefined(metadataMap)) {
        return keys;
      }
      const keysObj = metadataMap.keys();
      const iterator = GetIterator(keysObj);
      let k = 0;
      while (true) {
        const next = IteratorStep(iterator);
        if (!next) {
          keys.length = k;
          return keys;
        }
        const nextValue = IteratorValue(next);
        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
      if (x === null) {
        return 1 /* Null */;
      }
      switch (typeof x) {
        case "undefined":
          return 0 /* Undefined */;
        case "boolean":
          return 2 /* Boolean */;
        case "string":
          return 3 /* String */;
        case "symbol":
          return 4 /* Symbol */;
        case "number":
          return 5 /* Number */;
        case "object":
          return x === null ? 1 /* Null */ : 6 /* Object */;
        default:
          return 6 /* Object */;
      }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
      return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
      return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0 /* Undefined */:
          return input;
        case 1 /* Null */:
          return input;
        case 2 /* Boolean */:
          return input;
        case 3 /* String */:
          return input;
        case 4 /* Symbol */:
          return input;
        case 5 /* Number */:
          return input;
      }
      const hint = PreferredType === 3 /* String */
        ? "string"
        : PreferredType === 5 /* Number */
        ? "number"
        : "default";
      const exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== undefined) {
        const result = exoticToPrim.call(input, hint);
        if (IsObject(result)) {
          throw new TypeError();
        }
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        const toString = O.toString;
        if (IsCallable(toString)) {
          const result = toString.call(O);
          if (!IsObject(result)) {
            return result;
          }
        }
        const valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          const result = valueOf.call(O);
          if (!IsObject(result)) {
            return result;
          }
        }
      } else {
        const valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          const result = valueOf.call(O);
          if (!IsObject(result)) {
            return result;
          }
        }
        const toString = O.toString;
        if (IsCallable(toString)) {
          const result = toString.call(O);
          if (!IsObject(result)) {
            return result;
          }
        }
      }
      throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
      return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
      return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
      const key = ToPrimitive(argument, 3 /* String */);
      if (IsSymbol(key)) {
        return key;
      }
      return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
      return Array.isArray
        ? Array.isArray(argument)
        : argument instanceof Object
        ? argument instanceof Array
        : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
      // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
      return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
      // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
      return typeof argument === "function";
    }
    // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3 /* String */:
          return true;
        case 4 /* Symbol */:
          return true;
        default:
          return false;
      }
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
      const func = V[P];
      if (func === undefined || func === null) {
        return undefined;
      }
      if (!IsCallable(func)) {
        throw new TypeError();
      }
      return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
      const method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method)) {
        throw new TypeError(); // from Call
      }
      const iterator = method.call(obj);
      if (!IsObject(iterator)) {
        throw new TypeError();
      }
      return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
      const result = iterator.next();
      return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
      const f = iterator["return"];
      if (f) {
        f.call(iterator);
      }
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
      const proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype) {
        return proto;
      }
      // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
      // Try to determine the superclass constructor. Compatible implementations
      // must either set __proto__ on a subclass constructor to the superclass constructor,
      // or ensure each class has a valid `constructor` property on its prototype that
      // points back to the constructor.
      // If this is not the same as Function.[[Prototype]], then this is definately inherited.
      // This is the case when in ES6 or when using __proto__ in a compatible browser.
      if (proto !== functionPrototype) {
        return proto;
      }
      // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
      const prototype = O.prototype;
      const prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype) {
        return proto;
      }
      // If the constructor was not a function, then we cannot determine the heritage.
      const constructor = prototypeProto.constructor;
      if (typeof constructor !== "function") {
        return proto;
      }
      // If we have some kind of self-reference, then we cannot determine the heritage.
      if (constructor === O) {
        return proto;
      }
      // we have a pretty good guess at the heritage.
      return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
      const cacheSentinel = {};
      const arraySentinel = [];
      class MapIterator {
        constructor(keys, values, selector) {
          this._index = 0;
          this._keys = keys;
          this._values = values;
          this._selector = selector;
        }
        "@@iterator"() {
          return this;
        }
        [iteratorSymbol]() {
          return this;
        }
        next() {
          const index = this._index;
          if (index >= 0 && index < this._keys.length) {
            const result = this._selector(
              this._keys[index],
              this._values[index],
            );
            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }
            return { value: result, done: false };
          }
          return { value: undefined, done: true };
        }
        throw(error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          throw error;
        }
        return(value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          return { value: value, done: true };
        }
      }
      return class Map {
        constructor() {
          this._keys = [];
          this._values = [];
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        }
        get size() {
          return this._keys.length;
        }
        has(key) {
          return this._find(key, /*insert*/ false) >= 0;
        }
        get(key) {
          const index = this._find(key, /*insert*/ false);
          return index >= 0 ? this._values[index] : undefined;
        }
        set(key, value) {
          const index = this._find(key, /*insert*/ true);
          this._values[index] = value;
          return this;
        }
        delete(key) {
          const index = this._find(key, /*insert*/ false);
          if (index >= 0) {
            const size = this._keys.length;
            for (let i = index + 1; i < size; i++) {
              this._keys[i - 1] = this._keys[i];
              this._values[i - 1] = this._values[i];
            }
            this._keys.length--;
            this._values.length--;
            if (key === this._cacheKey) {
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            return true;
          }
          return false;
        }
        clear() {
          this._keys.length = 0;
          this._values.length = 0;
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        }
        keys() {
          return new MapIterator(this._keys, this._values, getKey);
        }
        values() {
          return new MapIterator(this._keys, this._values, getValue);
        }
        entries() {
          return new MapIterator(this._keys, this._values, getEntry);
        }
        "@@iterator"() {
          return this.entries();
        }
        [iteratorSymbol]() {
          return this.entries();
        }
        _find(key, insert) {
          if (this._cacheKey !== key) {
            this._cacheIndex = this._keys.indexOf((this._cacheKey = key));
          }
          if (this._cacheIndex < 0 && insert) {
            this._cacheIndex = this._keys.length;
            this._keys.push(key);
            this._values.push(undefined);
          }
          return this._cacheIndex;
        }
      };
      function getKey(key, _) {
        return key;
      }
      function getValue(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    // naive Set shim
    function CreateSetPolyfill() {
      return class Set {
        constructor() {
          this._map = new _Map();
        }
        get size() {
          return this._map.size;
        }
        has(value) {
          return this._map.has(value);
        }
        add(value) {
          return this._map.set(value, value), this;
        }
        delete(value) {
          return this._map.delete(value);
        }
        clear() {
          this._map.clear();
        }
        keys() {
          return this._map.keys();
        }
        values() {
          return this._map.values();
        }
        entries() {
          return this._map.entries();
        }
        "@@iterator"() {
          return this.keys();
        }
        [iteratorSymbol]() {
          return this.keys();
        }
      };
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
      const UUID_SIZE = 16;
      const keys = HashMap.create();
      const rootKey = CreateUniqueKey();
      return class WeakMap {
        constructor() {
          this._key = CreateUniqueKey();
        }
        has(target) {
          const table = GetOrCreateWeakMapTable(target, /*create*/ false);
          return table !== undefined ? HashMap.has(table, this._key) : false;
        }
        get(target) {
          const table = GetOrCreateWeakMapTable(target, /*create*/ false);
          return table !== undefined
            ? HashMap.get(table, this._key)
            : undefined;
        }
        set(target, value) {
          const table = GetOrCreateWeakMapTable(target, /*create*/ true);
          table[this._key] = value;
          return this;
        }
        delete(target) {
          const table = GetOrCreateWeakMapTable(target, /*create*/ false);
          return table !== undefined ? delete table[this._key] : false;
        }
        clear() {
          // NOTE: not a real clear, just makes the previous data unreachable
          this._key = CreateUniqueKey();
        }
      };
      function CreateUniqueKey() {
        let key;
        do key = "@@WeakMap@@" + CreateUUID(); while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create) {
            return undefined;
          }
          Object.defineProperty(target, rootKey, {
            value: HashMap.create(),
          });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (let i = 0; i < size; ++i) {
          buffer[i] = (Math.random() * 0xff) | 0;
        }
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined") {
            return crypto.getRandomValues(new Uint8Array(size));
          }
          if (typeof msCrypto !== "undefined") {
            return msCrypto.getRandomValues(new Uint8Array(size));
          }
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        const data = GenRandomBytes(UUID_SIZE);
        // mark as random - RFC 4122 § 4.4
        data[6] = (data[6] & 0x4f) | 0x40;
        data[8] = (data[8] & 0xbf) | 0x80;
        let result = "";
        for (let offset = 0; offset < UUID_SIZE; ++offset) {
          const byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8) {
            result += "-";
          }
          if (byte < 16) {
            result += "0";
          }
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
      obj.__ = undefined;
      delete obj.__;
      return obj;
    }
  });
})(Reflect || (Reflect = {}));
System.register(
  "https://deno.land/x/dso@v1.0.0/deps",
  [
    "https://deno.land/std@v0.51.0/testing/asserts",
    "https://deno.land/x/mysql@2.1.0/mod",
    "https://deno.land/x/sql_builder@1.5.0/mod",
    "./src/Reflect.ts",
  ],
  function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    return {
      setters: [
        function (asserts_ts_4_1) {
          exports_56({
            "assert": asserts_ts_4_1["assert"],
            "assertEquals": asserts_ts_4_1["assertEquals"],
            "assertThrowsAsync": asserts_ts_4_1["assertThrowsAsync"],
          });
        },
        function (mod_ts_6_1) {
          exports_56({
            "Client": mod_ts_6_1["Client"],
            "Connection": mod_ts_6_1["Connection"],
          });
        },
        function (mod_ts_7_1) {
          exports_56({
            "Join": mod_ts_7_1["Join"],
            "Order": mod_ts_7_1["Order"],
            "Query": mod_ts_7_1["Query"],
            "replaceParams": mod_ts_7_1["replaceParams"],
            "Where": mod_ts_7_1["Where"],
          });
        },
        function (_1) {
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/src/util",
  [],
  function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    // 驼峰转下划线
    function camel2line(key) {
      return key.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
    exports_57("camel2line", camel2line);
    // 下划线转驼峰
    function line2camel(key) {
      return key.replace(/_(\w)/g, function (_, letter) {
        return letter.toUpperCase();
      });
    }
    exports_57("line2camel", line2camel);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/src/field",
  ["https://deno.land/x/dso@v1.0.0/src/util"],
  function (exports_58, context_58) {
    "use strict";
    var util_ts_7, Defaults, FieldType;
    var __moduleName = context_58 && context_58.id;
    /** Field Decorator */
    function Field(options) {
      return (target, property) => {
        const fields = target.modelFields;
        const name = util_ts_7.camel2line(property);
        fields.push({ ...options, property, name });
        Reflect.defineMetadata("model:fields", fields, target);
      };
    }
    exports_58("Field", Field);
    return {
      setters: [
        function (util_ts_7_1) {
          util_ts_7 = util_ts_7_1;
        },
      ],
      execute: function () {
        (function (Defaults) {
          Defaults["CURRENT_TIMESTAMP"] = "CURRENT_TIMESTAMP";
          Defaults["NULL"] = "NULL";
        })(Defaults || (Defaults = {}));
        exports_58("Defaults", Defaults);
        /** Field type */
        (function (FieldType) {
          FieldType[FieldType["DATE"] = 0] = "DATE";
          FieldType[FieldType["INT"] = 1] = "INT";
          FieldType[FieldType["STRING"] = 2] = "STRING";
          FieldType[FieldType["TEXT"] = 3] = "TEXT";
          FieldType[FieldType["BOOLEAN"] = 4] = "BOOLEAN";
          FieldType[FieldType["LONGTEXT"] = 5] = "LONGTEXT";
          FieldType[FieldType["GeoPOINT"] = 6] = "GeoPOINT";
        })(FieldType || (FieldType = {}));
        exports_58("FieldType", FieldType);
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/src/model",
  [
    "https://deno.land/x/dso@v1.0.0/deps",
    "https://deno.land/x/dso@v1.0.0/src/dso",
    "https://deno.land/x/dso@v1.0.0/src/field",
  ],
  function (exports_59, context_59) {
    "use strict";
    var deps_ts_12, dso_ts_1, field_ts_1, BaseModel;
    var __moduleName = context_59 && context_59.id;
    /** Model Decorator */
    function Model(name) {
      return (target) => {
        Reflect.defineMetadata("model:name", name, target.prototype);
      };
    }
    exports_59("Model", Model);
    return {
      setters: [
        function (deps_ts_12_1) {
          deps_ts_12 = deps_ts_12_1;
        },
        function (dso_ts_1_1) {
          dso_ts_1 = dso_ts_1_1;
        },
        function (field_ts_1_1) {
          field_ts_1 = field_ts_1_1;
        },
      ],
      execute: function () {
        /** Model base class */
        BaseModel = class BaseModel {
          constructor(connection) {
            this.connection = connection;
          }
          /** get model name */
          get modelName() {
            return Reflect.getMetadata("model:name", this);
          }
          /** get primary key */
          get primaryKey() {
            return this.modelFields.find((field) => field.primary);
          }
          /** get defined fields list */
          get modelFields() {
            return (Reflect.getMetadata("model:fields", this) || [
              {
                type: field_ts_1.FieldType.DATE,
                default: field_ts_1.Defaults.CURRENT_TIMESTAMP,
                autoUpdate: true,
                name: "updated_at",
                property: "updated_at",
              },
              {
                type: field_ts_1.FieldType.DATE,
                default: field_ts_1.Defaults.CURRENT_TIMESTAMP,
                name: "created_at",
                property: "created_at",
              },
            ]);
          }
          /** return a new Query instance with table name */
          builder() {
            const builder = new deps_ts_12.Query();
            return builder.table(this.modelName);
          }
          /**
                 * Convert data object to model
                 * @param data
                 */
          convertModel(data) {
            if (!data) {
              return;
            }
            const model = {};
            const fieldsMapping = {};
            this.modelFields.map((
              field,
            ) => (fieldsMapping[field.name] = field.property));
            Object.keys(data).forEach((key) => {
              const propertyName = fieldsMapping[key];
              model[propertyName || key] = data[key];
            });
            return model;
          }
          /**
                 * Convert model object to db object
                 * @param model
                 */
          convertObject(model) {
            const data = {};
            const fieldsMapping = {};
            this.modelFields.map((
              field,
            ) => (fieldsMapping[field.property] = field.name));
            Object.keys(model).forEach((key) => {
              const name = fieldsMapping[key];
              data[name || key] = model[key];
            });
            return data;
          }
          optionsToQuery(options) {
            const query = this.builder();
            if (options.fields) {
              query.select(...options.fields);
            } else {
              query.select(`${this.modelName}.*`);
            }
            if (options.where) {
              query.where(options.where);
            }
            if (options.group) {
              query.groupBy(...options.group);
            }
            if (options.having) {
              query.having(options.having);
            }
            if (options.join) {
              options.join.forEach((join) => query.join(join));
            }
            if (options.limit) {
              query.limit(...options.limit);
            }
            if (options.order) {
              options.order.forEach((order) => query.order(order));
            }
            return query;
          }
          /**
                 * find one record
                 * @param where conditions
                 */
          async findOne(options) {
            if (options instanceof deps_ts_12.Where) {
              options = {
                where: options,
              };
            }
            const result = await this.query(
              this.optionsToQuery(options).limit(0, 1),
            );
            return this.convertModel(result[0]);
          }
          /**
                 * delete by conditions
                 * @param where
                 */
          async delete(where) {
            const result = await this.execute(
              this.builder()
                .delete()
                .where(where),
            );
            return result.affectedRows ?? 0;
          }
          /** find all records by given conditions */
          async findAll(options) {
            if (options instanceof deps_ts_12.Where) {
              options = {
                where: options,
              };
            }
            const result = await this.query(this.optionsToQuery(options));
            return result.map((record) => this.convertModel(record));
          }
          /** find one record by primary key */
          async findById(id) {
            deps_ts_12.assert(!!this.primaryKey);
            return await this.findOne(
              deps_ts_12.Where.field(this.primaryKey.name).eq(id),
            );
          }
          /** insert record */
          async insert(fields) {
            const query = this.builder().insert(this.convertObject(fields));
            const result = await this.execute(query);
            return result.lastInsertId;
          }
          /** update records by given conditions */
          async update(data, where) {
            if (
              !where &&
              this.primaryKey &&
              data[this.primaryKey.property]
            ) {
              where = deps_ts_12.Where.field(this.primaryKey.name).eq(
                data[this.primaryKey.property],
              );
            }
            const query = this.builder()
              .update(this.convertObject(data))
              .where(where ?? "");
            const result = await this.execute(query);
            return result.affectedRows;
          }
          /**
                 * query custom
                 * @param query
                 */
          async query(query) {
            const sql = query.build();
            dso_ts_1.dso.showQueryLog &&
              console.log(`\n[ DSO:QUERY ]\nSQL:\t ${sql}\n`);
            const result = this.connection ? await this.connection.query(sql)
            : await dso_ts_1.dso.client.query(sql);
            dso_ts_1.dso.showQueryLog && console.log(`REUSLT:\t`, result, `\n`);
            return result;
          }
          /**
                 * excute custom
                 * @param query
                 */
          async execute(query) {
            const sql = query.build();
            dso_ts_1.dso.showQueryLog &&
              console.log(`\n[ DSO:EXECUTE ]\nSQL:\t ${sql}\n`);
            const result = this.connection
              ? await this.connection.execute(sql)
              : await dso_ts_1.dso.client.execute(sql);
            dso_ts_1.dso.showQueryLog && console.log(`REUSLT:\t`, result, `\n`);
            return result;
          }
        };
        exports_59("BaseModel", BaseModel);
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/src/sync",
  [
    "https://deno.land/x/dso@v1.0.0/deps",
    "https://deno.land/x/dso@v1.0.0/mod",
    "https://deno.land/x/dso@v1.0.0/src/field",
  ],
  function (exports_60, context_60) {
    "use strict";
    var deps_ts_13, mod_ts_8, field_ts_2;
    var __moduleName = context_60 && context_60.id;
    async function sync(client, model, force) {
      if (force) {
        await client.execute(`DROP TABLE IF EXISTS ${model.modelName}`);
      }
      let defs = model.modelFields
        .map((field) => {
          let def = field.name;
          let type = "";
          switch (field.type) {
            case field_ts_2.FieldType.STRING:
              type = `VARCHAR(${field.length || 255})`;
              break;
            case field_ts_2.FieldType.INT:
              type = `INT(${field.length || 11})`;
              break;
            case field_ts_2.FieldType.DATE:
              type = `TIMESTAMP`;
              break;
            case field_ts_2.FieldType.BOOLEAN:
              type = `TINYINT(1)`;
              break;
            case field_ts_2.FieldType.TEXT:
              type = `TEXT(${field.length})`;
              break;
            case field_ts_2.FieldType.LONGTEXT: {
              type = `LONGTEXT`;
              break;
            }
            case field_ts_2.FieldType.GeoPOINT: {
              type = `POINT`;
              break;
            }
          }
          def += ` ${type}`;
          if (field.notNull) {
            def += " NOT NULL";
          }
          if (field.default != null) {
            if (field.default === field_ts_2.Defaults.NULL) {
              def += ` NULL DEFAULT NULL`;
            } else {
              def += ` DEFAULT ${field.default}`;
            }
          }
          if (field.autoIncrement) {
            def += " AUTO_INCREMENT";
          }
          if (field.autoUpdate) {
            deps_ts_13.assert(
              field.type === field_ts_2.FieldType.DATE,
              "AutoUpdate only support Date field",
            );
            def += ` ON UPDATE CURRENT_TIMESTAMP()`;
          }
          return def;
        })
        .join(", ");
      if (model.primaryKey) {
        defs += `, PRIMARY KEY (${model.primaryKey.name})`;
      }
      const sql = [
        "CREATE TABLE IF NOT EXISTS",
        model.modelName,
        "(",
        defs,
        ")",
        "ENGINE=InnoDB DEFAULT CHARSET=utf8;",
      ].join(" ");
      mod_ts_8.dso.showQueryLog &&
        console.log(`\n[ DSO:SYNC ]\nSQL:\t ${sql}\n`);
      const result = await client.execute(sql);
      mod_ts_8.dso.showQueryLog && console.log(`REUSLT:\t`, result, `\n`);
    }
    exports_60("sync", sync);
    return {
      setters: [
        function (deps_ts_13_1) {
          deps_ts_13 = deps_ts_13_1;
        },
        function (mod_ts_8_1) {
          mod_ts_8 = mod_ts_8_1;
        },
        function (field_ts_2_1) {
          field_ts_2 = field_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/src/transaction",
  ["https://deno.land/x/dso@v1.0.0/src/dso"],
  function (exports_61, context_61) {
    "use strict";
    var dso_ts_2, Transaction;
    var __moduleName = context_61 && context_61.id;
    return {
      setters: [
        function (dso_ts_2_1) {
          dso_ts_2 = dso_ts_2_1;
        },
      ],
      execute: function () {
        Transaction = class Transaction {
          constructor(_conn) {
            this._conn = _conn;
          }
          getModel(Model) {
            const model = new Model(this._conn);
            return model;
          }
          static async transaction(processor) {
            return (await dso_ts_2.dso.client.transaction(async (conn) => {
              const trans = new Transaction(conn);
              return await processor(trans);
            }));
          }
        };
        exports_61("Transaction", Transaction);
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/src/dso",
  [
    "https://deno.land/x/dso@v1.0.0/deps",
    "https://deno.land/x/dso@v1.0.0/src/sync",
    "https://deno.land/x/dso@v1.0.0/src/transaction",
  ],
  function (exports_62, context_62) {
    "use strict";
    var deps_ts_14, sync_ts_1, transaction_ts_1, _client, _models, dso;
    var __moduleName = context_62 && context_62.id;
    return {
      setters: [
        function (deps_ts_14_1) {
          deps_ts_14 = deps_ts_14_1;
        },
        function (sync_ts_1_1) {
          sync_ts_1 = sync_ts_1_1;
        },
        function (transaction_ts_1_1) {
          transaction_ts_1 = transaction_ts_1_1;
        },
      ],
      execute: function () {
        /** @ignore */
        _models = [];
        /**
             * Global dso instance
             */
        exports_62(
          "dso",
          dso = {
            /**
                 * set true will show exucte/query sql
                 */
            showQueryLog: false,

            /**
                 * Sync model to database table
                 * @param force set true, will drop table before create table
                 */
            async sync(force = false) {
              for (const model of _models) {
                await sync_ts_1.sync(_client, model, force);
              }
            },
            /**
                 * Database client
                 */
            get client() {
              return _client;
            },
            /**
                 * all models
                 */
            get models() {
              return _models;
            },
            /**
                 * add model
                 * @param model
                 */
            define(ModelClass) {
              const model = new ModelClass();
              _models.push(model);
              return model;
            },
            transaction: transaction_ts_1.Transaction.transaction,

            /**
                 * connect to database
                 * @param config client config
                 */
            async connect(config) {
              if (config instanceof deps_ts_14.Client) {
                _client = config;
              } else {
                _client = new deps_ts_14.Client();
                await _client.connect(config);
              }
              return _client;
            },
            close() {
              _client.close();
            },
          },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/dso@v1.0.0/mod",
  [
    "https://deno.land/x/dso@v1.0.0/deps",
    "https://deno.land/x/dso@v1.0.0/src/dso",
    "https://deno.land/x/dso@v1.0.0/src/field",
    "https://deno.land/x/dso@v1.0.0/src/model",
    "https://deno.land/x/dso@v1.0.0/src/util",
  ],
  function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var exportedNames_1 = {
      "Client": true,
      "Join": true,
      "Order": true,
      "Query": true,
      "replaceParams": true,
      "Where": true,
      "dso": true,
    };
    function exportStar_2(m) {
      var exports = {};
      for (var n in m) {
        if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) {
          exports[n] = m[n];
        }
      }
      exports_63(exports);
    }
    return {
      setters: [
        function (deps_ts_15_1) {
          exports_63({
            "Client": deps_ts_15_1["Client"],
            "Join": deps_ts_15_1["Join"],
            "Order": deps_ts_15_1["Order"],
            "Query": deps_ts_15_1["Query"],
            "replaceParams": deps_ts_15_1["replaceParams"],
            "Where": deps_ts_15_1["Where"],
          });
        },
        function (dso_ts_3_1) {
          exports_63({
            "dso": dso_ts_3_1["dso"],
          });
        },
        function (field_ts_3_1) {
          exportStar_2(field_ts_3_1);
        },
        function (model_ts_1_1) {
          exportStar_2(model_ts_1_1);
        },
        function (util_ts_8_1) {
          exportStar_2(util_ts_8_1);
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/dotenv/util",
  [],
  function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    function trim(val) {
      return val.trim();
    }
    exports_64("trim", trim);
    function compact(obj) {
      return Object.keys(obj).reduce((result, key) => {
        if (obj[key]) {
          result[key] = obj[key];
        }
        return result;
      }, {});
    }
    exports_64("compact", compact);
    function difference(arrA, arrB) {
      return arrA.filter((a) => arrB.indexOf(a) < 0);
    }
    exports_64("difference", difference);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/dotenv/mod",
  ["https://deno.land/x/dotenv/util"],
  function (exports_65, context_65) {
    "use strict";
    var util_ts_9, MissingEnvVarsError;
    var __moduleName = context_65 && context_65.id;
    function parse(rawDotenv) {
      return rawDotenv.split("\n").reduce((acc, line) => {
        if (!isVariableStart(line)) {
          return acc;
        }
        let [key, ...vals] = removeSpacesAroundEquals(line).split("=");
        let value = vals.join("=");
        if (/^"/.test(value)) {
          value = expandNewlines(value);
        }
        acc[key] = util_ts_9.trim(cleanQuotes(value));
        return acc;
      }, {});
    }
    exports_65("parse", parse);
    function config(options = {}) {
      const o = Object.assign({
        path: `${Deno.cwd()}/.env`,
        export: false,
        safe: false,
        example: `${Deno.cwd()}/.env.example`,
        allowEmptyValues: false,
      }, options);
      const conf = parseFile(o.path);
      if (o.safe) {
        const confExample = parseFile(o.example);
        assertSafe(conf, confExample, o.allowEmptyValues);
      }
      if (o.export) {
        for (let key in conf) {
          Deno.env.set(key, conf[key]);
        }
      }
      return conf;
    }
    exports_65("config", config);
    function parseFile(filepath) {
      return parse(
        new TextDecoder("utf-8").decode(Deno.readFileSync(filepath)),
      );
    }
    function isVariableStart(str) {
      return /^[a-zA-Z_ ]*=/.test(str);
    }
    function cleanQuotes(value = "") {
      return value.replace(/^['"]([\s\S]*)['"]$/gm, "$1");
    }
    function removeSpacesAroundEquals(str) {
      return str.replace(/( *= *)/, "=");
    }
    function expandNewlines(str) {
      return str.replace("\\n", "\n");
    }
    function assertSafe(conf, confExample, allowEmptyValues) {
      const currentEnv = Deno.env.toObject();
      // Not all the variables have to be defined in .env, they can be supplied externally
      const confWithEnv = Object.assign({}, currentEnv, conf);
      const missing = util_ts_9.difference(
        Object.keys(confExample),
        // If allowEmptyValues is false, filter out empty values from configuration
        Object.keys(
          allowEmptyValues ? confWithEnv : util_ts_9.compact(confWithEnv),
        ),
      );
      if (missing.length > 0) {
        const errorMessages = [
          `The following variables were defined in the example file but are not present in the environment:\n  ${
            missing.join(", ")
          }`,
          `Make sure to add them to your env file.`,
          !allowEmptyValues &&
          `If you expect any of these variables to be empty, you can set the allowEmptyValues option to true.`,
        ];
        throw new MissingEnvVarsError(
          errorMessages.filter(Boolean).join("\n\n"),
        );
      }
    }
    return {
      setters: [
        function (util_ts_9_1) {
          util_ts_9 = util_ts_9_1;
        },
      ],
      execute: function () {
        MissingEnvVarsError = class MissingEnvVarsError extends Error {
          constructor(message) {
            super(message);
            this.name = "MissingEnvVarsError";
            Object.setPrototypeOf(this, new.target.prototype);
          }
        };
        exports_65("MissingEnvVarsError", MissingEnvVarsError);
      },
    };
  },
);
System.register(
  "file:///Users/loic/Desktop/DEV/ctt/src-ctt-server/src/config/env",
  ["https://deno.land/x/dotenv/mod"],
  function (exports_66, context_66) {
    "use strict";
    var mod_ts_9, env, APP_HOST, APP_PORT, DB;
    var __moduleName = context_66 && context_66.id;
    return {
      setters: [
        function (mod_ts_9_1) {
          mod_ts_9 = mod_ts_9_1;
        },
      ],
      execute: function () {
        env = mod_ts_9.config();
        APP_HOST = env.APP_HOST, APP_PORT = env.APP_PORT;
        exports_66("APP_HOST", APP_HOST);
        exports_66("APP_PORT", APP_PORT);
        // Database env
        DB = {
          hostname: env.DB_HOST || "127.0.0.1",
          username: env.DB_USER,
          password: env.DB_PASSWORD || "",
          port: Number(env.DB_PORT) || 3306,
          db: env.DB_NAME,
        };
        exports_66("DB", DB);
      },
    };
  },
);
System.register(
  "file:///Users/loic/Desktop/DEV/ctt/src-ctt-server/src/config/db",
  [
    "https://deno.land/x/dso@v1.0.0/mod",
    "file:///Users/loic/Desktop/DEV/ctt/src-ctt-server/src/config/env",
  ],
  function (exports_67, context_67) {
    "use strict";
    var mod_ts_10, env_ts_1;
    var __moduleName = context_67 && context_67.id;
    return {
      setters: [
        function (mod_ts_10_1) {
          mod_ts_10 = mod_ts_10_1;
        },
        function (env_ts_1_1) {
          env_ts_1 = env_ts_1_1;
        },
      ],
      execute: function () {
        (async () => await mod_ts_10.dso.connect(env_ts_1.DB))();
      },
    };
  },
);
System.register(
  "file:///Users/loic/Desktop/DEV/ctt/src-ctt-server/src/bin/schema",
  [
    "https://deno.land/x/dso@v1.0.0/mod",
    "file:///Users/loic/Desktop/DEV/ctt/src-ctt-server/src/config/db",
  ],
  function (exports_68, context_68) {
    "use strict";
    var mod_ts_11;
    var __moduleName = context_68 && context_68.id;
    return {
      setters: [
        function (mod_ts_11_1) {
          mod_ts_11 = mod_ts_11_1;
        },
        function (_2) {
        },
      ],
      execute: function () {
        (async () => await mod_ts_11.dso.sync(true))();
      },
    };
  },
);

__instantiate(
  "file:///Users/loic/Desktop/DEV/ctt/src-ctt-server/src/bin/schema",
);
