import fetch from "node-fetch";
import FormData from "form-data";

// monstercat channel id = 160788
// channel api URL = https://mixer.com/api/v1/channels/160788
const mixerStreamPreview = "https://thumbs.mixer.com/channel/160788.small.jpg";

const spaceApi = "https://api.ocr.space/parse/image";

const MCApi = "https://connect.monstercat.com/api/catalog/browse";

const getMixerThumbAsBase64 = ({ etag, expires }) =>
  fetch(mixerStreamPreview).then(async (res) => {
    const b64 = res
      .buffer()
      .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`);
    return { b64, newEtag: { etag: await etag, expires: await expires } };
  });
const createFormData = async ({ b64, newEtag }) => {
  const spaceOCRForm = new FormData();
  spaceOCRForm.append("base64Image", await b64);
  spaceOCRForm.append("isOverlayRequired", "false");
  spaceOCRForm.append("filetype", ".jpg");
  spaceOCRForm.append("isTable", "true");
  spaceOCRForm.append("OCREngine", 2);
  spaceOCRForm.append("scale", "true");
  return { form: spaceOCRForm, newEtag };
};

const getOCR = async ({ form, newEtag }) =>
  fetch(spaceApi, {
    method: "POST",
    headers: {
      ...form.getHeaders(),
      apiKey: "5a64d478-9c89-43d8-88e3-c65de9999580", // comandeer browser public apiKey
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36", // pretend I'm not a script. shhhhhh
    },
    body: form,
  }).then((res) => ({ OCRRes: res.json(), newEtag }));

const getNormalizedSongTitle = async ({ OCRRes, newEtag }) => {
  console.log(await OCRRes);
  return {
    query: (await OCRRes).ParsedResults[0].TextOverlay.Lines.map(
      (line) => line.LineText
    )
      .slice(0, 2)
      .join(" ")
      .toLowerCase()
      .replace(/(|)/g, ""),
    newEtag,
  };
};

const getMCCatalogResults = async ({ query, newEtag }) =>
  fetch(`${MCApi}?limit=2&search=${encodeURIComponent(await query)}`).then(
    (res) => ({
      catalogRes: res.json(),
      newEtag,
    })
  );

const logAndSendTime = async ({ catalogRes, newEtag }) => {
  const firstRes = (await catalogRes).results[0];
  console.log(firstRes.artistsTitle, firstRes.title);
  return await newEtag;
};
interface etag {
  etag: string;
  expires: number;
}
const checkEtag = async (oldEtag: etag) => {
  const res = await fetch(mixerStreamPreview, { method: "HEAD" });
  const newEtag = res.headers.get("etag");
  const expires = Number(res.headers.get("cache-control").split("=")[1]);
  if (oldEtag.etag != newEtag) {
    console.log("dif", oldEtag.etag, newEtag);
    getMixerThumbAsBase64({ etag: newEtag, expires })
      .then(createFormData)
      .then(getOCR)
      .then(getNormalizedSongTitle)
      .then(getMCCatalogResults)
      .then(logAndSendTime)
      .then(({ etag, expires }) =>
        setTimeout(() => {
          checkEtag({ etag, expires });
        }, expires)
      ) // Mild infinite recursion
      .catch(console.error); // new is now old
  } else {
    console.log("same", oldEtag.etag, newEtag);
    console.log(expires, "s till expired");
    setTimeout(() => {
      checkEtag({ etag: newEtag, expires }); // still the same, but give (not) new etag anyway
    }, expires * 1000 + 5);
  }
};

const recurringSongLogging = ({ etag = "wtfpotatocannon", expires = 0 }) =>
  checkEtag({ etag, expires });

recurringSongLogging({});
