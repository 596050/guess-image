import { searchForImage } from "../../../api";
import { ArrayElement, ResponseImageAPI } from "../../../types";
import { pickRandomElement, shuffleArrayElements } from "../../../util";
import { voteStateToMessage } from "../constants";
const mobilenet = require("@tensorflow-models/mobilenet");

export type Prediction = {
  className: string;
  probability: number;
};

export type Subject = {
  name: string;
  image: ArrayElement<ResponseImageAPI["results"]>;
  predictions?: Prediction[];
};

export type Option = {
  value: string;
};

export type SearchTerm = {
  value: string;
};

export const classifyImage = async (img: HTMLImageElement) => {
  const model = await mobilenet.load();
  const predictions = await model.classify(img);
  return predictions;
};

export const getImages = async (searchTerms: SearchTerm[]) => {
  const randomQuery = pickRandomElement(searchTerms);
  return {
    images: await searchForImage({ params: { query: randomQuery.value } }),
    name: randomQuery.value,
  };
};

export const getContent = async (
  s: SearchTerm[],
  // if classification errors, retry
  maxRetries: number = 3
): Promise<{
  options: Option[];
  subject: Subject;
} | null> => {
  if (!maxRetries) return null;
  try {
    // images to show for vote
    const { images, name } = await getImages(s);
    const pickedImage = pickRandomElement(images?.results);
    // make image predictions
    const img = document.createElement("img");
    img.setAttribute("src", pickedImage?.urls.full);
    img.setAttribute("crossorigin", "anonymous");
    const predictions = await classifyImage(img);
    // make options
    const description = pickedImage?.alt_description || "";
    const options = shuffleArrayElements(
      predictions
        .map((prediction: Prediction) => {
          const value = prediction?.className?.split(",")[0];
          return {
            value,
          };
        })
        .concat({ value: description })
    );

    return {
      options,
      subject: { image: pickedImage, name, predictions },
    };
  } catch (e) {
    console.error(e);
    return getContent(s, maxRetries - 1) || null;
  }
};

export const compareResults = (userResult: boolean, AIResult: boolean) => {
  const { DRAW, LOST, WON } = voteStateToMessage;
  switch (true) {
    case userResult && AIResult:
      return DRAW;
    case userResult:
      return WON;
    case AIResult:
      return LOST;
    default:
      return LOST;
  }
};
