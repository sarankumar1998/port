import axios from "axios";

export const getAPI = {
  GetSpecialApi: async () =>
    await axios
      .get("http://localhost:4000/api/v1/special")
      .then((res) => res)
      .catch((err) => console.log(err)),
};


export const getVrApi = {
    GetvendorApi: async () =>
      await axios
        .get("http://localhost:4000/api/v1/")
        .then((res) => res)
        .catch((err) => console.log(err)),
  };
  