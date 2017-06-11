import * as _ from 'lodash';
import * as dom from 'dts-dom';

import {
  MuesliSchema,
  MuesliNode,
  MuesliObject,
  MuesliArray,
  MuesliString,
  MuesliNumber,
} from '@nimerritt/muesli-schema';

function tsProperties(schema: MuesliObject): Array<dom.PropertyDeclaration> {
  return _.map(schema.properties, (v, k) => dom.create.property(
    k,
    tsType(v),
    schema.required.indexOf(k) !== -1 ? 
      dom.DeclarationFlags.None :
      dom.DeclarationFlags.Optional,
  ));
}

function tsType(schema: MuesliNode): dom.Type {
  switch (schema.type) {
    case 'string': 
      return dom.type.string;
    case 'number':
      return dom.type.number;
    case 'array':
      return dom.create.array(tsType(schema.items));
    case 'object':
      return dom.create.objectType(tsProperties(schema));
    default:
      const _exhaustiveCheck: never = schema;
      return _exhaustiveCheck;
  }
}

export function createInterface(name: string, root: MuesliObject): dom.InterfaceDeclaration {
  const intf = dom.create.interface(name);
  intf.members = tsProperties(root);
  return intf;
}

