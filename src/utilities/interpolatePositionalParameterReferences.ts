import {
  type FragmentSqlToken,
  type ValueExpression,
  InvalidInputError,
  createSqlTokenSqlFragment,
  isSqlToken,
} from 'slonik';
import {
  type PrimitiveValueExpression,
} from '../types';

/**
 * @see https://github.com/mysqljs/sqlstring/blob/f946198800a8d7f198fcf98d8bb80620595d01ec/lib/SqlString.js#L73
 */
export const interpolatePositionalParameterReferences = (
  inputSql: string,
  inputValues: ReadonlyArray<ValueExpression> = [],
): FragmentSqlToken => {
  const resultValues = [] as PrimitiveValueExpression[];

  const bindingNames = (inputSql.match(/\$(\d+)/ug) ?? [])
    .map((match) => {
      return Number.parseInt(match.slice(1), 10);
    })
    .sort();

  if (bindingNames[bindingNames.length - 1] > inputValues.length) {
    throw new InvalidInputError('The greatest parameter position is greater than the number of parameter values.');
  }

  if (bindingNames.length > 0 && bindingNames[0] !== 1) {
    throw new InvalidInputError('Parameter position must start at 1.');
  }

  const resultSql = inputSql.replace(/\$(\d+)/ug, (match, g1) => {
    const parameterPosition = Number.parseInt(g1, 10);
    const boundValue = inputValues[parameterPosition - 1];

    if (isSqlToken(boundValue)) {
      const sqlFragment = createSqlTokenSqlFragment(boundValue, resultValues.length);

      resultValues.push(...sqlFragment.values);

      return sqlFragment.sql;
    } else {
      resultValues.push(inputValues[parameterPosition - 1] as PrimitiveValueExpression);

      return `$${resultValues.length}`;
    }
  });

  return {
    sql: resultSql,
    type: 'SLONIK_TOKEN_FRAGMENT',
    values: Object.freeze(resultValues),
  };
};
