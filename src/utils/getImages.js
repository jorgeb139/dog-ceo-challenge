import axios from "axios";

export const getImages = async (setter, breed, data) => {
  const baseURL =
    breed.length === 1
      ? `https://dog.ceo/api/breed/${breed[0]}/images/random/3`
      : `https://dog.ceo/api/breed/${breed[0]}/${breed[1]}/images/random/3`;

  try {
    const res = await axios.get(baseURL);
    let response = res.data.message;
    setter(() => [
      ...data,
      {
        breed: breed.length === 1 ? breed[0] : breed[0] + " " + breed[1],
        images: response,
      },
    ]);
  } catch (e) {
    console.log(e);
  }
};
