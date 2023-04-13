import {
  AzExtParentTreeItem,
  AzExtTreeItem,
  GenericTreeItem,
} from "@microsoft/vscode-azext-utils";
import { l10n } from "vscode";
import { getIconPath } from "../../utils/utilities";

export class HomeTreeItem extends AzExtParentTreeItem {
  public label: string = "Home";
  public contextValue: string = "home";

  private values?: GenericTreeItem[];

  public async loadMoreChildrenImpl(): Promise<AzExtTreeItem[]> {
    return this.values ?? (this.values = [this.deployWithRepoUrlTreeItem]);
  }

  public hasMoreChildrenImpl(): boolean {
    return false;
  }

  public compareChildrenImpl(
    item1: AzExtTreeItem,
    item2: AzExtTreeItem
  ): number {
    if (!item1 || !item1.id) {
      return -1;
    }
    if (!item2 || !item2.id) {
      return 1;
    }
    return item1?.id.localeCompare(item2?.id);
  }

  private get deployWithRepoUrlTreeItem(): AzExtTreeItem {
    const node = new GenericTreeItem(this, {
      label: l10n.t("Deploy with Repository URL"),
      contextValue: "Deploy with Repository URL",
      commandId: "metacall.deployWithRepoUrl",
      iconPath: getIconPath("link.svg"),
      includeInTreeItemPicker: true,
    });

    node.id = "0";

    return node;
  }
}