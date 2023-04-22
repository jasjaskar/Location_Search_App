export const callLoactionSearchAPI = async name => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`,
    requestOptions,
  )
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw 'Something went wrong';
      }
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw 'Something went wrong';
    });
};
