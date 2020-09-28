//https://prettier.io/docs/en/options.html
module.exports = {
  // 指定打印机将包裹的行长。
  // default: 80
  printWidth: 120,
  // 指定每个缩进级别的空格数
  // default: 2
  tabWidth: 2,
  // 使用制表符而不是使用空格来缩进
  useTabs: false,
  // 总是补全分号
  // default: true
  semi: true,
  // 使用单引号代替双引号
  // default: false
  singleQuote: true,
  // 属性key是否包含引号
  // default: as-needed
  quoteProps: 'as-needed',
  // 在jsx中使用单引号代替双引号
  // default: false
  jsxSingleQuote: true,
  // 多行时打印尾随逗号
  // default: none
  trailingComma: 'none',
  // 在对象文字中的括号之间打印空格。
  // true - Example: { foo: bar }.
  // false - Example: {foo: bar}.
  // default: true
  bracketSpacing: true,
  // jsx中>是否和元素在同一行
  // default: false
  jsxBracketSameLine: true,
  // 箭头函数参数是否总是有括号
  // default: avoid
  arrowParens: 'avoid'
};
