import type {
  SqlSqlToken,
  ValueExpression,
} from 'slonik';
import type {
  NamedParameterValues,
} from '../types';
import {
  interpolatePositionalParameterReferences,
  interpolateNamedParameterReferences,
} from '../utilities';

export default (
  sql: string,
  values?: NamedParameterValues | ReadonlyArray<ValueExpression>,
): SqlSqlToken => {
  if (Array.isArray(values)) {
    return interpolatePositionalParameterReferences(sql, values as ValueExpression[]);
  } else {
    return interpolateNamedParameterReferences(sql, values as NamedParameterValues);
  }
};
