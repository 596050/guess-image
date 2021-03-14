/* eslint-disable no-restricted-globals */
import { GAME_RESULT_PAYLOAD, GAME_RESULT_RESPONSE } from "../constants";
import { load } from "@tensorflow-models/universal-sentence-encoder";
import { compareResults } from "./helpers";
require("@tensorflow/tfjs");

// THIS WAS AN ATTEMPT AT AUTOMATING THE CHECKING OF ANSWERS
// FROM THE MOBILENET IMAGE CLASSIFICATION MODEL
// BUT I THINK IT WOULD REQUIRE SPECIFIC TRAINING OR BE HARD CODED AS IT CURRENTLY DOESN'T WORK.

self.addEventListener("message", (e) => {
  if (e?.data?.type === GAME_RESULT_PAYLOAD) {
    (async () => {
      const { imageDescription, predictions, userResult } = e.data.payload;
      const sentences = predictions.map((val) => val.className);
      // are the ai's predictions similar to the given image description
      const { result: aiResult } = await getSimilarities(
        imageDescription,
        sentences
      );
      const gameResult = compareResults(
        // user has either chosen the exact image description or not
        userResult === imageDescription,
        // if result not null then sufficiently similar
        !!aiResult
      );
      self.postMessage({
        type: GAME_RESULT_RESPONSE,
        payload: {
          result: gameResult,
        },
      });
    })();
  }
});

const getSimilarities = async (searchTerm, sentences) => {
  const init = async () => {
    const model = await load();
    const embeddings = await model.embed(sentences);
    const similarities = [];
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i; j < sentences.length; j++) {
        if (sentences[i] !== sentences[j] && sentences[i] === searchTerm) {
          const sentenceI = embeddings.slice([i, 0], [1]);
          const sentenceJ = embeddings.slice([j, 0], [1]);
          const sentenceITranspose = false;
          const sentenceJTransepose = true;
          const score = sentenceI
            .matMul(sentenceJ, sentenceITranspose, sentenceJTransepose)
            .dataSync();

          let scoreModifier = 0;
          const numericalScore =
            Number(Array.from(score)[0]) + scoreModifier || 0;
          // find most important words and search for these in the sentence
          similarities.push({
            searchTerm: sentences[i],
            sentence: sentences[j],
            sentenceEmbeddings1: sentenceI,
            sentenceEmbeddings2: sentenceJ,
            score: numericalScore,
          });
        }
      }
    }
    return await similarities.sort((a, b) => b.score - a.score);
  };

  const searchSimilarityScoreThreshold = 0.2;
  const searchTermSimilarities = await init();
  let result = null;
  if (searchTermSimilarities.length) {
    result = (searchTermSimilarities || []).reduce((acc, similar) => {
      if (similar?.score >= searchSimilarityScoreThreshold) {
        return acc.concat(similar);
      }
      return acc;
    }, []);
  }
  return { result };
};
