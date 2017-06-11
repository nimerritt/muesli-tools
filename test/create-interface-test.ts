import { createInterface } from "../src/create-interface";
import { MuesliSchema } from "@nimerritt/muesli-schema";
import * as dom from 'dts-dom';
import { expect } from 'chai';

function json(intf: dom.InterfaceDeclaration): string {
  return JSON.stringify(dom.emit(intf), null, 2);
}

describe('Given an muesli schema with required values', () => {
  const schema: MuesliSchema = {
    type: 'object',
    properties: {
      bar: { type: 'number' },
    },
    required: ['bar'],
    additionalProperties: false,
  };

  describe('createInterface', () => {
    it('should return an interface with a required property', () => {
      const expected_intf = dom.create.interface('Test');
      const optional_foo = dom.create.property(
        'foo',
        dom.type.string, 
        dom.DeclarationFlags.Optional,
      );
      expected_intf.members = [ 
        dom.create.property('bar', dom.type.number),
      ];
      const intf = createInterface('Test', schema);
      expect(json(intf)).to.eql(json(expected_intf));
    });
  });
});

describe('Given an muesli schema with optional values', () => {
  const schema: MuesliSchema = {
    type: 'object',
    properties: {
      foo: { type: 'string' },
    },
    required: [],
    additionalProperties: false,
  };

  describe('createInterface', () => {
    it('should return an interface with an optional property', () => {
      const expected_intf = dom.create.interface('Test');
      expected_intf.members = [
        dom.create.property(
          'foo',
          dom.type.string, 
          dom.DeclarationFlags.Optional,
        ),
      ];
      const intf = createInterface('Test', schema);
      expect(intf).to.eql(expected_intf);
    });
  });
});

describe('Given an empty muesli schema', () => {
  const schema: MuesliSchema = {
    type: 'object',
    properties: {
    },
    required: [],
    additionalProperties: false,
  };

  describe('createInterface', () => {
    it('should return an interface with the name passed in', () => {
      const expected_intf = dom.create.interface('IFoo');
      expect(createInterface('IFoo', schema)).to.eql(expected_intf);
    });
  });
});
