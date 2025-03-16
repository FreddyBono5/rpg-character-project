import { html, fixture, expect } from '@open-wc/testing';
import "../rpg-character-project.js";

describe("RpgCharacterProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <rpg-character-project
        title="title"
      ></rpg-character-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
