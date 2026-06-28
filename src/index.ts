import { github } from '@vmvarela/semantic-release-shared';
import type { PluginContext, PrepareResult } from '@vmvarela/semantic-release-shared';

export async function verifyConditions(config: unknown, context: PluginContext): Promise<void> {
  const token = context.env.GH_TOKEN || context.env.GITHUB_TOKEN;
  if (!token) throw new Error('[apt] GH_TOKEN or GITHUB_TOKEN required');
  if (!context.env.APT_DISPATCH_REPO) throw new Error('[apt] APT_DISPATCH_REPO env required');
  context.logger.log('[apt] Config valid');
}

export async function publish(config: unknown, context: PluginContext): Promise<PrepareResult> {
  const version = context.nextRelease.version;
  const dispatchRepo = context.env.APT_DISPATCH_REPO as string;
  
  await github.dispatchRepoEvent(dispatchRepo, 'apt-publish', {
    version,
    source_repo: context.repositoryUrl,
  });
  
  context.logger.log(`[apt] Dispatched apt-publish for v${version}`);
  return { artifacts: [], version };
}
