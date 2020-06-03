import { MapSchema, asSchema } from "../genType.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

// Exemples
const personSchema = asSchema({ name: "string", age: "integer" });
type Person = MapSchema<typeof personSchema>;

type PersonExpected = {
  name: string;
  age: number;
};

const person: Person = {
  name: "Fred",
  age: 35,
};

assert(person as PersonExpected);

const placeSchema = asSchema(
  {
    name: "string",
    latitude: "float",
    longitude: "float",
    nicePlaceToVisit: "boolean",
  },
);

type PlaceExpected = {
  name: string;
  latitude: number;
  longitude: number;
  nicePlaceToVisit: boolean;
};

type Place = MapSchema<typeof placeSchema>;

const place: Place = {
  name: "Paris",
  latitude: 48.8566,
  longitude: 2.3522,
  nicePlaceToVisit: true,
};

assert(place as PlaceExpected);
