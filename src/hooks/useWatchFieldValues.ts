import { useEffect, useRef, useState } from 'react';
import { FieldValues } from 'react-hook-form';

export const useWatchFieldValues = (watchedFields: FieldValues) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const submittedDataRef = useRef(watchedFields);

  useEffect(() => {
    const isModified = Object.keys(watchedFields).some((key) => {
      return watchedFields[key] !== submittedDataRef.current[key];
    });
    setIsButtonDisabled(!isModified || watchedFields.basicPlastic === 'NONE');
  }, [watchedFields]);

  const handleFormSubmit = (data: FieldValues) => {
    submittedDataRef.current = JSON.parse(JSON.stringify(data));
    setIsButtonDisabled(true);
  };

  return {
    isButtonDisabled,
    handleFormSubmit,
  };
};
