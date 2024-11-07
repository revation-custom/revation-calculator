import IcRadio from '../assets/icons/IcRadio';
import IcRadioEmpty from '../assets/icons/IcRadioEmpty';

interface RadioButtonProps {
  state: boolean;
}

const RadioButton = ({ state }: RadioButtonProps) => {
  return <div>{state ? <IcRadio /> : <IcRadioEmpty />}</div>;
};

export default RadioButton;
