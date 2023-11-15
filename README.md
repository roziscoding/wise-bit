# Wise Bit

Bitwise flag manager written in TypeScript.

## Description

This project provides a TypeScript class `Flags` that allows you to manage a set of flags.
Flags can be enabled, disabled, and checked if they are enabled.
The class also provides a map of the flags and their current states, and the value of the flags.

## Usage

First, import the `Flags` class from `mod.ts`.

```typescript
import { Flags } from './mod.ts';
```

Then, you can create a new instance of `Flags` with your known flags.

```typescript
const knownFlags = { flag1: 1, flag2: 2, flag3: 4 };
const flags = new Flags(knownFlags);
```

You can enable and disable flags using the `enable` and `disable` methods.

```typescript
flags.enable(knownFlags.flag1);
flags.disable(knownFlags.flag2);
```

You can check if a flag is enabled using the `isEnabled` method.

```typescript
console.log(flags.isEnabled(knownFlags.flag1)); // true
console.log(flags.isEnabled(knownFlags.flag2)); // false
```

You can get a map of the flags and their current states using the `map` getter.

```typescript
console.log(flags.map); // { flag1: true, flag2: false, flag3: false }
```

You can get the value of the flags using the `value` getter.

```typescript
console.log(flags.value); // 1
```

## Contributing

Instructions on how to contribute to your project.

## License

See [LICENSE](LICENSE).
