function jurosCompostos(montante, juros, periodo) {
  const results = [];
  montante = parseFloat(montante);
  juros = parseFloat(juros);
  periodo = parseInt(periodo);

  const jurosCalc = {
    result: 0,
    somado: 0,
    porcentagem: 0,
  };
  let valorInicial = montante + montante * (juros / 100);
  jurosCalc.result = parseFloat(valorInicial.toFixed(2));
  jurosCalc.somado = (valorInicial - montante).toFixed(2);
  jurosCalc.porcentagem = juros;
  results.push(jurosCalc);

  for (let i = 1; i < periodo; i++) {
    let value = parseFloat(
      parseFloat(
        results[i - 1].result + results[i - 1].result * (juros / 100)
      ).toFixed(2)
    );
    results.push({
      result: value,
      somado: (value - montante).toFixed(2),
      porcentagem: (((value - montante) / montante) * 100).toFixed(2),
    });
  }

  return results;
}
export { jurosCompostos };
