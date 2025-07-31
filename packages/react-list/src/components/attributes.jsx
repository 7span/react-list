import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListAttributes = memo(({ children, renderAttribute }) => {
  const { listState } = useListContext();
  const { attrs, attrSettings, updateAttr } = listState;

  const handleAttrChange = useCallback(
    (attrName) => (e) => {
      updateAttr(attrName, "visible", e.target.checked);
    },
    [updateAttr]
  );

  const scope = useMemo(
    () => ({
      attrs,
      attrSettings,
      updateAttr,
    }),
    [attrs, attrSettings, updateAttr]
  );

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-attributes">
      {attrs.map((attr, index) => {
        if (renderAttribute) {
          return renderAttribute({
            key: `attr-${index}`,
            attr,
            updateAttr,
            attrSettings,
          });
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
});
