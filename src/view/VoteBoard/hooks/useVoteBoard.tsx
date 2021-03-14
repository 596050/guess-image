import { useState, useEffect } from "react";
import "@tensorflow/tfjs";

import {
  searchTerms,
  GAME_RESULT_PAYLOAD,
  GAME_RESULT_RESPONSE,
} from "../constants";
import { getContent, Option, Subject } from "./helpers";
import { notification } from "antd";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const GameResultWorker = require("workerize-loader!./gameResult.worker.js");

export function useVoteBoard() {
  const [options, setOptions] = useState<Option[]>([]);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [worker, setWorker] = useState<Worker | undefined>(undefined);

  const handleInitialise = (cb?: () => void) => {
    // initialise with a new question
    (async () => {
      const content = await getContent(searchTerms);
      if (content) {
        setSubject(content?.subject || null);
        setOptions(content?.options || []);
      }
      if (cb) {
        cb();
      }
    })();
  };

  useEffect(() => {
    const _worker = new GameResultWorker();
    setWorker(_worker);
    return () => {
      _worker.terminate();
      setWorker(undefined);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    handleInitialise(() => setLoading(false));
  }, []);

  useEffect(() => {
    // web worker for comparing ai and user results
    const onMessage = function (e: {
      data: {
        payload: { result: { message: string; description: string } };
        type: string;
      };
    }) {
      if (e?.data?.type === GAME_RESULT_RESPONSE) {
        notification.open({
          message: e?.data?.payload?.result?.message,
          description: e?.data?.payload?.result?.description,
        });
        handleInitialise(() => setLoading(false));
      }
    };
    worker?.addEventListener("message", onMessage);
    return () => {
      worker?.removeEventListener("message", onMessage);
    };
  }, [worker]);

  const handleVote = (userResult: string) => {
    setLoading(true);
    worker?.postMessage({
      type: GAME_RESULT_PAYLOAD,
      payload: {
        imageDescription: subject?.image?.alt_description,
        userResult,
        predictions: subject?.predictions,
      },
    });
  };

  return { handleVote, worker, options, subject, loading };
}
