import axios from "axios";

// export const getAPI = {
//   GetSpecialApi: async ({id}) =>
//     await axios
//       .get(`http://ec2-44-204-186-150.compute-1.amazonaws.com/api/v1/special/Obj/${id}`)
//       .then((res) => res)
//       .catch((err) => console.log(err)),
// };
export const getAPI = {
  GetSpecialApi: async () =>
    await axios
      .get("http://ec2-44-204-186-150.compute-1.amazonaws.com/api/v1/special")
      .then((res) => res)
      .catch((err) => console.log(err)),
};


  
// put
  // export const putMember = {
  //   updateMember: async () =>
  //     await axios
  //       .put("  http://ec2-44-204-186-150.compute-1.amazonaws.com/api/v1/members/update")
  //       .then((res) => res)
  //       .catch((err) => console.log(err)),
  // };
  export const putMember = {
    updateMember: async () =>
      await axios
        .put("  http://ec2-44-204-186-150.compute-1.amazonaws.com/api/v1/members/update")
        .then((res) => res)
        .catch((err) => console.log(err)),
  };
  





