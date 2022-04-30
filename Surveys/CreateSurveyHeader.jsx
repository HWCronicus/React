import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

function NewSurveyHeader({ onChange, value }) {
    return (
        <div>
            <div className="row p-1">
                <Field
                    type="text"
                    className="form-control form-control-lg"
                    name="header.title"
                    id="title"
                    placeholder={value.header.title}
                    onChange={onChange}
                />
            </div>
            <div className="row p-1">
                <Field
                    type="text"
                    className="form-control form-control-sm"
                    name="header.description"
                    id="description"
                    placeholder={value.header.description}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default React.memo(NewSurveyHeader);
NewSurveyHeader.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.shape({
        header: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    }),
};
