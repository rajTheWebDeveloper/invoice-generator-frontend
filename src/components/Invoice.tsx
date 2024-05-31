import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { downloadInvoiceRequest } from '../store/AccessSlice';

const Invoice = () => {
  const { token } = useAppSelector(state => state.Access);
  const dispatch = useAppDispatch();

  const downloadInvoice = async () => {
    const resultAction = await dispatch(downloadInvoiceRequest({ token }));
    if (downloadInvoiceRequest.fulfilled.match(resultAction)) {
      const blob = new Blob([resultAction.payload], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Failed to download invoice:', resultAction.payload);
    }
  };

  return (
    <div className='w-[100vw] min-h-[100vh] flex justify-center'>
      <button onClick={downloadInvoice} className='mt-40 h-[40px] flex justify-center items-center'>Download Invoice</button>
    </div>
  );
};

export default Invoice;
