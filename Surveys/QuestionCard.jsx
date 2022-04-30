import React, { useState } from 'react';
import debug from 'sabio-debug';
import { Button, Collapse, OverlayTrigger, Tooltip, Stack } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import RadioButtons from '../create/surveyquestiontypes/RadioButtonFR';
import Checkbox from '../create/surveyquestiontypes/Checkbox';
import Date from '../create/surveyquestiontypes/Date';
import Upload from '../create/surveyquestiontypes/Upload';
function QuestionCard({ index, values, onDelete, onChange, setValues }) {
    const _logger = debug.extend(`QuestionCard${index + 1}`);
    false && _logger(false);
    const [open, setOpen] = useState(true);

    const questionChange = (e) => {
        let value = e.target.value;
        setAnswerOption(value);
        renderAnswerOption(value);
        onChange(e);
        _logger({ event: e });
    };

    const setAnswerOption = (value) => {
        const option = `cards[${index}].answerOption[0]`;
        const optionValue = { optionAnswer: 'Answer 1', optionNumber: 1 };
        switch (value) {
            case 'shortAnswer':
                return setValues(option, optionValue);

            case 'paragraph':
                return setValues(option, optionValue);

            case 'multipleChoice':
                return setValues(option, optionValue);

            case 'checkbox':
                return setValues(option, optionValue);

            case 'date':
                return setValues(option, optionValue);

            case 'fileUpload':
                return setValues(option, optionValue);

            default:
        }
    };

    const renderAnswerOption = (value) => {
        switch (value) {
            case 'shortAnswer':
                return (
                    <Field
                        type="text"
                        className="form-control"
                        name="shortAnswer"
                        placeholder="Short answer text"
                        size="lg"
                        readOnly
                    />
                );
            case 'paragraph':
                return (
                    <Field
                        type="text"
                        as="textarea"
                        className="form-control"
                        rows={3}
                        name="paragraph"
                        placeholder="Paragraph answer text"
                        size="lg"
                        readOnly
                    />
                );

            case 'multipleChoice':
                return (
                    <RadioButtons key={`radiobuttons${index}`} values={values} onChange={onChange} cardIndex={index} />
                );

            case 'checkbox':
                return <Checkbox key={`checkbox${index}}`} />;

            case 'date':
                return <Date key={`date${index}`} />;

            case 'fileUpload':
                return <Upload key={`upload${index}`} />;
            default:
        }
    };

    const deleteClicked = () => {
        onDelete(index);
    };

    return (
        <div className="card" id={index + 1}>
            <div className="row card-header">
                <Stack direction="horizontal" gap={1}>
                    <Field
                        type="text"
                        className="form-control form-control-lg"
                        name={`cards[${index}].question`}
                        placeholder={`Question ${index + 1}`}
                        size="lg"
                    />
                    <OverlayTrigger
                        key={`optionTooltip${index + 1}}`}
                        placement="top"
                        overlay={
                            <Tooltip id={`tooltip-top`}>{open === false ? 'Open Options' : 'Close Options'}</Tooltip>
                        }>
                        <Button
                            key={`optionButton${index + 1}`}
                            variant="outline-secondary"
                            onClick={() => setOpen(!open)}
                            aria-controls="collapse-options"
                            aria-expanded={open}
                            size="lg">
                            {open === false ? (
                                <i className="mdi mdi-unfold-more-horizontal"></i>
                            ) : (
                                <i className=" mdi mdi-unfold-less-horizontal"></i>
                            )}
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={`deleteTooltip${index + 1}`}
                        placement="top"
                        overlay={<Tooltip id={`tooltip-top`}>Delete Question</Tooltip>}>
                        <Button
                            key={`deleteButton${index + 1}`}
                            variant="outline-danger"
                            onClick={deleteClicked}
                            size="lg">
                            <i className="mdi mdi-window-close"></i>
                        </Button>
                    </OverlayTrigger>
                </Stack>
            </div>
            <div className="row card-body mt-2 mb-2 p-1 ms-1">
                <Collapse in={open}>
                    <div className="row">
                        <div className="col">{renderAnswerOption(values.cards[index].type)}</div>
                        <div className="col-3">
                            <Field
                                as="select"
                                name={`cards[${index}].type`}
                                className="form-select form-select-lg"
                                onChange={questionChange}>
                                <option name="shortAnswer" value="shortAnswer">
                                    Short answer
                                </option>
                                <option name="paragraph" value="paragraph">
                                    Paragraph
                                </option>
                                <option name="multipleChoice" value="multipleChoice">
                                    Multiple choice
                                </option>
                                <option name="checkbox" value="checkbox">
                                    Checkbox
                                </option>
                                {/* <option value="linearScale">Linear Scale</option> */}
                                <option name="date" value="date">
                                    Date
                                </option>
                                {/* <option value="time">Time</option> */}
                                <option name="fileUpload" value="fileUpload">
                                    File upload
                                </option>
                            </Field>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default QuestionCard;
QuestionCard.propTypes = {
    index: PropTypes.number,
    values: PropTypes.shape({
        cards: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                question: PropTypes.string,
                answerOption: PropTypes.arrayOf(
                    PropTypes.shape({
                        optionNumber: PropTypes.number,
                        optionAnswer: PropTypes.string,
                    })
                ),
            })
        ),
    }),
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    setValues: PropTypes.func,
};
