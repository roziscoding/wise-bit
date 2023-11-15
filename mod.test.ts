import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.206.0/assert/mod.ts";
import { Flags } from "./mod.ts";

const FeatureFlags = {
  Foo: 1,
  Bar: 2,
  Baz: 4,
} as const;

Deno.test("Flags", async (t) => {
  await t.step("enable and value", () => {
    const flags = new Flags(FeatureFlags);
    flags.enable(FeatureFlags.Foo);
    flags.enable(FeatureFlags.Baz);
    assertEquals(flags.value, FeatureFlags.Foo | FeatureFlags.Baz);
  });

  await t.step("enable same flag multiple times", () => {
    const flags = new Flags(FeatureFlags);
    flags.enable(FeatureFlags.Foo);
    flags.enable(FeatureFlags.Foo);
    assertEquals(flags.value, FeatureFlags.Foo);
  });

  await t.step("enable all flags", () => {
    const flags = new Flags(FeatureFlags);
    flags.enable(FeatureFlags.Foo);
    flags.enable(FeatureFlags.Bar);
    flags.enable(FeatureFlags.Baz);
    assertEquals(
      flags.value,
      FeatureFlags.Foo | FeatureFlags.Bar | FeatureFlags.Baz,
    );
  });

  await t.step("enable unknown flag", () => {
    const flags = new Flags(FeatureFlags);
    // @ts-expect-error: we need to test the behavior when we pass an unknown flag
    assertThrows(() => flags.enable(42), Error, "Unknown flag: 42");
  });

  await t.step("knows", () => {
    const flags = new Flags(FeatureFlags);
    assertEquals(flags.knows(FeatureFlags.Foo), true);
    assertEquals(flags.knows(FeatureFlags.Bar), true);
    assertEquals(flags.knows(FeatureFlags.Baz), true);
    assertEquals(flags.knows(42), false);
  });

  await t.step("disable", () => {
    const flags = new Flags(FeatureFlags);
    flags.enable(FeatureFlags.Foo);
    flags.enable(FeatureFlags.Bar);
    flags.enable(FeatureFlags.Baz);
    assertEquals(
      flags.value,
      FeatureFlags.Foo | FeatureFlags.Bar | FeatureFlags.Baz,
    );
    flags.disable(FeatureFlags.Bar);
    assertEquals(flags.value, FeatureFlags.Foo | FeatureFlags.Baz);
  });

  await t.step("isEnabled", () => {
    const flags = new Flags(FeatureFlags);
    flags.enable(FeatureFlags.Foo);
    flags.enable(FeatureFlags.Bar);
    flags.enable(FeatureFlags.Baz);
    assertEquals(flags.isEnabled(FeatureFlags.Foo), true);
    assertEquals(flags.isEnabled(FeatureFlags.Bar), true);
    assertEquals(flags.isEnabled(FeatureFlags.Baz), true);
    // @ts-expect-error: we need to test the behavior when we pass an unknown flag
    assertThrows(() => flags.isEnabled(42), Error, "Unknown flag: 42");
  });

  await t.step("map", () => {
    const flags = new Flags(FeatureFlags);
    flags.enable(FeatureFlags.Foo);
    flags.enable(FeatureFlags.Bar);
    flags.enable(FeatureFlags.Baz);
    assertEquals(flags.map, {
      Foo: true,
      Bar: true,
      Baz: true,
    });

    flags.disable(FeatureFlags.Bar);

    assertEquals(flags.map, {
      Foo: true,
      Bar: false,
      Baz: true,
    });
  });
});
