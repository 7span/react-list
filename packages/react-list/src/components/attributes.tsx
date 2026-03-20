import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";
import type { ReactListAttrSettings, ReactListAttribute } from "../types";
import type { ChangeEvent, ReactNode } from "react";

type ReactListAttributesUpdateAttr = (
  attrName: string,
  settingKey: string,
  value: unknown,
) => void;

type ReactListAttributesScope = {
  attrs: ReactListAttribute[];
  attrSettings: ReactListAttrSettings;
  updateAttr: ReactListAttributesUpdateAttr;
};

type ReactListAttributesRenderAttributeArgs = {
  key: string;
  attr: ReactListAttribute;
  updateAttr: ReactListAttributesUpdateAttr;
  attrSettings: ReactListAttrSettings;
};

type ReactListAttributesProps = {
  children?: ReactNode | ((scope: ReactListAttributesScope) => ReactNode);
  renderAttribute?: (args: ReactListAttributesRenderAttributeArgs) => ReactNode;
};

export const ReactListAttributes = memo(
  ({ children, renderAttribute }: ReactListAttributesProps) => {
    const { listState } = useListContext();
    const { attrs, attrSettings, updateAttr } = listState;

    const handleAttrChange = useCallback(
      (attrName: string) => (e: ChangeEvent<HTMLInputElement>) => {
        updateAttr(attrName, "visible", e.target.checked);
      },
      [updateAttr],
    );

    const scope = useMemo(
      () => ({
        attrs,
        attrSettings,
        updateAttr,
      }),
      [attrs, attrSettings, updateAttr],
    );

    if (typeof children === "function") {
      return children(scope);
    }

    if (children) return children;

    return (
      <div className="react-list-attributes">
        {attrs.map((attr, index) => {
          if (renderAttribute) {
            return (
              <span key={`attr-${index}`}>
                {renderAttribute({
                  key: `attr-${index}`,
                  attr,
                  updateAttr,
                  attrSettings,
                })}
              </span>
            );
          }

          return (
            <label key={`attr-${index}`}>
              <span>{attr.label}</span>
              <input
                type="checkbox"
                checked={attrSettings?.[attr.name]?.visible ?? false}
                onChange={handleAttrChange(attr.name)}
              />
            </label>
          );
        })}
      </div>
    );
  },
);
