import Axios from "../AxiosInterceptor";

export const deleteStaff = (id) => {
  return new Promise((resolve, reject) => {
    const url = `/staff/delete/${id}`;
    Axios.put(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const Staff = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/staff`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const AddGateman = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/staff`;
    Axios.post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const importStaff = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/staff/upload`;
    Axios.post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const ViewProfile = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/staff/profile`;
    Axios.post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
