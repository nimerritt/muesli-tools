import * as swagger from 'swagger-schema-official';
import * as _ from 'lodash';
import { MuesliSchema } from '@nimerritt/muesli-schema';

interface PathParameter { 
  in: 'path';
  name: string;
  type: 'string' | 'number';
}

interface BodyParameter {
  in: 'body';
  type: 'object',
  name: string; // ignored
  schema: MuesliSchema;
}

interface Api {
}

function onPathParam(param: PathParameter): any {
  return {[param.name]: param.type};
}

function onBodyParam(param: BodyParameter): any {
  return param.schema;
}

function handlerParams(params: Array<any>): any {
  return _.map(params, param => {
    switch (param.in) {
      case 'path': return onPathParam(param);
      case 'body': return onBodyParam(param);
    }
  });
}

function swaggerToTree(spec: swagger.Spec): Api {
  return {};
}
