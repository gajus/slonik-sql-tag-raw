import {
  difference,
} from 'lodash';
import type {
  SqlSqlTokenType,
} from 'slonik';
import {
  InvalidInputError,
} from 'slonik';
import Logger from '../Logger';
import type {
  NamedParameterValuesType,
} from '../types';
import interpolatePositionalParameterReferences from './interpolatePositionalParameterReferences';

const log = Logger.child({
  namespace: 'interpolateNamedParameterReferences',
});

/**
 * @see https://regex101.com/r/KrEe8i/2
 */
const namedPlaceholderRegex = /[\s(,]:([_a-z]+)/g;

/**
 * @see https://github.com/mysqljs/sqlstring/blob/f946198800a8d7f198fcf98d8bb80620595d01ec/lib/SqlString.js#L73
 */
export default (
  inputSql: string,
  inputValues: NamedParameterValuesType = {},
): SqlSqlTokenType => {
  const resultValues = [];
  const parameterNames = Object.keys(inputValues);

  for (const parameterName of parameterNames) {
    const parameterValue = inputValues[parameterName];

    resultValues.push(parameterValue);
  }

  const usedParamterNames = [] as string[];

  const resultSql = inputSql.replace(namedPlaceholderRegex, (match, g1) => {
    if (!parameterNames.includes(g1)) {
      throw new InvalidInputError('Named parameter reference does not have a matching value.');
    }

    usedParamterNames.push(g1);

    const parameterIndex = parameterNames.indexOf(g1) + 1;

    return match.slice(0, -g1.length - 1) + `$${parameterIndex}`;
  });

  const unusedParameterNames = difference(parameterNames, usedParamterNames);

  if (unusedParameterNames.length > 0) {
    log.warn({
      unusedParameterNames,
    }, 'unused parameter names');

    throw new InvalidInputError('Values object contains value(s) not present as named parameter references in the query.');
  }

  return interpolatePositionalParameterReferences(resultSql, resultValues);
};
