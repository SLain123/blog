import React, { useEffect, useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import FormField from '../form-field';

import classes from './CreateEditForm.module.scss';

const clearTagList = (index, setInnerTagList) => {
  setInnerTagList((tags) => {
    if (tags[index] && tags.length > 1) {
      return [...tags.slice(0, index), ...tags.slice(index + 1, tags.length)];
    }
    return [''];
  });
};

const CreateEditForm = ({ formTitle, tags }) => {
  const listRef = useRef();
  const [innerTagList, setInnerTagList] = useState(tags);
  const { register, errors, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tag',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    tags.forEach((tag) => append({ tag }));
  }, [append, tags]);

  return (
    <div className={classes.formContainer}>
      <p className={classes.header}>{formTitle}</p>
      <form className={classes.formBody} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Title"
          name="title"
          type="input"
          placeholder="Title"
          thisRef={register({ required: true })}
          errors={errors}
          errorOptions={[{ target: 'required', message: 'This is a required field' }]}
        />
        <FormField
          label="Short description"
          name="description"
          type="input"
          placeholder="Title"
          thisRef={register({ required: true })}
          errors={errors}
          errorOptions={[{ target: 'required', message: 'This is a required field' }]}
        />
        <label className={classes.label} htmlFor="text">
          Text
        </label>
        <textarea
          placeholder="Text"
          className={errors.text?.type ? `${classes.errorAria} ${classes.textaria}` : classes.textaria}
          id="text"
          name="text"
          ref={register({ required: true })}
        />
        {errors.text?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        <div className={classes.tagBlock}>
          <p className={classes.title}>Tags</p>
          <ul className={classes.tagList} ref={listRef}>
            {fields.map((item, index) => (
              <li key={item.id} className={classes.string}>
                <label className={classes.hide} htmlFor="tag">
                  for tag
                </label>
                <input
                  type="input"
                  placeholder="Tag"
                  id="tag"
                  name={`tag[${index}].name`}
                  ref={register()}
                  className={classes.input}
                  defaultValue={innerTagList[index]}
                />
                <button
                  type="button"
                  className={`${classes.delete} ${classes.tagBtn}`}
                  onClick={() => {
                    const inputsCount = Array.from(listRef.current.children).length;
                    clearTagList(index, setInnerTagList);
                    remove(index);
                    if (inputsCount === 1) {
                      append({ tag: 'tag' });
                    }
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className={`${classes.add} ${classes.tagBtn}`} onClick={() => append({ tag: 'tag' })}>
            Add tag
          </button>
        </div>
        <button type="submit" className={classes.btn}>
          Send
        </button>
      </form>
    </div>
  );
};

CreateEditForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

CreateEditForm.defaultProps = {
  tags: [''],
};

export default CreateEditForm;
