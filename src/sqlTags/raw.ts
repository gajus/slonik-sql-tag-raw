import type {
  SqlSqlTokenType,
  ValueExpressionType,
} from 'slonik';
import type {
  NamedParameterValuesType,
} from '../types';
import {
  interpolatePositionalParameterReferences,
  interpolateNamedParameterReferences,
} from '../utilities';

export default (
  sql: string,
  values?: NamedParameterValuesType | ReadonlyArray<ValueExpressionType>,
): SqlSqlTokenType => {
  if (Array.isArray(values)) {
    return interpolatePositionalParameterReferences(sql, values as ValueExpressionType[]);
  } else {
    return interpolateNamedParameterReferences(sql, values as NamedParameterValuesType);
  }
};
