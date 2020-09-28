import chalk from 'chalk';
import { OpenAPIObject, ReferenceObject, SchemaObject } from 'openapi3-ts';
import { readContent, yamlToObject } from './utils';

export const generatorValueType = (
  name: string,
  required: boolean,
  metadata: SchemaObject,
  isArray: boolean = false
) => {
  const { description } = metadata;
  return `
    /**
     * ${description ? description : ''}
     */
    ${name}${required ? '' : '?'}: ${metadata.type === 'integer' ? 'number' : metadata.type}${isArray ? '[]' : ''};
  `;
};

export const generatorArray = (name: string, metadata: SchemaObject) => {
  const { description, nullable, items } = metadata;
  if (items?.$ref) {
    return generatorRef(name, items as ReferenceObject, description, true);
  } else {
    const { type } = items as SchemaObject;
    return generatorValueType(name, !nullable, { type, description: description }, true);
  }
};

export const generatorRef = (name: string, metadata: ReferenceObject, description = '', isArray: boolean = false) => {
  return `
    /**
     * ${description ? description : ''}
     */
    ${name}: ${metadata.$ref.replace('#/components/schemas/', '')}${isArray ? '[]' : ''};
  `;
};

export const generatorObject = (name: string, required: boolean, metadata: SchemaObject) => {
  const { required: requiredFields = [], description, properties } = metadata;
  const fields: string[] = [];

  for (const key in properties) {
    const propertie = properties[key];
    const required = requiredFields.includes(key);
    if (propertie.$ref) {
      fields.push(generatorRef(key, propertie as ReferenceObject));
    } else {
      const { type, items } = propertie as SchemaObject;
      if (type === 'array') {
        fields.push(generatorArray(key, propertie as SchemaObject));
      } else if (type === 'object') {
        fields.push(generatorObject(key, required, propertie));
      } else {
        fields.push(generatorValueType(key, required, propertie));
      }
    }
  }
  return `${name}${required ? '' : '?'}{
    ${fields.join('')}
  }`;
};

export const generatorModel = (name: string, metadata: SchemaObject) => {
  const { required: requiredFields = [], description, properties } = metadata;
  const fields = generatorObject(name, true, metadata);
  return `
    /**
     * ${description ? description : ''}
     */
    export interface ${fields}
  `;
};

export default async (path: string, namespace: string) => {
  const text = await readContent(path);
  if (!text) return;

  const object = (await yamlToObject(text)) as OpenAPIObject | undefined | null;
  if (!object) return;

  const schemas = object.components?.schemas;
  const models: string[] = [];
  for (const key in schemas) {
    const metadata = schemas[key] as SchemaObject;
    models.push(generatorModel(key, metadata));
  }
  return `
    declare namespace ${namespace} {
      ${models.join('')}
    }
  `;
};
