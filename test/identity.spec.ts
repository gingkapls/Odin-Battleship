import { expect, test } from "@jest/globals";
import identity from "./identity";

test("works", () => {
    expect(identity("hello")).toBe("hello");
})