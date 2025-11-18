import * as path from 'node:path';
import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';

import type { UiKitGeneratorSchema } from './schema';

export async function uiKitGenerator(tree: Tree, options: UiKitGeneratorSchema): Promise<void> {
  const componentRoot = `libs/ui-kit/${options.name}`;

  // Generate normalized names
  const normalizedNames = names(options.name);

  // Prepare template substitutions
  const templateOptions = {
    ...options,
    ...normalizedNames,
    selector: options.selector ?? `cz-${normalizedNames.fileName}`,
    template: '',
  };

  // Generate files from templates
  generateFiles(tree, path.join(__dirname, 'files'), componentRoot, templateOptions);

  await formatFiles(tree);
}

// eslint-disable-next-line import/no-default-export
export default uiKitGenerator;
