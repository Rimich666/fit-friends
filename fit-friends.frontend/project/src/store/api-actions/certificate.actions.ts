import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';
import {CertificateInterface} from '../../types/certificate.interface';

export const addCertificates = createAsyncThunk<CertificateInterface[], File[], {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.addCertificates,
  async (files, {extra: axiosApi}) => {
    const payload = new FormData();
    files.forEach((certificate) => {
      payload.append('certificate', certificate);
    });

    const {data} = await axiosApi.post<CertificateInterface[]>(
      `${ApiRoute.Certificates}`,
      payload,
      {headers: {'Content-Type': 'multipart/form-data'}});
    return data;
  }
);

export const deleteCertificates = createAsyncThunk<CertificateInterface[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.deleteCertificates,
  async (id, {extra: axiosApi}) => {
    const {data} = await axiosApi.delete<CertificateInterface[]>(`${ApiRoute.Certificates}/${id}`);
    return data;
  }
);

export const saveChangeCertificate = createAsyncThunk<CertificateInterface[], CertificateInterface, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.saveChangeCertificate,
  async (certificate, {extra: axiosApi}) => {
    const payload = new FormData();
    payload.append('certificate', certificate.file as File);
    const {data} = await axiosApi.patch<CertificateInterface[]>(
      `${ApiRoute.Certificates}/${certificate.id as string}`,
      payload,
      {headers: {'Content-Type': 'multipart/form-data'}});
    return data;
  }
);
