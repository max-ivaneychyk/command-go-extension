import { useFormContext } from 'react-hook-form';
import React from 'react';
import DoneIcon from '../icons/done';

const ErrorNotice = ({ $id }) => {
  const { watch } = useFormContext();
  const field = watch(`errors.${$id}`);
  const start = watch(`info.${$id}.start`);
  const end = watch(`info.${$id}.end`);
  const message = field?.message;
  const duration =
    start && end && end > start ? (
      <div className={'!ml-auto scale-75 text-sm badge badge-blue !mr-4'}>
        {end - start} ms
      </div>
    ) : (
      ''
    );

  const getStatus = () => {
    if (field?.pending)
      return (
        <div
          className={'scale-75 badge badge-blue'}
          children={message ?? 'Processing...'}
        />
      );
    if (field?.done) return <DoneIcon className={'text-green-700 scale-75'} />;

    if (!message) return <div className={'absolute'} />;

    return <div className={'badge badge-pink scale-90'}>{message}</div>;
  };

  return (
    <div className={'absolute -translate-y-1/2 flex w-full'}>
      {getStatus()}
      {duration}
    </div>
  );
};

export default ErrorNotice;
