import axios from "axios";

export const getAPI = {
  GetSpecialApi: async () =>
    await axios
      .get("http://localhost:4000/api/v1/special")
      .then((res) => res)
      .catch((err) => console.log(err)),
};


  
// put
  // export const putMember = {
  //   updateMember: async () =>
  //     await axios
  //       .put("  http://localhost:4000/api/v1/members/update")
  //       .then((res) => res)
  //       .catch((err) => console.log(err)),
  // };
  





