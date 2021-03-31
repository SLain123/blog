import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { useSpring, animated } from 'react-spring';
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

const CreateEditForm = ({ formTitle, tagList, submitFunc, title, description, body, reset }) => {
  const correctTagList = useMemo(() => (tagList.length < 1 ? [''] : tagList), [tagList]);
  const listRef = useRef();
  const [innerTagList, setInnerTagList] = useState(correctTagList);

  const { register, errors, handleSubmit, control, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    submitFunc(data);
  };

  useEffect(() => {
    if (reset) {
      setValue('title', '');
      setValue('description', '');
      setValue('body', '');
      remove();
      setInnerTagList(['']);
    }
  }, [reset, setValue, remove]);

  useEffect(() => {
    correctTagList.forEach((tag) => append({ tag }));
  }, [append, correctTagList]);

  const opacityAnimate = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={opacityAnimate}>
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
            value={title}
            rese
          />
          <FormField
            label="Short description"
            name="description"
            type="input"
            placeholder="Title"
            thisRef={register({ required: true })}
            errors={errors}
            errorOptions={[{ target: 'required', message: 'This is a required field' }]}
            value={description}
          />
          <label className={classes.label} htmlFor="text">
            Text
          </label>
          <textarea
            placeholder="Text"
            className={errors.body?.type ? `${classes.errorAria} ${classes.textaria}` : classes.textaria}
            id="text"
            name="body"
            ref={register({ required: true })}
            defaultValue={body}
          />
          {errors.body?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
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
                    name={`tagList[${index}].tag`}
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
    </animated.div>
  );
};

CreateEditForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string),
  submitFunc: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  reset: PropTypes.bool,
};

CreateEditForm.defaultProps = {
  tagList: [''],
  title: '',
  description: '',
  body: '',
  reset: false,
};

export default CreateEditForm;
