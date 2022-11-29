import React from 'react';
import { ReadImgFootStep } from '../../api/apiGET';
import { useQuery } from '@tanstack/react-query';

export default function Article() {
  const { data } = useQuery(['img'], ReadImgFootStep, {
    onSuccess: (response) => {
      console.log(response);
    },
  });
  return <div>Articleddd</div>;
}
