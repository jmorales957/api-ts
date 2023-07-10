export function countSequence(cadena: string): number {
  const sequenceRegex = /(A{4}|T{4}|C{4}|G{4})/g;
  const sequencesFound = cadena.match(sequenceRegex);
  return sequencesFound ? sequencesFound.length : 0;
}
