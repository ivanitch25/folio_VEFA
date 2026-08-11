import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Folio VEFA presentation and demo entry points", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Folio VEFA/);
  assert.match(html, /Moins de dossiers à fouiller/);
  assert.match(html, /href="\/demo"/);
  assert.match(html, /Manipuler le logiciel/);
  assert.match(html, /données fictives/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("server-renders the isolated interactive demo wrapper", async () => {
  const response = await render("/demo");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Démonstration interactive de Folio VEFA/);
  assert.match(html, /aucune donnée saisie ici n’est conservée/i);
  assert.match(html, /src="\/demo-app\/index.html"/);
  assert.match(html, /Données 100 % fictives/);
});

test("ships the browser build of the real desktop interface", async () => {
  const demoIndex = new URL("../public/demo-app/index.html", import.meta.url);
  const html = await readFile(demoIndex, "utf8");
  assert.match(html, /<title>Folio VEFA<\/title>/);
  assert.match(html, /\.\/assets\/index-[^"']+\.js/);
  assert.match(html, /\.\/assets\/index-[^"']+\.css/);
  await access(new URL("../public/demo-app/assets/", import.meta.url));
});
