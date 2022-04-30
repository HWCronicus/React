import React, { useCallback, useEffect, useState } from 'react';
import debug from 'sabio-debug';
import CreateSurveyHeader from './CreateSurveyHeader';
import QuestionCard from './QuestionCard';
import { Button, OverlayTrigger, Tooltip, Stack } from 'react-bootstrap';

function NewSurvey() {
    const _logger = debug.extend('NewSurvey');
    const [questionCards, setQuestionCards] = useState([]);
    // const [surveyData, setSurveyData] = useState([{
    //     id: 1,
    //     type: "shortAnswer",
    //     question: "",
    //     questionOptions: []
    // }])

    const addQuestionCard = () => {
        let id = questionCards.length + 1;
        let data = [...questionCards];
        const newCard = <QuestionCard id={id} key={id} handleDelete={removeCard} />;
        data.push(newCard);
        setQuestionCards(data);
    };

    const removeCard = useCallback((id) => {
        let cards = [...questionCards];
        if (cards.length > 1) {
            _logger({ state: cards });
            let filteredCards = cards.filter((card) => card.key !== id);
            _logger({ filtereed: filteredCards });
            setQuestionCards(filteredCards);
        }
    });

    useEffect(addQuestionCard, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-11">
                    <div className="card-header">
                        <div className="col">
                            <CreateSurveyHeader />
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="row">{questionCards}</div>
                    </div>
                </div>

                <div className="col-1">
                    <div className="float position-sticky top-50 translate-middle-x translate-middle-y">
                        <div className="card p-2">
                            <div className="btn-group-vertical">
                                <Stack direction="vertical" gap={1}>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-top`}>Add question</Tooltip>}>
                                        <Button
                                            key={`addButto`}
                                            variant="outline-info"
                                            size="lg"
                                            onClick={addQuestionCard}>
                                            <i className="uil-plus"></i>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-top`}>Add image</Tooltip>}>
                                        <Button variant="outline-info" size="lg">
                                            <i className="uil-image-plus"></i>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-top`}>Add video</Tooltip>}>
                                        <Button key={`deleteButton`} variant="outline-info" size="lg">
                                            <i className="uil-youtube"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewSurvey;
