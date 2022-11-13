import axios from "axios";

export const getDoggies = async (setter, type, breed = "") => {
  const baseURL =
    type === "breeds"
      ? "https://dog.ceo/api/breeds/list/all"
      : `https://dog.ceo/api/breed/${breed}/list`;

  try {
    const res = await axios.get(baseURL);
    let response = res.data.message;
    if (type !== "breeds") {
      let arraySubBreeds = res.data.message.map((subBreed) => {
        return breed + " " + subBreed;
      });
      response = arraySubBreeds;
    }
    setter(response);
  } catch (e) {
    console.log(e);
  }
};
