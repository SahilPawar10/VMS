import Axios from "./AxiosInterceptor";

export const Authentication = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/auth/login`;
    Axios.post(url, data)
      .then((responce) => resolve(responce))
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

export const ViewLogs = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/viewlogs`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const VisitorIn = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/checkin`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const VisitorOut = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/checkout`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const AllVisitor = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const TodaysLogs = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/todays`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const viewOne = (id) => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/${id}`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const approveMeet = (id, data) => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/visit/${id}`;
    Axios.put(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const getOnesVisitorMeets = (id, data) => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/visit/${id}`;
    Axios.get(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const inToday = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/checkin`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const OutToday = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/checkout`;
    Axios.get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const TodaysPresent = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor/todays`;
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

export const connectDeveloper = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/users/contact`;
    Axios.post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
