import React from 'react';
import { Button, OverlayTrigger, Tooltip, Stack } from 'react-bootstrap';
import { Formik, Form, FieldArray } from 'formik';
import debug from 'sabio-debug';
import CreateSurveyHeader from './CreateSurveyHeader';
import QuestionCard from './QuestionCard';

function NewSurvey() {
    const _logger = debug.extend('NewSurvey');
    const surveyData = {
        header: {
            title: 'Untitled Survey',
            description: 'Survey description',
        },
        cards: [
            {
                type: 'shortAnswer',
                question: '',
                answerOption: [],
            },
        ],
    };

    false && _logger(null);

    return (
        <div className="container">
            <div className="row">
                <div className="col-11">
                    <Formik initialValues={surveyData}>
                        {({ values, handleChange, setFieldValue }) => (
                            <Form>
                                <div className="card-header">
                                    <div className="col">
                                        <CreateSurveyHeader value={values} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="p-2">
                                    <FieldArray name="cards">
                                        {({ remove, push }) => (
                                            <div className="row">
                                                {values.cards.length > 0 &&
                                                    values.cards.map((card, index) => (
                                                        <QuestionCard
                                                            key={index}
                                                            index={index}
                                                            values={values}
                                                            setValues={setFieldValue}
                                                            onChange={handleChange}
                                                            onDelete={() => remove(index)}
                                                        />
                                                    ))}
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id={`tooltip-top`}>Add question</Tooltip>}>
                                                    <Button
                                                        key={`addButton`}
                                                        name="addButton"
                                                        variant="outline-info"
                                                        onClick={() =>
                                                            push({
                                                                type: 'shortAnswer',
                                                                question: '',
                                                                answerOption: [],
                                                            })
                                                        }>
                                                        <i className="uil-plus"></i>
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className="col-1">
                    <div className="float position-sticky top-50 translate-middle-x translate-middle-y">
                        <div className="card p-2">
                            <div className="btn-group-vertical">
                                <Stack direction="vertical" gap={1}>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-top`}>Add question</Tooltip>}>
                                        <Button key={`addButton`} variant="outline-info" size="lg">
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
                                        <Button variant="outline-info" size="lg">
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
// onClick={() =>
//     push({
//         id: values.cards.length + 1,
//         type: 'shortAnswer',
//         question: '',
//         questionOptions: [],
//     })
// }>
