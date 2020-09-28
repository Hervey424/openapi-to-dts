import program from 'commander';
import convert from './converter';
import fs from 'fs';
import chalk from 'chalk';

program
  .version('1.0.0')
  .requiredOption('-i, --input <input>', 'input filename or url')
  .option('-o, --output <output_filename>', 'output filename')
  .option('-ns, --namespace <namespace>', 'namespace')
  .parse(process.argv);

const exec = async () => {
  console.log('开始生成...');
  const path = program.output || 'api.d.ts';
  const content = await convert(program.input, program.namespace || 'K');
  fs.writeFileSync(path, content as string);
  console.log(chalk.green('生成完成!!!'));
};

exec();
