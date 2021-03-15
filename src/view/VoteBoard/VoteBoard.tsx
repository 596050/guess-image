import React, { useState } from "react";
import { Card, Button, Spacer, Spin } from "../../component";
import { useVoteBoard } from "./hooks/useVoteBoard";

import VoteOptions from "./VoteOptions";

const VoteBoard = () => {
  const [answer, setAnswer] = useState<string>("");
  const { handleVote, loading, options, subject } = useVoteBoard();

  const handleAnswerChange = (v: string) => {
    setAnswer(v);
  };

  const isDisabled =
    options.findIndex((option) => option.value === answer) === -1 || loading;

  return (
    <>
      <h1 className="voteboard-title">Guess the image and beat the AI!</h1>
      <div className="voteboard-container">
        <Card
          data-testid="voteboard-card"
          cover={
            <img
              className="voteboard-image"
              crossOrigin="anonymous"
              alt={subject?.name}
              src={subject?.image?.urls.full}
            />
          }
        >
          <Spacer size="middle" wrap className="voteboard-voting-panel">
            {loading ? (
              <div className="voteboard-loading-container">
                <Spin data-testid="voteboard-spin" />
              </div>
            ) : (
              <>
                <div>Choose one:</div>
                <VoteOptions
                  onChange={handleAnswerChange}
                  currentValue={answer}
                  options={options}
                />
              </>
            )}
            <Button
              disabled={isDisabled}
              onClick={() => handleVote(answer)}
              data-testid="voteboard-submit"
              block
            >
              Submit Vote
            </Button>
          </Spacer>
        </Card>
      </div>
    </>
  );
};

export default VoteBoard;
