import { test, expect } from "@playwright/test";

test("validate boxes config", async ({ request }) => {
  const response = await request.get(
    `https://data.staging.thetanworld.com/api/v1/boxes/config`
  );
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data).toHaveProperty("data");
  expect(data["data"]).toHaveProperty("boxes");

  const boxConf = data["data"]["boxes"];
  expect(Object.keys(boxConf).length).toBe(4);

  for (const boxId of Object.keys(boxConf)) {
    const box = boxConf[boxId];
    expect(box).toHaveProperty("name");
    expect(box).toHaveProperty("kind");
    expect(box).toHaveProperty("type");
    expect(box).toHaveProperty("props");

    expect(boxId).toBe(box["type"].toString());
    expect(box["kind"]).toBe(2);

    // check box type is not collision
    const boxType = box["type"];
    for (const boxId2 of Object.keys(boxConf)) {
      if (boxId !== boxId2) {
        expect(boxType).not.toBe(boxConf[boxId2]["type"]);
      }
    }

    // props
    const props = box["props"];
    expect(props).toHaveProperty("rarity");
    expect(props).toHaveProperty("rates");
    expect(props["rates"]).toHaveLength(4);

    var sumRatio = 0;
    for (const rate of props["rates"]) {
      expect(rate).toHaveProperty("rarity");
      expect(rate).toHaveProperty("rateRatio");
      sumRatio += rate["rateRatio"];
    }
    expect(sumRatio).toBe(1.0);
  }
});

test("login by email", async ({ request }) => {
  const response = await request.post(
    "https://auth.staging.thetanarena.com/auth/v1/loginByEmail",
    {
      data: {
        email: "khangtdd+11@wolffungame.com",
      },
    }
  );
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});
