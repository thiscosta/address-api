export function replaceCepDigit(cepNumber) {
  const cepInitialCharacters = cepNumber.split("0")[0];
  const newInitialCharacters =
    cepInitialCharacters.slice(0, cepInitialCharacters.length - 1) + "0";
  return (
    newInitialCharacters + cepNumber.substring(newInitialCharacters.length, 8)
  );
}
