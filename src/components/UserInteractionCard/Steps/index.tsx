import { useEffect, useRef } from 'react';
import styles from './Steps.module.scss';
import RadioButton from '../../RadioButton';
import { SelectionOptionType, PayloadType } from '../../../common/type';
import {
  StepsOneInterface,
  StepsTwoInterface,
  StepsThreeInterface,
} from '../../../common/interface';
import UserInput from '../../UserInput';
import { InputTypes } from '../../../common/enums';
import Text from '../../Text';

const StepOne: React.FC<StepsOneInterface> = ({
  handleOptionChange,
  selectionOptions,
  selectedOption,
}) => {
  return (
    <>
      {selectionOptions.map((option: SelectionOptionType) => {
        return (
          <RadioButton
            key={option.id}
            label={option.label}
            id={option.value}
            value={option.value}
            isChecked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
        );
      })}
    </>
  );
};

const StepTwo: React.FC<StepsTwoInterface> = ({ type, value, onChange }) => {
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (null !== input1Ref.current) {
      input1Ref.current.focus();
      input1Ref.current.value = '';
    }
  }, [input1Ref]);

  const handdleFocus = () => {
    if (null !== input2Ref.current) {
      input2Ref.current.focus();
      input2Ref.current.value = '';
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPayload: PayloadType = { ...value.payload };
    newPayload = {
      ...newPayload,

      [type]: { ...newPayload[type], [e.target?.name]: e.target?.value },
    };

    onChange({ ...value, payload: newPayload });
  };

  const InputBody =
    {
      circle: function () {
        return (
          <div className={styles.Container}>
            <UserInput
              label="Diameter :"
              name="diameter"
              type={InputTypes.NUMBER}
              placeholder="text"
              onChange={handleOnChange}
              value={value.payload['circle'].diameter}
              inputRef={input1Ref}
            />
          </div>
        );
      },
      rectangle: function () {
        return (
          <>
            <div className={styles.Container}>
              <UserInput
                label="Length :"
                name="length"
                type={InputTypes.NUMBER}
                placeholder="text"
                onChange={handleOnChange}
                value={value.payload['rectangle'].length}
                inputRef={input1Ref}
              />
            </div>
            <div className={styles.Container}>
              <UserInput
                label="Breadth :"
                name="breadth"
                type={InputTypes.NUMBER}
                placeholder="text"
                onChange={handleOnChange}
                value={value.payload['rectangle'].breadth}
                inputRef={input2Ref}
                onFocus={handdleFocus}
              />
            </div>
          </>
        );
      },
      square: function () {
        return (
          <>
            <div className={styles.Container}>
              <UserInput
                label="Length :"
                name="length"
                type={InputTypes.NUMBER}
                placeholder="text"
                onChange={handleOnChange}
                value={value.payload['square'].length}
                inputRef={input1Ref}
              />
            </div>
          </>
        );
      },
      ellipse: function () {
        return (
          <>
            <div className={styles.Container}>
              <UserInput
                label="Axis A:"
                name="axisA"
                type={InputTypes.NUMBER}
                placeholder="text"
                onChange={handleOnChange}
                value={value.payload['ellipse'].axisA}
                inputRef={input1Ref}
              />
            </div>
            <div className={styles.Container}>
              <UserInput
                label="Axis B:"
                name="axisB"
                type={InputTypes.NUMBER}
                placeholder="text"
                onChange={handleOnChange}
                value={value.payload['ellipse'].axisB}
                inputRef={input2Ref}
                onFocus={handdleFocus}
              />
            </div>
          </>
        );
      },
    }[type]() || null;

  return <>{InputBody}</>;
};

const StepThree: React.FC<StepsThreeInterface> = ({ type, value }) => {
  const result =
    {
      rectangle: function () {
        return value['rectangle'].length * value['rectangle'].breadth;
      },
      square: function () {
        return value['square'].length * value['square'].length;
      },
      circle: function () {
        return (
          Math.PI *
          (value['circle'].diameter / 2) *
          (value['circle'].diameter / 2)
        );
      },
      ellipse: function () {
        return Math.PI * value['ellipse'].axisA * value['ellipse'].axisB;
      },
    }[type]() || 0;

  return (
    <div className={styles.ResultContainer}>
      <Text type="default" size={'1.25rem'} weight={600}>
        The Area is {formateResult(result)}
      </Text>
    </div>
  );
};

function formateResult(result: number) {
  return result % 1 ? result.toFixed(2) : result;
}

export { StepOne, StepTwo, StepThree };
