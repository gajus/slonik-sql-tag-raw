// @flow

import type {
  SqlSqlTokenType,
  ValueExpressionType,
} from 'slonik';
import {
  interpolatePositionalParameterReferences,
  interpolateNamedParameterReferences,
} from '../utilities';

export default (
  sql: string,
  values?: $ReadOnlyArray<ValueExpressionType>,
): SqlSqlTokenType => {
  if (Array.isArray(values)) {
    // $FlowFixMe
    return {
      type: 'SLONIK_TOKEN_SQL',
      ...interpolatePositionalParameterReferences(sql, values),
    };
  } else {
    // $FlowFixMe
    return {
      type: 'SLONIK_TOKEN_SQL',
      ...interpolateNamedParameterReferences(sql, values),
    };
  }
};
