import {
  BaseGenerator,
  GenerateList,
  GenerateGlobalInfo,
  IRenderListRawItem,
} from '../BaseGenerator';

/**
 * 静态文件生成器
 *
 * - 不以 `_` 开头
 * - 不是 .md 文件
 */
export class StaticGenerator extends BaseGenerator {
  readonly type = 'media';

  async getGlobalInfo() {
    return new GenerateGlobalInfo({});
  }

  async generateList() {
    const list = this.collection.getList();
    const renderList: IRenderListRawItem[] = [];

    for (const { page } of list) {
      if (page.path.endsWith('.md')) continue;

      // 有路径段是以 _ 开头的，则跳过
      if (page.relativePath.split('/').some(p => p.startsWith('_'))) continue;

      const url = page.relativePath.startsWith('/') ? page.relativePath : '/' + page.relativePath;

      renderList.push({
        path: url,
        renderType: 'raw',
        buffer: page.raw,
        mime: page.extInfo.mime,
      });
    }

    return new GenerateList(this.type, renderList);
  }
}
