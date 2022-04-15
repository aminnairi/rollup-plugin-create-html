import { join } from "path";

const is = (types, input) => {
  const inputType = Object.prototype.toString.call(input).toLowerCase();
  return types.some(type => `[object ${type}]` === inputType);
};

const render = (node) => {
  if (!is(["string", "object"], node)) {
    throw new Error(`Node ${JSON.stringify(node)} in property root is not a string nor an object`);
  }

  if (is(["string"], node)) {
    return node;
  }

  if (!is(["string"], node.name)) {
    throw new Error(`property name for node ${JSON.stringify(node)} in property root is not a string`);
  }


  const allowedNodeKeys = ["name", "attributes", "children"];

  Object.keys(node).forEach(key => {
    if (!allowedNodeKeys.includes(key)) {
      throw new Error(`Key ${JSON.stringify(key)} is not allowed from node ${JSON.stringify(node)} in property root`);
    }
  });

  if (!is(["object", "undefined"], node.attributes)) {
    throw new Error(`property ${JSON.stringify(node.attributes)} from node ${JSON.stringify(node)} in property root is not an object`);
  }

  if (!is(["array", "undefined"], node.children)) {
    throw new Error(`property ${JSON.stringify(node.children)} from node ${JSON.stringify(node)} in property root is not an array`);
  }

  const attributes = Object.entries(node.attributes ?? {}).filter(([name, value]) => {
    if (!is(["boolean", "string"], value)) {
      throw new Error(`Value ${JSON.stringify(value)} for property ${JSON.stringify(name)} from node ${JSON.stringify(node)} in property root is not a boolean nor a string`);
    }

    return value;
  }).map(([name, value]) => {
    if (value === true) {
      return name;
    }

    const delimiter = value.includes('"') ? '"' : "'";
    return `${name}=${delimiter}${value}${delimiter}`;
  }).join(" ");

  const children = node.children?.map(child => render(child)).join("") ?? null;

  if (children === null) {
    if (attributes.length === 0) {
      return `<${node.name}>`;
    }

    return `<${node.name} ${attributes}>`;
  } 

  if (attributes.length === 0) {
    return `<${node.name}>${children}</${node.name}>`;
  }

  return `<${node.name} ${attributes}>${children}</${node.name}>`;
};

export const createHtml = (options) =>  {
  return {
    name: "create-html",
    buildStart() {
      if (Object.prototype.toString.call(options) !== "[object Object]") {
        throw new Error("first argument is not an object");  
      }

      const allowedProperties = [
        {
          name: "doctype",
          type: "string",
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "path",
          type: "string"
        },
        {
          name: "root",
          type: "object"
        }
      ];

      for (const property in options) {
        if (!allowedProperties.some(allowedProperty => allowedProperty.name === property)) {
          throw new Error(`Property ${property} is not allowed`);
        }
      }

      for (const allowedProperty of allowedProperties) {
        if (!is([allowedProperty.type], options[allowedProperty.name])) {
          throw new Error(`Property ${allowedProperty.name} is not of type ${allowedProperty.type}`);
        }
      }

      const rendered = render(options.root);

      this.emitFile({
        type: "asset",
        name: options.name,
        fileName: join(options.path, options.name),
        source: `${options.doctype}${rendered}`
      });
    }
  };
};
