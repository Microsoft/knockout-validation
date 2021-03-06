define([
  'lib/underscore',
  'component/ko-validation/validators/required',
  'component/ko-validation/validators/string',
  'component/ko-validation/validators/number',
  'component/ko-validation/validators/enum',
  'component/ko-validation/validators/array',
  'component/ko-validation/validators/passive',
  'component/ko-validation/validators/custom',
  'component/ko-validation/ko-extension',
  'component/ko-validation/config',
], function (_, Required, String, Number, Enum, Array, Passive, Custom, config) {
  'use strict';

  function run(value, validators) {
    var failed = _.find(validators, function (v) {
      return !v.isValid(value);
    });
    return failed ? failed.message : undefined;
  }

  function required(allowSpace) {
    return new Required(allowSpace);
  }

  function string() {
    return new String.Type();
  }

  string.size = function (length, blockInput) {
    return new String.Size(length, blockInput);
  };

  string.xss = function () {
    return new String.XSS();
  };

  function number() {
    return new Number.Type();
  }

  number.size = function (integerLength, decimalLength) {
    return new Number.Size(integerLength, decimalLength);
  };

  number.range = function (min, max) {
    return new Number.Range(min, max);
  };

  function enumeration(enumerators, nullable) {
    return new Enum(enumerators, nullable);
  }

  function array() {
    return new Array.Type();
  }

  array.size = function (min, max) {
    return new Array.Size(min, max);
  };

  array.item = function (validators) {
    return new Array.Item(validators);
  };

  array.items = function (validators, additionalValidators) {
    return new Array.Items(validators, additionalValidators);
  };

  array.unique = function () {
    return new Array.Unique();
  };

  function passive() {
    return new Passive();
  }

  function custom(method, message, blockInput) {
    return new Custom(method, message, blockInput);
  }

  return {
    // validators
    required: required,
    string: string,
    number: number,
    enum: enumeration,
    array: array,
    passive: passive,
    custom: custom,
    // end of validators
    run: run, // run validation manually, for using without knockout
    config: config,
  };
});
