import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addProjectConfiguration, readProjectConfiguration, type Tree } from '@nx/devkit';

import { uiKitGenerator } from './generator';
import type { UiKitGeneratorSchema } from './schema';

describe('ui-kit generator', () => {
  let tree: Tree;
  const options: UiKitGeneratorSchema = { name: 'button' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    // Add ui-kit project configuration to match the actual project
    addProjectConfiguration(tree, 'ui-kit', {
      root: 'libs/shared/ui/ui-kit',
      projectType: 'library',
      sourceRoot: 'libs/shared/ui/ui-kit/src',
    });
  });

  it('should generate component files', async () => {
    await uiKitGenerator(tree, options);

    const projectConfig = readProjectConfiguration(tree, 'ui-kit');
    const componentRoot = `${projectConfig.root}/button`;

    expect(tree.exists(`${componentRoot}/button.component.ts`)).toBeTruthy();
    expect(tree.exists(`${componentRoot}/button.component.stories.ts`)).toBeTruthy();
    expect(tree.exists(`${componentRoot}/index.ts`)).toBeTruthy();
    expect(tree.exists(`${componentRoot}/ng-package.json`)).toBeTruthy();
  });

  it('should use correct selector', async () => {
    await uiKitGenerator(tree, options);

    const projectConfig = readProjectConfiguration(tree, 'ui-kit');
    const componentPath = `${projectConfig.root}/button/button.component.ts`;

    const componentContent = tree.read(componentPath, 'utf-8');
    expect(componentContent).toContain("selector: 'cz-button'");
    expect(componentContent).toContain('export class ButtonComponent');
  });

  it('should use custom selector when provided', async () => {
    await uiKitGenerator(tree, { name: 'custom', selector: 'my-custom' });

    const projectConfig = readProjectConfiguration(tree, 'ui-kit');
    const componentPath = `${projectConfig.root}/custom/custom.component.ts`;

    const componentContent = tree.read(componentPath, 'utf-8');
    expect(componentContent).toContain("selector: 'my-custom'");
  });

  it('should generate proper index export', async () => {
    await uiKitGenerator(tree, options);

    const projectConfig = readProjectConfiguration(tree, 'ui-kit');
    const indexPath = `${projectConfig.root}/button/index.ts`;

    const indexContent = tree.read(indexPath, 'utf-8');
    expect(indexContent).toContain("export * from './button.component'");
  });
});
