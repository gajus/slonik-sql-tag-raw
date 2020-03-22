// @flow

import type {
  ValueExpressionType,
} from 'slonik';

export type NamedParameterValuesType = {
  [key: string]: ValueExpressionType,
  ...
};

export type PositionalParameterValuesType = $ReadOnlyArray<ValueExpressionType>;
