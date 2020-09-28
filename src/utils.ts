import superagent from 'superagent';
import chalk from 'chalk';
import yaml from 'js-yaml';
import fs from 'fs';

export const readContent = async (path: string) => {
  const isRemote = path.toLowerCase().startsWith('http');
  let text = '';
  if (isRemote) {
    try {
      const res = await superagent.get(path);
      text = res.text;
    } catch {
      console.log(chalk.red(`生成错误: 请求远程文件失败(${path})!`));
    }
  } else {
    if (!fs.existsSync(path)) {
      console.log(chalk.red(`生成错误: 本地文件(${path})不存在!`));
    } else {
      text = fs.readFileSync(path).toString();
    }
  }
  return text;
};

export const yamlToObject = (text: string) => {
  try {
    const doc = yaml.safeLoad(text);
    return doc;
  } catch (e) {
    console.log(chalk.red(`生成错误: YAML文件格式不正确!`));
  }
};
