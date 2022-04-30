import React from 'react';
import { Button, Stack, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Field, FieldArray } from 'formik';
import PropTypes from 'prop-types';

function RadioButtons({ values, cardIndex }) {
    return (
        <div>
            <FieldArray name={`cards[${cardIndex}].answerOption`}>
                {({ remove, push }) => (
                    <div className="row" role="group" aria-labelledby="radio-group">
                        {values.cards[cardIndex].answerOption.map((button, index) => (
                            <div className="row mt-2" key="radioButton">
                                <Stack direction="horizontal" gap={3}>
                                    <Field
                                        type="radio"
                                        name={`cards[${cardIndex}].answerOption[${index}].optionNumber`}
                                        value={index}
                                        className="form-check-input"
                                    />
                                    <Field
                                        type="text"
                                        name={`cards[${cardIndex}].answerOption[${index}].optionAnswer`}
                                        placeholder={`cards[${cardIndex}].answerOption[${index}].optionAnswer`}
                                        className="form-control"
                                    />
                                    <OverlayTrigger
                                        key={`optionDeleteTooltip${index + 1}`}
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-top`}>Delete Option</Tooltip>}>
                                        <Button
                                            key={`optionDeleteButton${index + 1}`}
                                            variant="danger"
                                            onClick={remove(index)}
                                            size="sm">
                                            <i className="mdi mdi-window-close"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </Stack>
                            </div>
                        ))}
                        <div className="row mt-2">
                            <Stack direction="horizontal" gap={3}>
                                <Field
                                    disabled
                                    type="radio"
                                    className="form-check-input"
                                    aria-label="addOption"
                                    size="lg"
                                    onClick={push}
                                />
                                <a href="#" className="link-secondary" onClick={push}>
                                    <h4>Add option</h4>
                                </a>
                            </Stack>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    );
}

export default React.memo(RadioButtons);
RadioButtons.propTypes = {
    cardIndex: PropTypes.number,
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
};
