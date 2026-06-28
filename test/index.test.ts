import { describe, it, expect, beforeEach } from 'vitest';
import { verifyConditions } from '../src/index.js';
import type { PluginContext } from '@vmvarela/semantic-release-shared';

function makeContext(overrides: Partial<PluginContext> = {}): PluginContext {
  return {
    logger: { log: () => {}, error: () => {} },
    nextRelease: { version: '1.0.0' },
    branch: { name: 'main' },
    repositoryUrl: 'https://github.com/vmvarela/my-cli',
    env: {},
    cwd: '/tmp/test',
    ...overrides,
  };
}

describe('apt', () => {
  it('requires GH_TOKEN', async () => {
    await expect(verifyConditions({}, makeContext())).rejects.toThrow(/GH_TOKEN/);
  });
  it('requires APT_DISPATCH_REPO', async () => {
    await expect(
      verifyConditions({}, makeContext({ env: { GH_TOKEN: 'test' } })),
    ).rejects.toThrow(/APT_DISPATCH_REPO/);
  });
  it('passes with token + dispatch repo', async () => {
    await expect(
      verifyConditions(
        {},
        makeContext({ env: { GH_TOKEN: 'test', APT_DISPATCH_REPO: 'vmvarela/apt-repo' } }),
      ),
    ).resolves.toBeUndefined();
  });
});
