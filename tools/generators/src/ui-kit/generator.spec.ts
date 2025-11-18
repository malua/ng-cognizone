import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';

import { uiKitGenerator } from './generator';
import type { UiKitGeneratorSchema } from './schema';

describe('ui-kit generator', () => {
  let tree: Tree;
  const options: UiKitGeneratorSchema = { name: 'button' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should generate component files', async () => {
    await uiKitGenerator(tree, options);

    expect(tree.exists('libs/ui-kit/button/button.component.ts')).toBeTruthy();
    expect(tree.exists('libs/ui-kit/button/button.component.stories.ts')).toBeTruthy();
    expect(tree.exists('libs/ui-kit/button/index.ts')).toBeTruthy();
    expect(tree.exists('libs/ui-kit/button/ng-package.json')).toBeTruthy();
  });

  it('should use correct selector', async () => {
    await uiKitGenerator(tree, options);

    const componentContent = tree.read('libs/ui-kit/button/button.component.ts', 'utf-8');
    expect(componentContent).toContain("selector: 'cz-button'");
    expect(componentContent).toContain('export class ButtonComponent');
  });

  it('should use custom selector when provided', async () => {
    await uiKitGenerator(tree, { name: 'custom', selector: 'my-custom' });

    const componentContent = tree.read('libs/ui-kit/custom/custom.component.ts', 'utf-8');
    expect(componentContent).toContain("selector: 'my-custom'");
  });

  it('should generate proper index export', async () => {
    await uiKitGenerator(tree, options);

    const indexContent = tree.read('libs/ui-kit/button/index.ts', 'utf-8');
    expect(indexContent).toContain("export * from './button.component'");
  });
});
